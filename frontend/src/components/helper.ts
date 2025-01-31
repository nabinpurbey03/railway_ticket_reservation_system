import axios, {AxiosResponse} from "axios";
import {setNameCookies} from "@/cookies/handle_cookie.ts";

interface IProps {
    res: AxiosResponse;
}

interface UserProfile {
    first_name: string;
    last_name: string;
    image_url: string;
}

export const set_name_cookies = async ({res}: IProps): Promise<void> => {
    try {
        const response: AxiosResponse = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/get-profile/${res.data.user_id}`
        );

        // console.log(response.data);

        const names: UserProfile = {
            first_name: response.data.first_name ?? "",
            last_name: response.data.last_name ?? "",
            image_url: response.data.image_url
                ? `${import.meta.env.VITE_API_URL}${response.data.image_url}`
                : "",
        };

        setNameCookies(names);
    } catch (error) {
        console.error("Error fetching user profile:", error);
    }
};
