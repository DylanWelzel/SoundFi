import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };

    return (
        <>
            <button onClick={openMenu}>
                <i className="fas fa-user-circle fa-2x" />
            </button>
            {showMenu && (
                <ul className="profile-dropdown">
                    <li className='username'>{user.username}</li>
                    <li className='email'>{user.email}</li>
                    <li>
                        <button className='logout' onClick={logout}>Log Out</button>
                    </li>
                </ul>
            )}
        </>
    );
}

export default ProfileButton;
