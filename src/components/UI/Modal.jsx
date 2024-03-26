import React from 'react'
import classes from './Modal.module.css'
import ReactDOM from 'react-dom'

const ModalOverlay = props => {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    )
}

const BackDrop = props => {
    return (
        <div className={classes.backdrop} onClick={props.onClose}></div>
    )
}

const Modal = (props) => {
    const portalElement = document.getElementById('overlays')
  return (
    <React.Fragment>
        {ReactDOM.createPortal(<BackDrop onClose={props.onClose} />, portalElement)}
        {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
    </React.Fragment>
  )
}

export default Modal