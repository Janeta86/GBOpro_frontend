import { UserStructure } from "../IUser.js";

export const AuthResponseStructure = {
    accessToken: String,
    refreshToken: String,
    user: UserStructure
};