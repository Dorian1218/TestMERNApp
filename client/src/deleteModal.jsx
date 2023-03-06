import React from 'react'
import { AiFillCloseCircle } from "react-icons/ai"

const DeleteModal = props => {
    if (!props.show) {
        return null
    }

    return (
        <div>
            <div className='modal'>
                <div className="modal-content">
                    <div className="modal-header">
                        <div className='close-button-div'>
                            <button onClick={props.closeDelModal} className='close-button'><AiFillCloseCircle size={24} /></button>
                        </div>
                        <h2 className='modal-title'>Delete Card</h2>
                    </div>
                    <div className="modal-body">
                        <h1>Are You Sure You want to delete this card?</h1>
                    </div>
                    <div className='modal-footer'>
                        <button className="delete-modal-button" onClick={props.deleteCard}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DeleteModal