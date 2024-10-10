import { useState, createContext, useContext, useEffect, useCallback } from 'react';

// Define the context with tokens and profile data
const ProfileContext = createContext({
    profile: null,
    tokens: { accessToken: null, refreshToken: null },
    loading: false,
    error: null,
    updateProfile: () => {},
    updateTokens: () => {},
    fetchProfile: async () => {},
    getStoredTokens: () => {}
});

export const ProfileProvider = ({ children }) => {
    const [profile, setProfile] = useState(null);
    const [tokens, setTokens] = useState({ accessToken: null, refreshToken: null });
    const [loading, setLoading] = useState(true); // Set initial loading to true
    const [error, setError] = useState(null);

    // Fetch profile data from the backend
    const fetchProfile = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const { accessToken, refreshToken } = getStoredTokens();
            if (!accessToken || !refreshToken) {
                throw new Error('Tokens are missing');
            }

            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/me`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                    'X-Refresh-Token': refreshToken
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch profile');
            }

            const userData = await response.json();
            localStorage.setItem('profile', JSON.stringify(userData));
            setProfile(userData);
            setTokens({ accessToken, refreshToken }); // Ensure tokens are set
        } catch (error) {
            console.error("Failed to fetch profile:", error);
            setError(error.message);
            setProfile(null);
        } finally {
            setLoading(false);
        }
    }, []);

    // Update the profile and store it in localStorage
    const updateProfile = (profileData) => {
        setProfile(profileData);
        localStorage.setItem('profile', JSON.stringify(profileData));
    };

    // Update tokens and store them in localStorage
    const updateTokens = (newTokens) => {
        setTokens(newTokens);
        localStorage.setItem('accessToken', newTokens.accessToken);
        localStorage.setItem('refreshToken', newTokens.refreshToken);
    };

    // Retrieve stored tokens from localStorage
    const getStoredTokens = () => {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        return { accessToken, refreshToken };
    };

    useEffect(() => {
        fetchProfile(); // Directly call fetchProfile to handle initialization
    }, [fetchProfile]);

    return (
        <ProfileContext.Provider value={{ profile, tokens, loading, error, updateProfile, updateTokens, fetchProfile, getStoredTokens }}>
            {children}
        </ProfileContext.Provider>
    );
};

// Custom hook to use the ProfileContext
export default function useProfile() {
    return useContext(ProfileContext);
}
