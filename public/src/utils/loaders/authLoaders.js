import { redirect } from "react-router-dom";

export const needsAuth = () => {
    const userDetails = localStorage.getItem("user");

    if (!userDetails || userDetails == "") throw new Error("No user found! Please login first");

    return JSON.parse(userDetails);
}

export const needsNoAuth = () => {
    const userDetails = localStorage.getItem("user");

    if (!userDetails || userDetails == "") return null;

    return redirect("/home");
}