import { useState, useEffect } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { deleteSong, getOneSong } from '../../store/song';
import EditSongForm from '../EditSongForm';

const SpecificSong = ({ id, songName, songLink, userId }) => {
    const [editShowForm, setEditShowForm] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOneSong(id));
        setEditShowForm(false);
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
            <p key={id}>songName={songName}</p>
            <ReactAudioPlayer
                src={songLink}
                autoPlay
                controls
                key={songLink}
            />
            {userId === CurrentUserId ?
                <>
                    <div>
                        <button id={id} onClick={remove}>remove</button>
                    </div>
                    <div>
                        <button id={id} onClick={editFormCheck}>edit</button>
                        {editShowForm &&
                            <EditSongForm props={id} setEditShowForm={setEditShowForm} />
                        }
                    </div>
                </>
                : null}
        </div>
    );
};

export default SpecificSong;
