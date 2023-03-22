import React, { useState } from 'react'
import Alert from './Alert'
import { Modal, Button, Form } from "react-bootstrap"

const ModalPop = (props) => {
    const [setShow] = useState(false);
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
                    <Modal.Title>Create Note</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                    <Form.Control className="input" value={props.name} type="text" placeholder='Title' onChange={props.setName} />
                    <Form.Control className="input" value={props.age} type="text" placeholder='Note' onChange={props.setAge} />
                    <Alert showAlertMsg={props.showAlert} message={props.error} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={props.createCard}>Create Note</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ModalPop