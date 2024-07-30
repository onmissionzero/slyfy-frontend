import { createContext, useContext } from "react";

export const PlayerContext = createContext({
    cover_art: 'https://i.scdn.co/image/ab67616d0000b2739e1cfc756886ac782e363d79',
    track_name: 'Let It Happen',
    artists: 'Tame Impala',
    spotify_url: 'https://open.spotify.com/track/2X485T9Z5Ly0xyaghN73ed',
    lyrics: 'Lyrics Here'
});

export const PlayerProvider = PlayerContext.Provider;


export default function usePlayer() {
    return useContext(PlayerContext);
}