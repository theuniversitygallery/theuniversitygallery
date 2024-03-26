import axios from "axios";

export async function addApplicationAction ({request}) {
    try {
        const formData = await request.formData();
        const {userId, postId} = Object.fromEntries(formData);
        const query = `http://localhost:3000/posts/${postId}`;

        const oldDoc = await axios.get(query);
        const someVal = oldDoc.data.applications;
        someVal.push(userId)

        const patchDoc = {
            "applications": someVal
        }
        const response = await axios.patch(query, patchDoc);
        console.log(response.data);
        return null;
    } catch (err) {
        console.log(err.message);
        return {message: err.message}
    }
}