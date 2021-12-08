import { useState } from "react";
import { useDispatch } from "react-redux";

import { updateSong } from "../../store/song";

import { useSelector } from "react-redux";
import { useHistory } from "react-router";

const EditSongForm = () => {
    const dispatch = useDispatch();

    const [songName, setSongName] = useState("");
    const [songLink, setSongLink] = useState("");

    const history = useHistory()

    const reset = () => {
        setSongName("");
        setSongLink("");
        // setAlbumName('');
        // setArtistName('')
    };
    const user = useSelector((state) => state.session.user);
    const userId = user?.id

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedSongDetails = {
            songName,
            songLink,
            userId
        };
        let updatedSong = await dispatch(updateSong(updatedSongDetails));
        reset();
        if (updatedSong) return history.push(`/songlist`)
    };

    return (
        <div className="inputBox">
            <h1>Update A Song</h1>
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
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default EditSongForm;
