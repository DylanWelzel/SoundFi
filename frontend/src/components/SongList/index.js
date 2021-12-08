import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { deleteSong, getSongs, updateSong } from '../../store/song';

import ReactAudioPlayer from 'react-audio-player';
import { useHistory } from 'react-router';
import SongForm from '../AddSongForm';
import EditSongForm from '../EditSongForm';
import SpecificSong from '../SpecificSong';

const SongList = () => {

    const [addShowForm, setAddShowForm] = useState(false);
    // const [editShowForm, setEditShowForm] = useState(false);

    const history = useHistory()
    const dispatch = useDispatch();

    const songsObj = useSelector((state) => state.songState.entries);
    const songs = Object.values(songsObj)

    const user = useSelector((state) => state.session.user);
    const CurrentUserId = user?.id

    const remove = (e) => {
        dispatch(deleteSong(e.target.id));
    }


    const addFormCheck = (e) => {
        if (addShowForm) setAddShowForm(false)
        if (!addShowForm) setAddShowForm(true)
    }
    // const editFormCheck = (e) => {
    //     if (editShowForm) setEditShowForm(false)
    //     if (!editShowForm) setEditShowForm(true)
    // }

    useEffect(() => {
        dispatch(getSongs());
    }, [dispatch]);


    return (
        <div>
            <div>
                <button onClick={addFormCheck}>add a song</button>
                {addShowForm ?
                    <SongForm />
                    : null}
            </div>
            <h1>Song List</h1>
            <ol>
                {songs.map(({ id, songName, songLink, userId }) => (
                    <div>
                        <SpecificSong id={id} songName={songName} songLink={songLink} userId={userId} />
                    </div>
                ))}
            </ol>
        </div>
    );
};
export default SongList;
