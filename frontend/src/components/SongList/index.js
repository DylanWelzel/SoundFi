import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { deleteSong, getSongs } from '../../store/song';

import ReactAudioPlayer from 'react-audio-player';


const SongList = () => {
    const dispatch = useDispatch();

    const songsObj = useSelector((state) => state.songState.entries);
    const songs = Object.values(songsObj)

    const user = useSelector((state) => state.session.user);
    const CurrentUserId = user?.id

    const remove = (e) => {
        dispatch(deleteSong(e.target.id));
    }

    useEffect(() => {
        dispatch(getSongs());
    }, [dispatch]);


    return (
        <div>
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
                            <div>
                                <button id={id} onClick={remove}>remove</button>
                            </div>
                            : null}
                    </div>
                ))}
            </ol>
        </div>
    );
};
export default SongList;
 