import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getSongs } from '../../store/song';

import ReactAudioPlayer from 'react-audio-player';


const SongList = () => {
    const dispatch = useDispatch();

    const songsObj = useSelector((state) => state.songState.entries);
    const songs = Object.values(songsObj)

    useEffect(() => {
        dispatch(getSongs());
    }, [dispatch]);

    return (
        <div>
            <h1>Song List</h1>
            <ol>
                {songs.map(({ id, songName, songLink }) => (
                    <div className='songdetails' key={id}>
                        {/* <p key={songLink}>songlink={songLink}</p> */}
                        <p key={songName}>songName={songName}</p>
                        <p key={id}>id={id}</p>
                        {/* <ReactAudioPlayer
                            src={songLink}
                            autoPlay
                            controls
                            key={songLink}
                        /> */}
                        <iframe src={songLink} width="100%" height="380" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
                    </div>
                ))}
            </ol>
        </div>
    );
};
export default SongList;
