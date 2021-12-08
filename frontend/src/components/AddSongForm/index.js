import { useState } from "react";
import { useDispatch } from "react-redux";

import { postSong } from "../../store/song";

import { useSelector } from "react-redux";

const SongForm = () => {
    const dispatch = useDispatch();

    const [songName, setSongName] = useState("");
    const [songLink, setSongLink] = useState("");
    const [errors, setErrors] = useState([]);


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
        const newSong = {
            songName,
            songLink,
            userId
        };
        const song = await dispatch(postSong(newSong))
            .catch(async (res) => {
                const data = await res.json()
                if (data && data.errors) setErrors(data.errors)
            })
        reset();
    };
    console.log(errors)

    return (
        <div className="inputBox">
            <h1>Add A Song</h1>
            <ul>
                {errors.map((error, idx) => <li className='errors' key={idx}>{error}</li>)}
            </ul>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    onChange={(e) => setSongName(e.target.value)}
                    value={songName}
                    placeholder="Song Name"
                    name="Song Name"
                />
                <input
                    type="text"
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

export default SongForm;
