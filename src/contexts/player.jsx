import { useState, createContext, useContext, useEffect, useCallback } from 'react';
import useProfile from './profile'; // Adjust the import path if necessary
import { parseLRC } from '../utils/parseLRC'; // Import your parsing function

const PlayerContext = createContext({
    player: null,
    lyrics: '',
    parsedLyrics: [],
    isPlaying: false,
    synced: false,
    simulatedProgress: 0,
    fetchCurrentlyPlaying: async () => {},
    fetchLyrics: async () => {},
});

export const PlayerProvider = ({ children }) => {
    const [player, setPlayer] = useState(null);
    const [lyrics, setLyrics] = useState('');
    const [parsedLyrics, setParsedLyrics] = useState([]);
    const [synced, setSynced] = useState(false);
    const [trackId, setTrackId] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [simulatedProgress, setSimulatedProgress] = useState(0);

    const { tokens, updateTokens } = useProfile(); // Get tokens from ProfileContext

    const fetchCurrentlyPlaying = useCallback(async () => {
        try {
            const backendURL = import.meta.env.VITE_BACKEND_URL;
            const response = await fetch(`${backendURL}/currently-playing`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokens.accessToken}`, // Use token here
                    'X-Refresh-Token': `${tokens.refreshToken}`
                }
            });

            if (!response.ok) {
                const error = await response.json();
                setPlayer({ error: error.error });
                return;
            }

            const data = await response.json();
            
            if(data.accessToken) {
                updateTokens({
                    accessToken: data.accessToken,
                    refreshToken: data.refreshToken
                });
                return;
            }

            if (data.error) {
                setPlayer({ error: data.error });
            } else {
                const { track_id, track_name, artists, cover_art, spotify_url, isPlaying, progress, duration } = data;
                setPlayer({
                    track_id,
                    track_name,
                    artists: artists.join(', '),
                    cover_art,
                    spotify_url,
                    progress,
                    duration
                });
                setIsPlaying(isPlaying);
                if (track_id !== trackId) {
                    setTrackId(track_id);
                    setLyrics(''); // Reset lyrics when track changes
                    setParsedLyrics([]); // Reset parsed lyrics
                }
            }
        } catch (error) {
            setPlayer({ error: error.message });
        }
    }, [trackId, tokens.accessToken]);

    const fetchLyrics = useCallback(async () => {
        if (!trackId) return; // No need to fetch lyrics if no trackId

        try {
            const backendURL = import.meta.env.VITE_BACKEND_URL;
            const response = await fetch(`${backendURL}/lyrics`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokens.accessToken}`, // Use token here
                    'X-Refresh-Token': `${tokens.refreshToken}`
                }
            });

            if (!response.ok) {
                setLyrics('No lyrics found');
                setParsedLyrics([]); // Clear parsed lyrics on error
                setSynced(false);
                return;
            }

            const data = await response.json();

            if(data.accessToken) {
                updateTokens({
                    accessToken: data.accessToken,
                    refreshToken: data.refreshToken
                });
                return;
            }

            if (data.error) {
                setLyrics('No lyrics found');
                setParsedLyrics([]); // Clear parsed lyrics on error
                setSynced(false);
            } else {
                const newLyrics = data.lyrics || 'No lyrics found';
                setLyrics(newLyrics);
                setParsedLyrics(parseLRC(newLyrics)); // Parse lyrics
                setSynced(data.synced || false);
            }
        } catch (error) {
            setLyrics('No lyrics found');
            setParsedLyrics([]); // Clear parsed lyrics on error
            setSynced(false);
        }
    }, [trackId, tokens.accessToken]);

    useEffect(() => {
        fetchCurrentlyPlaying();

        const intervalId = setInterval(() => {
            fetchCurrentlyPlaying();
        }, 5000); // Fetch currently playing track every 5 seconds

        return () => clearInterval(intervalId);
    }, [fetchCurrentlyPlaying]);

    useEffect(() => {
        fetchLyrics();
    }, [trackId, fetchLyrics]);

    return (
        <PlayerContext.Provider value={{ player, lyrics, parsedLyrics, synced, isPlaying, simulatedProgress, fetchCurrentlyPlaying, fetchLyrics, setSimulatedProgress }}>
            {children}
        </PlayerContext.Provider>
    );
};

export default function usePlayer() {
    return useContext(PlayerContext);
}
