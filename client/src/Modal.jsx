import React from 'react'
import {AiFillCloseCircle} from "react-icons/ai"
import Alert from './Alert'

const Modal = props => {
    if (!props.show) {
        return null
    }

    return (
        <div>
            <div className='modal'>
                <div className="modal-content">
                    <div className="modal-header">
                        <div className='close-button-div'>
                            <button onClick={props.onClose} className='close-button'><AiFillCloseCircle size={24}/></button>
                        </div>
                        <h2 className='modal-title'>New Card</h2>
                    </div>
                    <div className="modal-body">
                        <input className="input" value={props.name} type="text" placeholder='Title' onChange={props.setName}/>
                        <input className="input" value={props.age} type="text" placeholder='Note' onChange={props.setAge}/>
                        <Alert showAlertMsg={props.showAlert} message={props.error}/>
                    </div>
                    <div className='modal-footer'>
                        <button className="modal-button" onClick={props.createCard}>Create Card</button>
                        <button onClick={props.removeMsg}>Remove alert</button>
                    </div>
                </div>
            </div>
        </div>
      )
}
export default Modal