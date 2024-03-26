import axios from "axios";

export default async function AllPostsLoader () {
    const response = await axios.get("http://localhost:3000/posts");

    return {
        posts: response.data
    }
}