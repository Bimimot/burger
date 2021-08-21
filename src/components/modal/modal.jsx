import ReactDOM from 'react-dom';
import { useEffect } from 'react';
import mStyles from './modal.module.css';
import { modalProptypes } from '../../utils/proptypes';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalOverlay } from "../modal-overlay/modal-overlay";

const modalRoot = document.getElementById('modal');

export const Modal = (props) => {
    Modal.propTypes = modalProptypes;
    useEffect(() => {
        document.addEventListener('keydown', closeByKey);
        return () => { document.removeEventListener('keydown', closeByKey) };
    }, []);

    const closeByKey = (e) => {
        if (e.key === "Escape") {
            props.onClose()
        }
    }

    return ReactDOM.createPortal(
        (<ModalOverlay onClose={props.onClose}>
            <div className={mStyles.modalBox} onClick={(e) => e.stopPropagation()}>
                <ModalClose onClick={props.onClose} />
                {props.title && <ModalTitle title={props.title} />}
                <div className={mStyles.content}>
                    {props.children}
                </div>
            </div>
        </ModalOverlay>), modalRoot)
};

const ModalClose = ({ onClick }) =>
    <button className={mStyles.closePosition}>
        <CloseIcon onClick={onClick} />
    </button>;
    
const ModalTitle = ({ title }) =>
    <p className={"text text_type_main-large"}>
        {title}
    </p>;