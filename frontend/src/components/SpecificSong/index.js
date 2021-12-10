import { useState, useEffect } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';

import { deleteSong, getOneSong } from '../../store/song';
import EditSongForm from '../EditSongForm';

const SpecificSong = ({ id, songName, songLink, userId, albumImage }) => {
    const [editShowForm, setEditShowForm] = useState(false);
    // const [currentlyPlayingSong, setCurrentlyPlayingSong] = useState(false)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOneSong(id));
    }, [dispatch, id]);

    const editFormCheck = (e) => {
        if (editShowForm) setEditShowForm(false)
        if (!editShowForm) setEditShowForm(true)
    }
    const remove = (e) => {
        dispatch(deleteSong(e.target.id));
    }

    const user = useSelector((state) => state.session.user);
    const CurrentUserId = user?.id

    return (
        <div className='songdetails' key={id}>
            <NavLink to={`/song/${id}`}>
                <p className='songname' key={id}>{songName}</p>
                <img className="albumimage" src={albumImage} alt="album image" srcset="" />
                <ReactAudioPlayer
                    className='audioplayer'
                    src={songLink}
                    controls
                    key={songLink}
                />
            </NavLink>
            {userId === CurrentUserId ?
                <>
                    <div className='editbutton'>
                        <EditSongForm props={id} />
                    </div>
                    <div className='removebutton'>
                        <button id={id} onClick={remove}>Delete Song</button>
                    </div>
                </>
                : null}
        </div>
    );
};

export default SpecificSong;
