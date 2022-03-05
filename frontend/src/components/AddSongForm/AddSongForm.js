import { useState } from "react";
import { useDispatch } from "react-redux";

import { postSong } from "../../store/song";

import { useSelector } from "react-redux";

import Axios from 'axios';

const SongForm = ({ setShowModal }) => {
    const dispatch = useDispatch();

    const [albumImage, setAlbumImage] = useState('');

    const [songName, setSongName] = useState("");
    const [songLink, setSongLink] = useState("");
    const [errors, setErrors] = useState([]);
    const [songSelected, setSongSelected] = useState("");
    const [loading, setLoading] = useState(false);
    const reset = () => {
        setSongName("");
        setSongLink("");

    };
    const user = useSelector((state) => state.session.user);
    const userId = user?.id;

    let url;

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrors([]);
        setLoading(true);

        const formData = new FormData();
        formData.append('file', songSelected);
        formData.append('upload_preset', 'd3gthd7l');

        if (!(/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i).test(albumImage)) {
            setLoading(false);
            return setErrors(['Album image must be an image!']);
        };

        // error handling if no mp3 chosen
        if (songSelected === '') {
            setLoading(false);
            const newSong = {
                songName,
                songLink: url,
                albumImage,
                userId
            };
            const song = await dispatch(postSong(newSong))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) {
                        setErrors(data.errors);
                        setLoading(false);
                    };
                });
        };

        // if valid mp3
        Axios.post("https://api.cloudinary.com/v1_1/dyhfkvy6u/video/upload", formData).then(async (response) => {
            if (response.data.url) url = response.data.url;
            const newSong = {
                songName,
                songLink: url,
                albumImage,
                userId
            };
            const song = await dispatch(postSong(newSong))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) {
                        setErrors(data.errors);
                        setLoading(false);
                    };
                });
            if (song) {
                setShowModal(false);
                setLoading(false);
            };


        });

        // reset();
    };


    return (
        <div className="inputBox">
            <h1>Add A Song</h1>
            <ul>
                {errors.map((error, idx) => <li className='errors' key={idx}>{error}</li>)}
            </ul>
            <form className='addsongform' onSubmit={handleSubmit}>
                <label>Song Name
                    <input
                        className='textinput'
                        type="text"
                        onChange={(e) => setSongName(e.target.value)}
                        value={songName}
                        placeholder="Smells Like Teen Spirit"
                        name="Song Name"
                    />
                </label>
                <label>Album Image URL
                    <input
                        className='textinput'
                        type="text"
                        onChange={(e) => setAlbumImage(e.target.value)}
                        value={albumImage}
                        placeholder="https://i.imgur.com/nevermind.jpeg"
                        name="Album Image URL"
                    />
                </label>
                <label
                >Audio File
                    <input
                        type='file'
                        onChange={(e) => { setSongSelected(e.target.files[0]) }}
                        placeholder="Song Link"
                        name="Audio File"
                    />
                </label>
                {loading && <p className='spinner'></p>}
                <button className="submit" type="submit">Submit</button>


            </form>
        </div>
    );
};

export default SongForm;
