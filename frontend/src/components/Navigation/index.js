import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignUpFormModal from '../SignUpFormModal';
// import image from './lofi-girl.webp'
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />
        );
    } else {
        sessionLinks = (
            <>
                <LoginFormModal />
                <SignUpFormModal />
            </>
        );
    }

    return (
        <>
            <ul className='navbar'>
                <div className='links'>
                    <div className='logoandtitle'>
                        <i className="fab fa-soundcloud fa-5x"></i>
                        <p className='soundfi'>SoundFi</p>
                    </div>
                    <li className='navbuttonsright'>
                        <NavLink className='home-signin' exact to="/">Home</NavLink>
                        {isLoaded && sessionLinks}
                    </li>
                </div>
            </ul>
        </>
    );
}

export default Navigation;
