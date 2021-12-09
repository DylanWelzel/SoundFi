import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { deleteSong, getSongs, updateSong } from '../../store/song';

import ReactAudioPlayer from 'react-audio-player';
import { useHistory } from 'react-router';
import SongForm from '../AddSongForm';
import EditSongForm from '../EditSongForm';
import SpecificSong from '../SpecificSong';
import './SongList.css'

const SongList = () => {

    const [addShowForm, setAddShowForm] = useState(false);

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
            <h1 className='listtitle'>Hear what’s trending for free in the SoundFi community
            </h1>
            {/* <button onClick={addFormCheck}>add a song</button> */}
            {CurrentUserId &&
                <div className='hiddenmessage'>
                    <p className='addsongmessage'>Or upload your own
                        <SongForm setAddShowForm={setAddShowForm} />
                    </p>
                </div>
            }
            <ol className='songlist'>
                {songs.map(({ id, songName, songLink, userId, albumImage }) => (
                    <div className='singlesong'>
                        <SpecificSong id={id} songName={songName} songLink={songLink} userId={userId} albumImage={albumImage} />
                    </div>
                ))}
            </ol>
        </div >
    );
};
export default SongList;
