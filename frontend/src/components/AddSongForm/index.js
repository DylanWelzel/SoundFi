import { useState } from "react";
import { useDispatch } from "react-redux";

import { postSong } from "../../store/song";

const SongForm = () => {
    const dispatch = useDispatch();

    const [songName, setSongName] = useState("");
    const [songLink, setSongLink] = useState("");
    const [albumName, setAlbumName] = useState("");
    const [artistName, setArtistName] = useState("");
    const [userId, setUserId] = useState("");
    const [albumId, setAlbumId] = useState("");
    const [artistId, setArtistId] = useState("");


    const reset = () => {
        setSongName("");
        setSongLink("");
        setAlbumName('');
        setArtistName('')
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newSong = {
            songName,
            songLink,
            albumId,
            artistId,
            userId
        };
        const newAlbum = {
            albumName,
            artistId,
            userId,
        };
        const newArtist = {
            artistName,
            userId,
        };
        dispatch(postSong(newSong));

        reset();
    };

    return (
        <div className="inputBox">
            <h1>Add A Song</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    onChange={(e) => setSongName(e.target.value)}
                    value={songName}
                    placeholder="Song Name"
                    name="Song Name"
                />
                <input
                    type="file"
                    onChange={(e) => setSongLink(e.target.value)}
                    value={songLink}
                    placeholder="Song Link"
                    name="Audio File"
                />
                <input
                    type="text"
                    onChange={(e) => setAlbumName(e.target.value)}
                    value={albumName}
                    placeholder="Album Name"
                    name="Song Link"
                />
                <input
                    type="text"
                    onChange={(e) => setArtistName(e.target.value)}
                    value={artistName}
                    placeholder="Artist Name"
                    name="Song Link"
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default SongForm;
