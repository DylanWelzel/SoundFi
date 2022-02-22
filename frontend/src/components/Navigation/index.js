import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignUpFormModal from '../SignUpFormModal';
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
        <div className='navContainer'>
            <div className="backgroundcontainer">
                <img className='background' src="https://i.pinimg.com/originals/4a/65/ab/4a65abeead3a8d113bccfee5d5d239f4.gif" alt="" srcset="" />
            </div>
            <ul className='navbar'>
                <div className='links'>
                    <div className='logoandtitle'>
                        <NavLink className='logolink' exact to="/">
                            <i className="fab fa-soundcloud fa-5x"></i>
                            <p className='soundfi'>SoundFi</p>
                        </NavLink>
                    </div>
                    <li className='navbuttonsright'>
                        <NavLink className='home-signin socials' to={{ pathname: "https://linkedin.com/in/dylan-welzel-107140221" }} target="_blank" exact={true} >LinkedIn</NavLink>
                        <NavLink className='home-signin socials' to={{ pathname: "https://github.com/dylanwelzel/Kostko-Connect" }} target="_blank" exact={true}>GitHub</NavLink>

                        <NavLink className='home-signin' exact to="/">Home</NavLink>
                        {isLoaded && sessionLinks}
                    </li>
                </div>
            </ul>
            <div className='headers'>
                <h1 className='discovertext'>Discover More With SoundFi+</h1>
                <h2 className='discoversmalltext'>  SoundFi+ lets you upload your own songs, ad-free, with other users.</h2>
            </div>

        </div>
    );
}

export default Navigation;
