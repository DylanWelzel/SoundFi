import { useState, useEffect } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addCommentThunk, getCommentsThunk } from '../../store/comments';

import { getOneUser, getOneSong } from '../../store/song';
import Comment from '../Comment';
import './SongPage.css'

const SongPage = () => {
    const [comment, setComment] = useState('');

    const dispatch = useDispatch();

    const { id } = useParams()




    useEffect(() => {
        dispatch(getOneSong(id));
    }, [dispatch, id]);

    const state = useSelector((state) => state.songState.entries[id]);
    const albumImage = state?.albumImage
    const songLink = state?.songLink
    const songName = state?.songName
    const userId = state?.userId
    const commentUserId = useSelector(state => state.session.user?.id)
    const comments = useSelector(state => state.commentState)
    const user = useSelector(state => state.session.user)

    const userstate = useSelector((state) => state.songState.entries['undefined']);
    const username = useSelector(state => state.session.user?.username)

    useEffect(() => {
        dispatch(getOneUser(userId));
    }, [dispatch, userId]);

    useEffect(() => {
        dispatch(getCommentsThunk(id))
    }, [dispatch])

    function postComment(e) {
        e.preventDefault()
        dispatch(addCommentThunk(comment, commentUserId, id, username))
        setComment('')
    }

    return (
        <div>
            <div className='profilecontainer'>
                <div className='songusercontainer'>
                    <h1 className='profilesongname'>{songName}</h1>
                    <h2 className='profileusername'>{username}</h2>
                    <div className='songlinkcontainer'>
                        <ReactAudioPlayer
                            className='profileaudioplayer'
                            src={songLink}
                            controls
                        />
                    </div>
                </div>
                <div className='albumimagecontainer'>
                    <img classname='profilealbumimage' src={albumImage} />
                </div>
            </div>
            <div className='commentsContainer'>
                {user &&
                    <div className='commentsignin'>
                        Enjoying {songName}? Leave a comment!
                    </div>
                }
                {user &&
                    <div>
                        <form onSubmit={postComment} className='commentInput'>
                            <input
                                placeholder='Leave a comment'
                                type="text"
                                onChange={(e) => setComment(e.target.value)}
                                value={comment}
                                required={true}
                            />
                        </form>
                    </div>
                    ||
                    <div className='commentsignin'>
                        Sign in to leave a comment!
                    </div>
                }

                <div className='commentList'>
                    {comments && comments?.map(comment => {
                        return (
                            <Comment
                                id={comment.id}
                                content={comment.content}
                                songId={comment.songId}
                                username={comment.User?.username || comment.username}
                            />
                        )
                    })}
                </div>
            </div>
        </div >

    );
};

export default SongPage;
