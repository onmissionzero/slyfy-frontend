import { createContext, useContext } from "react";

export const ProfileContext = createContext({
    display_name: "ElectroFTW",
    id: "jgpjcv3k2bapsuswgo6xb9cgj",
    pfp_url: "https://i.scdn.co/image/ab6775700000ee85a85ff3da2bdbd6bf769d7a44"
});

export const ProfileProvider = ProfileContext.Provider;


export default function useProfile() {
    return useContext(ProfileContext);
}