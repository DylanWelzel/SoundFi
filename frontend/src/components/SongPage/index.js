import { useState, useEffect } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';

import { getOneUser, getOneSong } from '../../store/song';
import EditSongForm from '../EditSongForm';
import './SongPage.css'

const SongPage = () => {
    const [editShowForm, setEditShowForm] = useState(false);

    const dispatch = useDispatch();

    const { id } = useParams()




    useEffect(() => {
        dispatch(getOneSong(id));
    }, [dispatch, id]);

    const state = useSelector((state) => state.songState.entries[id]);
    const albumImage = state?.albumImage
    const songLink = state?.songLink
    const songName = state?.songName
    const userId = state?.userId

    const userstate = useSelector((state) => state.songState.entries['undefined']);
    const username = userstate?.username

    useEffect(() => {
        dispatch(getOneUser(userId));
    }, [dispatch, userId]);

    return (
        <div className='profilecontainer'>
            <div className='songusercontainer'>
                <h1 className='profilesongname'>{songName}</h1>
                <h2 className='profileusername'>{username}</h2>
                <div className='songlinkcontainer'>
                    <ReactAudioPlayer
                        className='profileaudioplayer'
                        src={songLink}
                        controls
                    />
                </div>
            </div>
            <div className='albumimagecontainer'>
                <img classname='profilealbumimage' src={albumImage} />
            </div>
        </div>
    );
};

export default SongPage;
