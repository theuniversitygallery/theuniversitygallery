import { useContext } from "react";
import { createContext } from "react";

export const UserContext = createContext(undefined);

export const useUserContext = () => {
    const user = useContext(UserContext);

    if (user === undefined || user === null || user === "") {
        throw new Error("User cannot be found! Please login");
    } else {
        return user;
    }
}