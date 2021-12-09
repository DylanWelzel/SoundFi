import { useState } from "react";
import { useDispatch } from "react-redux";

import { updateSong } from "../../store/song";

import { useSelector } from "react-redux";

import Axios from 'axios'


const EditSongForm = ({ props, setEditShowForm }) => {
    const dispatch = useDispatch();

    const [songName, setSongName] = useState("");
    const [songLink, setSongLink] = useState("");
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false)


    const [songSelected, setSongSelected] = useState("")


    const reset = () => {
        setSongName("");
        setSongLink("");
    };
    const user = useSelector((state) => state.session.user);
    const userId = user?.id

    let url;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        const formData = new FormData()
        formData.append('file', songSelected)
        formData.append('upload_preset', 'd3gthd7l')

        if (songSelected === '') {
            setErrors(['You have to upload an audio file!'])
            setLoading(false)
        }
        if (songName === '') {
            setErrors(['Song name must not be empty.'])
            setLoading(false)
            return
        }


        Axios.post("https://api.cloudinary.com/v1_1/dyhfkvy6u/video/upload", formData).then(async (response) => {
            if (response.data.url) url = response.data.url


            const updatedSongDetails = {
                id: props,
                songName,
                songLink: url,
                userId
            };
            let updatedSong = await dispatch(updateSong(updatedSongDetails))
                .catch(async (res) => {
                    const data = await res.json()
                    if (data && data.errors) setErrors(data.errors)
                    setLoading(false)
                })
            setEditShowForm(false)
            reset();
        });
    }

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
                    type='file'
                    onChange={(e) => { setSongSelected(e.target.files[0]) }}
                    placeholder="Song Link"
                    name="Audio File"
                />
                {loading && <p>loading!</p>}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default EditSongForm;
