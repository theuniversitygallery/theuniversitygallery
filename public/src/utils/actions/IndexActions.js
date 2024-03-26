import axios from "axios";
import { redirect } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

export async function registerAction ({request}) {
    try {
        const formData = await request.formData();
        const {username, email, password, userType} = Object.fromEntries(formData);
        const newUserDoc = {
            id: uuidv4(),
            username,
            email,
            password,
            userType,
            isNewUser: true,
        }
        if (userType === "company") {
            newUserDoc.movable = "";
            newUserDoc.companyName = "";
            newUserDoc.companyType = "";
            newUserDoc.fieldAssociated = "";
            newUserDoc.companySize = "";
            newUserDoc.telephone = "";
            newUserDoc.businessId = "";
        } else {
            newUserDoc.schoolName = "";
            newUserDoc.programme = "";
            newUserDoc.level = "";
            newUserDoc.startYear = "";
            newUserDoc.studentId = "";
            newUserDoc.interests = [];
        }

        const reqOptions = {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newUserDoc)
        }
        
        const response = await fetch("http://localhost:3000/users", reqOptions);

        return redirect("/");
    } catch (er) {
        console.log(err.message);

        return {
            message: err.message
        }
    }
}

export async function loginAction ({request}) {
    try {
        const formData = await request.formData();
    
        const username = formData.get("username");
        const password = formData.get("password");

        let query = `http://localhost:3000/users?username=${username}`;
        
        const response = await fetch(query);
        const toJson = await response.json();

        // Verify username and password
        if (toJson.length < 1) {
            return {
                userName: "Username does not exist!"
            }
        } else if (toJson[0].password !== password) {
            return {
                pwd: "Incorrect password!"
            }
        } else {
            localStorage.setItem("user", JSON.stringify(toJson[0]));
            if (toJson[0].isNewUser) {
                return redirect("/onboarding");
            } else {
                return redirect("/home");
            }
        }

    } catch (err) {
        console.log(err.message);
        return {
            message: err.message
        }
    }

}

export async function onboardingAction({request}) {
    try {
        const formData = await request.formData();
        const {userId, userType} = Object.fromEntries(formData);

        let patchDoc = {
            isNewUser: false
        }

        if (userType === "company") {
            const {isMovable, companyName, companyType, fieldAssociated, companySize, telephone, businessId } = Object.fromEntries(formData);
            patchDoc.movable = isMovable;
            patchDoc.companyName = companyName;
            patchDoc.companyType = companyType;
            patchDoc.fieldAssociated  = fieldAssociated;
            patchDoc.companySize = companySize;
            patchDoc.telephone = telephone;
            patchDoc.businessId = businessId;
        } else {
            const {schoolName, programme, level, startYear, studentId} = Object.fromEntries(formData);
            patchDoc.schoolName = schoolName;
            patchDoc.programme = programme;
            patchDoc.level = level;
            patchDoc.startYear = startYear;
            patchDoc.studentId = studentId;
            // patchDoc.interests = interest;
        }

        let query = `http://localhost:3000/users/${userId}`;
        const response = await axios.patch(query, patchDoc);
        localStorage.setItem("user", JSON.stringify(response.data));

        return redirect("/home");

    } catch (err) {
        console.log(err.message);
        return {
            message: err.message
        }
    }
}

export async function logoutAction (request) {
    localStorage.clear();
    console.log("Logging out...");
    return redirect("/");
}