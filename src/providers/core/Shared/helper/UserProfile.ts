import axios from "axios";
import type { UserProfile } from "../../types/UserProfile.types.js";

const getUserProfile = async(accessToken: string , UserProfileUrl: string , provider: 'Google' | 'Likedin' | 'Github' | 'Instagram'): Promise<UserProfile> => {
    try {
            const { data } = await axios.get<{
            email?: string;
            name?: string;
            picture?: string;
        }>(
            UserProfileUrl , {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        const { picture, name, email } = data
        const user: UserProfile = {
            provider,
            avatarUrl: picture,
            displayName: name,
            email: email,
            raw: data
        }
        return user
        } catch (error) {
            throw new Error(`Something went wrong while fetching the user details from ${provider}, try again later.`, {cause: error})
        }
}

export {
    getUserProfile
}