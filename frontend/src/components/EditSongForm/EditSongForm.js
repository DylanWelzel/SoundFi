import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { updateSong } from "../../store/song";

import { useSelector } from "react-redux";

import Axios from 'axios'


const EditSongForm = ({ props, setShowModal }) => {
    const dispatch = useDispatch();
    const [songName, setSongName] = useState("");
    const [songLink, setSongLink] = useState("");
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false)

    const [albumImage, setAlbumImage] = useState('')

    const [songSelected, setSongSelected] = useState("")


    const reset = () => {
        setSongName("");
        setSongLink("");
    };
    const user = useSelector((state) => state.session.user);
    const userId = user?.id

    const state = useSelector((state) => state.songState.entries[props]);
    const oldSongLink = state.songLink

    let url;

    useEffect(() => {
        setSongName(state.songName)
    }, [state])

    useEffect(() => {
        setAlbumImage(state.albumImage)
    }, [state])


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        setErrors([]);

        const updatedSongDetails = {
            id: props,
            songName,
            songLink: oldSongLink,
            albumImage,
            userId
        };

        let updatedSong = await dispatch(updateSong(updatedSongDetails))
            .catch(async (res) => {
                const data = await res.json()
                if (data && data.errors) {
                    setErrors(data.errors)
                    setLoading(false)
                }
            })
        if (updatedSong) {
            setShowModal(false)
            setLoading(false)
        }
    }

    return (
        < div className="inputBox" >
            <h1>Update A Song</h1>
            <ul>
                {errors.map((error, idx) => <li className='errors' key={idx}>{error}</li>)}
            </ul>

            <form className='addsongform' onSubmit={handleSubmit}>
                <label>Song Name
                    <input
                        className='textinput'
                        type="text"
                        onChange={(e) => setSongName(e.target.value)}
                        // value={songName}
                        value={songName}
                        placeholder="Smells Like Teen Spirit"
                        name="Song Name"
                    />
                </label>
                <label>Album Image
                    <input
                        className='textinput'
                        type="text"
                        onChange={(e) => setAlbumImage(e.target.value)}
                        value={albumImage}
                        placeholder="https://i.imgur.com/nevermind.jpeg"
                        name="Album Image URL"
                    />
                </label>
                {/* <input
                    type='file'
                    onChange={(e) => { setSongSelected(e.target.files[0]) }}
                    placeholder="Song Link"
                    name="Audio File"
                /> */}
                {loading &&
                    <p className='spinner'></p>
                }
                <button type="submit">Submit</button>
            </form>
        </div >
    );
};

export default EditSongForm;
