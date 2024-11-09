import { useState, createContext, useContext, useEffect, useCallback } from 'react';

const ProfileContext = createContext({
    profile: null,
    tokens: { accessToken: null, refreshToken: null },
    topTracks: { long_term: null, medium_term: null, short_term: null },
    topArtists: { long_term: null, medium_term: null, short_term: null },
    loading: false,
    error: null,
    updateProfile: () => {},
    updateTokens: () => {},
    fetchProfile: async () => {},
    fetchTopTracks: async () => {},
    fetchTopArtists: async () => {},
    getStoredTokens: () => {}
});

export const ProfileProvider = ({ children }) => {
    const [profile, setProfile] = useState(null);
    const [topTracks, setTopTracks] = useState({ long_term: null, medium_term: null, short_term: null });
    const [topArtists, setTopArtists] = useState({ long_term: null, medium_term: null, short_term: null });
    const [tokens, setTokens] = useState({ accessToken: null, refreshToken: null });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const updateProfile = (profileData) => {
        setProfile(profileData);
        localStorage.setItem('profile', JSON.stringify(profileData));
    };

    const updateTokens = (newTokens) => {
        setTokens(newTokens);
        localStorage.setItem('accessToken', newTokens.accessToken);
        localStorage.setItem('refreshToken', newTokens.refreshToken);
    };

    const getStoredTokens = () => {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        return { accessToken, refreshToken };
    };

    const getCachedData = (key) => {
        const data = JSON.parse(localStorage.getItem(key));
        if (data) {
            const { expiry, value } = data;
            if (Date.now() > expiry) {
                localStorage.removeItem(key);
                return null;
            }
            return value;
        }
        return null;
    };

    const setCachedData = (key, value) => {
        const EXPIRY_DURATION = 30 * 24 * 60 * 60 * 1000; // 1 month
        const expiry = Date.now() + EXPIRY_DURATION;
        localStorage.setItem(key, JSON.stringify({ expiry, value }));
    };

    const fetchProfile = useCallback(async () => {
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
        }
    }, []);

    const fetchTopTracks = async () => {
        try {
            const { accessToken, refreshToken } = getStoredTokens();
            if (!accessToken || !refreshToken) {
                throw new Error('Tokens are missing');
            }

            const storedTopTracks = getCachedData('topTracks');
            if (storedTopTracks) {
                setTopTracks(storedTopTracks);
                return;
            }

            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/top/tracks`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                    'X-Refresh-Token': refreshToken
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch top tracks');
            }

            const jsonResponse = await response.json();
            setTopTracks(jsonResponse);
            setCachedData('topTracks', jsonResponse);
        } catch (error) {
            console.error("Failed to fetch top tracks:", error);
            setError(error.message);
        }
    };

    const fetchTopArtists = async () => {
        try {
            const { accessToken, refreshToken } = getStoredTokens();
            if (!accessToken || !refreshToken) {
                throw new Error('Tokens are missing');
            }

            const storedTopArtists = getCachedData('topArtists');
            if (storedTopArtists) {
                setTopArtists(storedTopArtists);
                return;
            }

            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/top/artists`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                    'X-Refresh-Token': refreshToken
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch top artists');
            }

            const jsonResponse = await response.json();
            setTopArtists(jsonResponse);
            setCachedData('topArtists', jsonResponse);
        } catch (error) {
            console.error("Failed to fetch top artists:", error);
            setError(error.message);
        }
    };

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);

            await Promise.all([
                fetchProfile(),
                fetchTopTracks(),
                fetchTopArtists(),
            ]);
        } catch (error) {
            console.error("Error fetching data:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <ProfileContext.Provider value={{ profile, topTracks, topArtists, tokens, loading, error, updateProfile, updateTokens, fetchProfile, fetchTopTracks, fetchTopArtists, getStoredTokens }}>
            {children}
        </ProfileContext.Provider>
    );
};

export default function useProfile() {
    return useContext(ProfileContext);
}
