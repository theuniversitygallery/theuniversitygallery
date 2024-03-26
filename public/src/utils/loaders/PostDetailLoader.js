import axios from "axios";

export default async function PostDetailLoader ({params}) {
    const {postId} = params;
    console.log(postId)
    const userInfo = JSON.parse(localStorage.getItem("user"));

    if (!userInfo || userInfo == "") throw new Error("Invalid user! Please login first");

    const response = await axios.get(`http://localhost:3000/posts/${postId}`);
    const applications = response.data.applications;
    const hasApplied = applications.includes(userInfo.id);

    return {
        hasApplied: hasApplied,
        postInfo: response.data,
        postId: postId,
        userId: userInfo.id,
    };
}