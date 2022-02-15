
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import ReactAudioPlayer from 'react-audio-player';
import './footer.css'

const Footer = () => {
    const dispatch = useDispatch();
    const [autoPlay, setAutoPlay] = useState(false)
    const [currentSong, setCurrentSong] = useState(0);

    const songsObj = useSelector((state) => state.songState.entries);
    const songs = Object.values(songsObj)
    const stateSong = useSelector(state => state.current)
    const song = songs[currentSong];

    console.log(stateSong)

    function onPlay() {
        setAutoPlay(true)
    }
    function onPause() {
        setAutoPlay(false)
    }
    const skip = () => {
        if (songs[currentSong + 1]) {
            setCurrentSong(i => i + 1)
            setAutoPlay(true)
        } else {
            setCurrentSong(0)
            setAutoPlay(true)
        }
    }
    const prev = () => {
        if (songs[currentSong - 1]) {
            setCurrentSong(i => i - 1)
        } else {
            setCurrentSong(songs.length - 1)
        }
    }

    return (
        <div className="test">
            <div className='playallcontainer'>
                {/* <p className='addsongmessage'>Can't decide which song to play? Play them all!</p> */}
                {/* {song?.songName && <p className='nowplaying'>Now Playing {song?.songName}</p>}
                {!stateSong &&
                    < ReactAudioPlayer
                        className='footeraudioplayer'
                        autoPlay={autoPlay}
                        src={song?.songLink}
                        controls
                        key={song?.songLink}
                        onEnded={skip}
                        onPlay={onPlay}
                        onPause={onPause}
                        volume={0.5}
                    />
                } */}
                {stateSong.songName &&
                    <div className='nowPlayingContainer'>
                        <p className='nowplaying'>Now Playing {stateSong?.songName}</p>
                        <div className='playerContainer'>
                            <button className="loginbutton" onClick={prev}>prev</button>
                            <ReactAudioPlayer
                                className='footeraudioplayer'
                                autoPlay={autoPlay}
                                src={stateSong.songLink}
                                controls
                                key={song?.songLink}
                                onEnded={skip}
                                onPlay={onPlay}
                                onPause={onPause}
                                volume={0.5}
                            />
                            <button className="loginbutton" onClick={skip}>skip</button>
                        </div>
                    </div>
                }
            </div>

        </div>
    );
};

export default Footer;
