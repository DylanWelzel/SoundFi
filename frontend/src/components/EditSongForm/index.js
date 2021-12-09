import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditSongForm from './EditSongForm'

import './EditSongForm.css'

function LoginFormModal({ props }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className='loginbutton' onClick={() => setShowModal(true)}>Edit Song</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditSongForm props={props} setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}

export default LoginFormModal;
