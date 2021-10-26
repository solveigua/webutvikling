import classes from './Modal.module.css';
import React, { Fragment } from 'react';
import ReactDOM  from 'react-dom';

const Backdrop:React.FC<{onClose: () => void}> = props => {
    return (
        <div className={classes.backdrop} onClick={props.onClose}/>
    );
};

const ModalOverlay:React.FC = props => {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    );
};

const portalElement = document.getElementById('overlays');

const Modal:React.FC<{onClose: () => void}> = props => {
    return (
        <Fragment>
            {ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>, portalElement!)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement!)}
        </Fragment>
    )
};

export default Modal;