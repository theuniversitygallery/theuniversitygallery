import { redirect } from "react-router-dom";

export async function onboardingLoader(request) {
    const userInfo = JSON.parse(localStorage.getItem("user"));

    if (userInfo === undefined || userInfo === null) return redirect("/");

    if (userInfo.isNewUser) {
        return {
            userType: userInfo.userType,
            userId: userInfo.id
        }
    } else {
        return redirect("/home");
    }
}