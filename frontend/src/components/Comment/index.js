import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { deleteCommentThunk, editCommentThunk } from '../../store/comments';
import { getSingleUserThunk } from '../../store/singleUser';

const Comment = ({ songId, username, id, content }) => {
    const dispatch = useDispatch();
    const sessionUsername = useSelector((state) => state.session.user?.username);

    const [showEdit, setShowEdit] = useState(false)
    const [editComment, setEditComment] = useState('')


    function editToggle() {
        setShowEdit(!showEdit)
    }

    function commentCancel() {
        setEditComment('')
        setShowEdit(!showEdit)
    }

    function commentEdit(e) {
        e.preventDefault()
        dispatch(editCommentThunk(editComment, id))
        setShowEdit(false)
    }

    function commentDelete() {
        dispatch(deleteCommentThunk(id))
    }

    return (
        <div className='comment' key={id}>
            {!showEdit &&
                <div className='commentContent'>
                    {content}
                </div>
            }
            {showEdit &&
                <form onSubmit={commentEdit} className='editInput'>
                    <input
                        className='editcommentinput'
                        placeholder='Edit your comment'
                        type="text"
                        onChange={(e) => setEditComment(e.target.value)}
                        value={editComment}
                        required={true}
                    />
                    <button type='submit'>Submit</button>
                    <button onClick={commentCancel}>Cancel</button>
                </form>
            }
            <div className='editInput' className='username'>
                {username}
            </div>
            {sessionUsername === username && !showEdit &&
                <div className='commentButtonContainer'>
                    <button onClick={editToggle} className='commentEdit'>Edit</button>
                    <button onClick={commentDelete} className='commentDelete'>Delete</button>
                </div>
            }
        </div>
    );
};

export default Comment;
