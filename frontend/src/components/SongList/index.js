import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { deleteSong, getSongs, updateSong } from '../../store/song';

import ReactAudioPlayer from 'react-audio-player';
import { useHistory } from 'react-router';
import SongForm from '../AddSongForm';
import EditSongForm from '../EditSongForm';
import SpecificSong from '../SpecificSong';
import './SongList.css'
import Footer from '../Footer';

const SongList = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSongs());
    }, [dispatch]);

    const [addShowForm, setAddShowForm] = useState(false);
    const [currentSong, setCurrentSong] = useState(0);
    const [searchQuery, setSearchQuery] = useState('')
    const [autoPlay, setAutoPlay] = useState(false)
    const history = useHistory()

    const songsObj = useSelector((state) => state.songState.entries);
    const songs = Object.values(songsObj)
    // continuous play
    const song = songs[currentSong];

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

    const filterSongs = (songs, query) => {
        if (!query) {
            return songs;
        }

        return songs.filter((song) => {
            const songName = song.songName.toLowerCase();
            return songName.includes(query.toLowerCase());
        });
    };
    const filteredSongs = filterSongs(songs, searchQuery)

    function onPlay() {
        setAutoPlay(true)
    }
    function onPause() {
        setAutoPlay(false)
    }
    return (
        <div>
            <h1 className='listtitle'>Hear what’s trending for free in the SoundFi community
            </h1>
            {!CurrentUserId &&
                <div className='hiddenmessage'>

                    <div className='searchlabel'>
                        <label htmlFor="search">
                            <i class="fas fa-search"></i>                    </label>
                        <input
                            className='searchNoUser'
                            name='search'
                            placeholder='Search Songs'
                            type="text"
                            value={searchQuery}
                            onInput={e => setSearchQuery(e.target.value)}
                            autoComplete="off"
                        />
                    </div>
                </div>
            }
            {CurrentUserId &&
                <div className='hiddenmessage'>
                    <p className='addsongmessage'>Or upload your own
                        <SongForm setAddShowForm={setAddShowForm} />
                    </p>
                    <div className='searchlabel'>
                        <label htmlFor="search">
                            <i class="fas fa-search"></i>                    </label>
                        <input
                            name='search'
                            placeholder='Search Songs'
                            type="text"
                            value={searchQuery}
                            onInput={e => setSearchQuery(e.target.value)}
                            autoComplete="off"
                        />
                    </div>
                </div>
            }
            <ol className='songlist'>
                {searchQuery.length > 0 && filteredSongs.map(({ id, songName, songLink, userId, albumImage }) => (
                    <div className='singlesong'>
                        <SpecificSong id={id} songName={songName} songLink={songLink} userId={userId} albumImage={albumImage} />
                    </div>
                ))
                    ||
                    songs.map(({ id, songName, songLink, userId, albumImage }) => (
                        <div className='singlesong'>
                            <SpecificSong id={id} songName={songName} songLink={songLink} userId={userId} albumImage={albumImage} />
                        </div>
                    ))
                }
            </ol>
            {/* <div className='playallcontainer'>
                <p className='addsongmessage'>Can't decide which song to play? Play them all!</p>
                {song?.songName && <p className='nowplaying'>Now Playing {song?.songName}</p>}
                <ReactAudioPlayer
                    className='audioplayer'
                    autoPlay={autoPlay}
                    src={song?.songLink}
                    controls
                    key={song?.songLink}
                    onEnded={skip}
                    onPlay={onPlay}
                    onPause={onPause}
                    volume={0.5}
                />
                <div>
                    <button className="loginbutton" onClick={prev}>prev</button>
                    <button className="loginbutton" onClick={skip}>skip</button>
                </div>
            </div> */}
        </div >
    );
};
export default SongList;
