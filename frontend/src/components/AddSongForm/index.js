import { useState } from "react";
import { useDispatch } from "react-redux";

import { postSong } from "../../store/song";

import { useSelector } from "react-redux";

// import { Image, Audio } from 'cloudinary-react'


import Axios from 'axios'

const SongForm = () => {
    const dispatch = useDispatch();

    const [songName, setSongName] = useState("");
    const [songLink, setSongLink] = useState("");
    const [errors, setErrors] = useState([]);

    const [songSelected, setSongSelected] = useState("")
    // const [url, setUrl] = useState('')

    const reset = () => {
        setSongName("");
        setSongLink("");
        // setAlbumName('');
        // setArtistName('')
    };
    const user = useSelector((state) => state.session.user);
    const userId = user?.id

    let url;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append('file', songSelected)
        formData.append('upload_preset', 'd3gthd7l')

        Axios.post("https://api.cloudinary.com/v1_1/dyhfkvy6u/video/upload", formData).then(async (response) => {
            if (response.data.url) url = response.data.url

            const newSong = {
                songName,
                songLink: url,
                userId
            };
            const song = await dispatch(postSong(newSong))
                .catch(async (res) => {
                    const data = await res.json()
                    if (data && data.errors) setErrors(data.errors)
                })


        })

        // reset();
    };


    // const uploadSong = () => {
    //     // console.log(files[0])
    //     const formData = new FormData()
    //     formData.append('file', songSelected)
    //     formData.append('upload_preset', 'd3gthd7l')

    //     Axios.post("https://api.cloudinary.com/v1_1/dyhfkvy6u/video/upload", formData).then((response) => {
    //         if (response.data.url) url = response.data.url
    //         console.log(url)
    //     })
    // }


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
                {/* <input type="text"
                    type="text"
                    onChange={(e) => setSongLink(e.target.value)}
                    value={songLink}
                /> */}
                <input
                    // type="text"
                    // onChange={(e) => setSongLink(e.target.value)}
                    type='file'
                    onChange={(e) => { setSongSelected(e.target.files[0]) }}
                    // value={songLink}
                    placeholder="Song Link"
                    name="Audio File"
                />
                <button type="submit">Submit</button>

                {/* <Audio cloudName='dyhfkvy6u' publicId='https://res.cloudinary.com/dyhfkvy6u/image/upload/v1639007386/x8cgeebtzdfeou4p6bhw.png' /> */}

            </form>
        </div>
    );
};

export default SongForm;
