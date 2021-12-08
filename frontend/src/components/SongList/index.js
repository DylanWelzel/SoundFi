import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { deleteSong, getSongs, updateSong } from '../../store/song';

import ReactAudioPlayer from 'react-audio-player';
import { useHistory } from 'react-router';
import SongForm from '../AddSongForm';
import EditSongForm from '../EditSongForm';


const SongList = () => {

    const [addShowForm, setAddShowForm] = useState(false);
    const [editShowForm, setEditShowForm] = useState(false);

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
    const editFormCheck = (e) => {
        if (editShowForm) setEditShowForm(false)
        if (!editShowForm) setEditShowForm(true)
    }

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
                    <div className='songdetails' key={id}>
                        <p key={id}>songName={songName}</p>
                        {/* <ReactAudioPlayer
                            src={songLink}
                            autoPlay
                            controls
                            key={songLink}
                        /> */}
                        {userId === CurrentUserId ?
                            <>
                                <div>
                                    <button id={id} onClick={remove}>remove</button>
                                </div>
                                <div>
                                    <button id={id} onClick={editFormCheck}>edit</button>
                                    {editShowForm ?
                                        <EditSongForm props={id} />
                                        : null}
                                </div>
                            </>
                            : null}
                    </div>
                ))}
            </ol>
        </div>
    );
};
export default SongList;
