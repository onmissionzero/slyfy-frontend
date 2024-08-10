import { useState, createContext, useContext, useEffect } from "react";

const ProfileContext = createContext({
    profile: null,
    updateProfile: () => {},
    fetchProfile: async () => {}
});

export const ProfileProvider = ({ children }) => {
    const [profile, setProfile] = useState(null);

    const updateProfile = (newProfile) => {
        setProfile(newProfile);
        if (newProfile === null) {
            localStorage.removeItem('profile');
        } else {
            localStorage.setItem("profile", JSON.stringify(newProfile));
        }
    };

    const fetchProfile = async () => {
        try {
            const userData = localStorage.getItem("profile");
            if (userData) {
                const parsedUserData = JSON.parse(userData);
                setProfile(parsedUserData);
            } else {
                setProfile(null);
            }
        } catch (error) {
            console.error("Failed to parse user data:", error);
            setProfile(null);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <ProfileContext.Provider value={{ profile, updateProfile, fetchProfile }}>
            {children}
        </ProfileContext.Provider>
    );
};

export default function useProfile() {
    return useContext(ProfileContext);
}
