import { csrfFetch } from "./csrf";
const LOAD_SONGS = 'song/loadSongs';
const ADD_SONG = 'song/addSongs';
const REMOVE_SONG = 'song/removeSongs'

export const loadSongs = (songs) => ({
    type: LOAD_SONGS,
    songs
});
export const getSongs = () => async (dispatch) => {
    const response = await fetch('/api/songs')
    const songs = await response.json()
    dispatch(loadSongs(songs))
    // return articles optional
    return songs
}

export const addSong = (newSong) => ({
    type: ADD_SONG,
    newSong
});

export const postSong = (newSong) => async (dispatch) => {
    const response = await csrfFetch(`/api/songs`, {
        method: 'post',
        body: JSON.stringify(newSong)
    });
    const song = await response.json();

    if (response.ok) {
        dispatch(addSong(song));
        return song;
    }
};

export const removeSong = (songId) => ({
    type: REMOVE_SONG,
    songId,
});


export const deleteSong = (song) => async (dispatch) => {
    const response = await fetch(`/api/songlist/`, {
        method: 'delete'
    });

    if (response.ok) {
        const song = await response.json();
        dispatch(removeSong(song.id));
    }
};



const initialState = { entries: {} };


const songReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SONGS: {
            const newState = { ...state, entries: {} }
            action.songs.forEach(song => {
                newState.entries[song.id] = song
            })
            return newState
        }
        case ADD_SONG: {
            return {
                ...state,
                entries: {
                    ...state.entries,
                    [action.newSong.id]: action.newSong
                }
            }
        }
        case REMOVE_SONG: {
            const newState = { ...state };
            // console.log(newState, 1)
            console.log(action)
            delete newState.entries[action.songId];
            // console.log(newState, 2)
            return newState;
        }
        default:
            return state;
    }
};

export default songReducer;
