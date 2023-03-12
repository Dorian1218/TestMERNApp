import React from 'react'
import { AnimatePresence, motion } from "framer-motion"
import { AiFillCloseCircle } from "react-icons/ai"
import Alert from './Alert'

const Modal = props => {
    if (!props.show) {
        return null
    }

    return (
        <AnimatePresence>
            <div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.3 } }} exit={{ opacity: 0 }} className='modal'>
                    <motion.div intial={{ scale: 0 }} animate={{ scale: 1, transition: { duration: 0.3 } }} className="modal-content">
                        <motion.div intial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 3 } }} exit={{ opacity: 0 }} className="modal-header">
                            <div className='close-button-div'>
                                <button onClick={props.onClose} className='close-button'><AiFillCloseCircle size={24} /></button>
                            </div>
                            <h2 className='modal-title'>New Card</h2>
                        </motion.div>
                        <div className="modal-body">
                            <input className="input" value={props.name} type="text" placeholder='Title' onChange={props.setName} />
                            <input className="input" value={props.age} type="text" placeholder='Note' onChange={props.setAge} />
                            <Alert showAlertMsg={props.showAlert} message={props.error} />
                        </div>
                        <div className='modal-footer'>
                            <button className="modal-button" onClick={props.createCard}>Create Card</button>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </AnimatePresence>
    )
}
export default Modal