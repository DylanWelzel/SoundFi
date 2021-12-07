
const LOAD_SONGS = 'song/loadSongs';
const ADD_SONG = 'song/addSongs';

export const loadSongs = (songs) => ({
    type: LOAD_SONGS,
    songs
});

export const addSong = (newSong) => ({
    type: ADD_SONG,
    newSong
});

export const postSong = (newSong) => async (dispatch) => {
    const response = await fetch(`/api/songs`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newSong)
    });
    const song = await response.json();

    if (response.ok) {
        dispatch(addSong(song));
        return song;
    }
};

export const getSongs = () => async (dispatch) => {
    const response = await fetch('/api/songs')
    const songs = await response.json()
    dispatch(loadSongs(songs))
    // return articles optional
    return songs
}

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
        default:
            return state;
    }
};

export default songReducer;
