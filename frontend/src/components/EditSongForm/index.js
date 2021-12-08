import { useState } from "react";
import { useDispatch } from "react-redux";

import { updateSong } from "../../store/song";

import { useSelector } from "react-redux";

const EditSongForm = ({ props }) => {
    console.log(props)
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
        const updatedSongDetails = {
            id: props,
            songName,
            songLink,
            userId
        };
        let updatedSong = await dispatch(updateSong(updatedSongDetails))
            .catch(async (res) => {
                const data = await res.json()
                if (data && data.errors) setErrors(data.errors)
            })
        reset();
    };

    return (
        <div className="inputBox">
            <h1>Update A Song</h1>
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

export default EditSongForm;
