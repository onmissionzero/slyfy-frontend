import { useState, createContext, useContext, useEffect, useCallback } from 'react';

const PlayerContext = createContext({
    player: null,
    lyrics: '',
    isPlaying: false,
    synced: false,
    simulatedProgress: 0,
    fetchCurrentlyPlaying: async () => {},
    fetchLyrics: async () => {}
});

export const PlayerProvider = ({ children }) => {
    const [player, setPlayer] = useState(null);
    const [lyrics, setLyrics] = useState('');
    const [synced, setSynced] = useState(false);
    const [trackId, setTrackId] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [simulatedProgress, setSimulatedProgress] = useState(0);

    const fetchCurrentlyPlaying = useCallback(async () => {
        try {
            const backendURL = import.meta.env.VITE_BACKEND_URL;
            const response = await fetch(`${backendURL}/currently-playing`, {
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const error = await response.json();
                setPlayer({ error: error.error });
                return;
            }

            const data = await response.json();
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
                    setLyrics(null);
                }
            }
        } catch (error) {
            setPlayer({ error: error.message });
        }
    }, [trackId]);

    const fetchLyrics = useCallback(async () => {
        if (!trackId) return; // No need to fetch lyrics if no trackId

        try {
            const backendURL = import.meta.env.VITE_BACKEND_URL;
            const response = await fetch(`${backendURL}/lyrics`, {
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                setLyrics('No lyrics found');
                setSynced(false);
                return;
            }

            const data = await response.json();
            if (data.error) {
                setLyrics('No lyrics found');
                setSynced(false);
            } else {
                setLyrics(data.lyrics || 'No lyrics found');
                setSynced(data.synced || false);
            }
        } catch (error) {
            setLyrics('No lyrics found');
            setSynced(false);
        }
    }, [trackId]);

    useEffect(() => {
        fetchCurrentlyPlaying();

        const intervalId = setInterval(() => {
            fetchCurrentlyPlaying();
        }, 5000); // Fetch currently playing track every 3 seconds

        return () => clearInterval(intervalId);
    }, [fetchCurrentlyPlaying]);

    useEffect(() => {
        fetchLyrics();
    }, [trackId, fetchLyrics]);

    return (
        <PlayerContext.Provider value={{ player, lyrics, synced, isPlaying, simulatedProgress, fetchCurrentlyPlaying, fetchLyrics, setSimulatedProgress }}>
            {children}
        </PlayerContext.Provider>
    );
};

export default function usePlayer() {
    return useContext(PlayerContext);
}