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
    console.log(state.songLink)
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

        const formData = new FormData()
        formData.append('file', songSelected)
        formData.append('upload_preset', 'd3gthd7l')

        // if (songSelected === '') {
        //     setErrors(['You have to upload an audio file!'])
        //     setLoading(false)
        // }
        if (songName === '') {
            setErrors(['Song name must not be empty.'])
            setLoading(false)
            return
        }
        if (albumImage === '') {
            setErrors(['Album image link must not be empty'])
            setLoading(false)
            return
        }

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
                if (data && data.errors) setErrors(data.errors)
            })
        setShowModal(false)
    }

    return (
        < div className="inputBox" >
            <h1>Update A Song</h1>
            <ul>
                {errors.map((error, idx) => <li className='errors' key={idx}>{error}</li>)}
            </ul>

            <form className='addsongform' onSubmit={handleSubmit}>
                <input
                    className='textinput'
                    type="text"
                    onChange={(e) => setSongName(e.target.value)}
                    // value={songName}
                    value={songName}
                    placeholder="Song Name"
                    name="Song Name"
                />
                <input
                    className='textinput'
                    type="text"
                    onChange={(e) => setAlbumImage(e.target.value)}
                    value={albumImage}
                    placeholder="Album Image URL"
                    name="Album Image URL"
                />
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
