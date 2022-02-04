import { csrfFetch } from "./csrf";


const GET_COMMENTS = "COMMENTS/GET_COMMENTS";
const ADD_COMMENT = "COMMENTS/ADD_COMMENT";
const EDIT_COMMENT = "COMMENTS/EDIT_COMMENT";
const DELETE_COMMENT = "COMMENTS/DELETE_COMMENT";

//COMMENT actions

export const getComments = (comments) => {
    return {
        type: GET_COMMENTS,
        payload: comments,
    };
};

export const addComment = (comment) => ({
    type: ADD_COMMENT,
    payload: comment,
});

export const editComment = (commentInfo) => ({
    type: EDIT_COMMENT,
    payload: commentInfo,
});

const deleteComment = (comment) => {
    return {
        type: DELETE_COMMENT,
        payload: comment,
    };
};


//Comment Thunks

//Get Comments
export const getCommentsThunk = (songId) => async (dispatch) => {
    const res = await csrfFetch(`/api/comments/${songId}`);

    if (res.ok) {
        const body = await res.json();
        dispatch(getComments(body));
        return body;
    } else {
        return null;
    }
};

//Add Comment
export const addCommentThunk = (content, userId, songId, username) => async (dispatch) => {
    const response = await csrfFetch(`/api/comments/${songId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ content, userId, songId }),
    });
    const data = await response.json();
    data['username'] = username
    if (data.errors) return data
    dispatch(addComment(data));
    return data;
};

//Edit Comment
export const editCommentThunk = (content, id) => async (dispatch) => {
    const response = await csrfFetch(`/api/comments/${id}/edit`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
    });
    const data = await response.json();
    if (data.errors) return data
    dispatch(editComment(data));
    return data;
};

//Delete Comment
export const deleteCommentThunk = (commentId) => async (dispatch) => {
    const res = await csrfFetch(`/api/comments/${commentId}/delete`, {
        method: "DELETE",
    });

    if (res.ok) {
        const comment = await res.json();
        dispatch(deleteComment(comment));
        return;
    } else {
        return null;
    }
};


export default function commentsReducer(state = [], action) {
    switch (action.type) {
        case GET_COMMENTS:
            return action.payload;
        case ADD_COMMENT:
            return [...state, action.payload];
        case DELETE_COMMENT:
            return state.filter((comment) => comment.id !== action.payload.id);
        case EDIT_COMMENT:
            return state.map((e) => {
                if (e.id === action.payload.id) {
                    return action.payload;
                }
                return e;
            })
        default:
            return state;
    }
}
