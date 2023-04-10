import React, { useState } from 'react'
import { Modal, Button } from "react-bootstrap"

const LogoutModal = (props) => {
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
                    <Modal.Title>Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                    Are you sure you want to Logout?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onClose}>
                        Close
                    </Button>
                    <Button variant="danger" disabled={props.isdisabled} onClick={props.logout}>{props.isloggingout} </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default LogoutModal