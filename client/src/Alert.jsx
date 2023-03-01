import React from 'react'

const Alert = props => {
    if (!props.showAlertMsg) {
        return null
    }

    return (
        <p>{props.message}</p>
    )
}

export default Alert