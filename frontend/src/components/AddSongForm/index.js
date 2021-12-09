import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SongForm from './AddSongForm'

import './AddSongForm.css'

function LoginFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className='loginbutton' onClick={() => setShowModal(true)}>Add Song</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <SongForm setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}

export default LoginFormModal;
