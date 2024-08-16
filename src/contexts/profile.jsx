    import { useState, createContext, useContext, useEffect } from "react";

    const ProfileContext = createContext({
        profile: null,
        loading: false,
        error: null,
        updateProfile: null,
        fetchProfile: async () => {}
    });

    export const ProfileProvider = ({ children }) => {
        const [profile, setProfile] = useState(null);
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState(null);

        const fetchProfile = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/me', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include'
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch profile');
                }

                const userData = await response.json();
                setProfile(userData);
            } catch (error) {
                console.error("Failed to parse user data:", error);
                setError(error.message);
                setProfile(null);
            } finally {
                setLoading(false);
            }
        };

        const updateProfile = (profileData) => {
            setProfile(profileData);
        };

        useEffect(() => {
            fetchProfile();
        }, []);

        return (
            <ProfileContext.Provider value={{ profile, loading, error, updateProfile, fetchProfile }}>
                {children}
            </ProfileContext.Provider>
        );
    };

    export default function useProfile() {
        return useContext(ProfileContext);
    }