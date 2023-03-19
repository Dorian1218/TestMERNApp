import React, { useState } from 'react'
import { AnimatePresence, motion } from "framer-motion"
import { AiFillCloseCircle } from "react-icons/ai"
import Alert from './Alert'
import { Modal, Button } from "react-bootstrap"

const ModalPop = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    return (
        <>

            <Modal
                show={props.show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                animation={true}
                centered
            >
                <Modal.Header >
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input className="input" value={props.name} type="text" placeholder='Title' onChange={props.setName} />
                    <input className="input" value={props.age} type="text" placeholder='Note' onChange={props.setAge} />
                    <Alert showAlertMsg={props.showAlert} message={props.error} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={props.createCard}>Understood</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ModalPop