import { csrfFetch } from "./csrf";



const LOAD_SONGS = 'song/loadSongs';
const ADD_SONG = 'song/addSongs';
const REMOVE_SONG = 'song/removeSongs'
const UPDATE_SONG = 'song/updateSongs'

export const loadSongs = (songs) => ({
    type: LOAD_SONGS,
    songs
});
export const getSongs = () => async (dispatch) => {
    const response = await fetch('/api/songs')
    const songs = await response.json()
    dispatch(loadSongs(songs))
    return songs
}

export const addSong = (newSong) => ({
    type: ADD_SONG,
    newSong
});

export const postSong = (newSong) => async (dispatch) => {
    const response = await csrfFetch(`/api/songs/${newSong.id}`, {
        method: 'POST',
        body: JSON.stringify(newSong)
    });
    const song = await response.json();

    if (response.ok) {
        dispatch(addSong(song));
        return song;
    }
};

export const removeSong = (song) => ({
    type: REMOVE_SONG,
    song,
});


export const deleteSong = (songId) => async (dispatch) => {
    const response = await csrfFetch(`/api/songs/${songId}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        const song = await response.json();
        dispatch(removeSong(song));
    }
};

const update = (song) => ({
    type: UPDATE_SONG,
    song
});

export const updateSong = (song) => async (dispatch) => {
    const response = await csrfFetch(`/api/songs/${song.id}`, {
        method: 'put',
        body: JSON.stringify(song)
    });

    if (response.ok) {
        const song = await response.json();
        dispatch(update(song));
        return song;
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
            const newState = { ...state, entries: { ...state.entries } };
            delete newState.entries[action.song.id];
            return newState;
        }
        case UPDATE_SONG: {
            return {
                ...state,
                entries: {
                    ...state.entries,
                    [action.song.id]: action.song
                }
            }
        }
        default:
            return state;
    }
};

export default songReducer;
