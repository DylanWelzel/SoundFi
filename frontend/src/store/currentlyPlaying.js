import { csrfFetch } from "./csrf";


const CURRENTLY_PLAYING = "CURRENT/GET_CURRENT";

//CurrentlyPlaying actions

export const getCurrentlyPlaying = (song) => {
    return {
        type: CURRENTLY_PLAYING,
        payload: song,
    };
};


//Get Currently Playing
export const getCurrentlyPlayingThunk = (songId) => async (dispatch) => {
    const res = await csrfFetch(`/api/current/${songId}`);

    if (res.ok) {
        const body = await res.json();
        dispatch(getCurrentlyPlaying(body));
        return body;
    } else {
        return null;
    }
};


export default function currentlyPlayingReducer(state = [], action) {
    switch (action.type) {
        case CURRENTLY_PLAYING:
            return action.payload;
        default:
            return state;
    }
}
