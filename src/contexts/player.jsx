import { useState, createContext, useContext, useEffect } from "react";

const PlayerContext = createContext({
    player: null,
    updatePlayer: () => {},
    fetchPlayer: async () => {}
});

export const PlayerProvider = ({ children }) => {
    const [player, setPlayer] = useState(null);

    const updatePlayer = (newPlayer) => {
        setPlayer(newPlayer);
    };

    const fetchPlayer = async () => {
        try {
            const backendURL = import.meta.env.VITE_BACKEND_URL;
            const response = await fetch(`${backendURL}/lyrics`, {credentials: "include"});
            if (!response.ok) {
                const error = await response.json();
                setPlayer({ error: error.error });
                return;
            }
            const data = await response.json();
            if (data.error) {
                setPlayer({ error: data.error });
            } else {
                setPlayer({
                    cover_art: data.cover_art,
                    track_name: data.track_name,
                    artists: data.artists.join(', '),
                    spotify_url: data.spotify_url,
                    lyrics: data.lyrics,
                    error: null
                });
            }
        } catch (error) {
            setPlayer({ error: error.message });
        }
    };

    useEffect(() => {
        fetchPlayer();

        const intervalId = setInterval(() => {
            fetchPlayer();
        }, 10000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <PlayerContext.Provider value={{ player, updatePlayer }}>
            {children}
        </PlayerContext.Provider>
    );
};

export default function usePlayer() {
    return useContext(PlayerContext);
}