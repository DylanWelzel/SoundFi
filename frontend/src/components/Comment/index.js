import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { deleteCommentThunk, editCommentThunk } from '../../store/comments';
import { getSingleUserThunk } from '../../store/singleUser';

const Comment = ({ songId, username, id, content }) => {

    const dispatch = useDispatch();

    const sessionUsername = useSelector((state) => state.session.user?.username);

    function commentEdit() {
        dispatch(editCommentThunk())
    }

    function commentDelete() {
        dispatch(deleteCommentThunk(id))
    }

    return (
        <div className='comment' key={id}>
            <div className='commentContent'>
                {content}
            </div>
            <div className='username'>
                {username}
            </div>
            {sessionUsername === username &&
                <div className='commentButtonContainer'>
                    <button onClick={commentEdit} className='commentEdit'>Edit</button>
                    <button onClick={commentDelete} className='commentDelete'>Delete</button>
                </div>
            }
        </div>
    );
};

export default Comment;
