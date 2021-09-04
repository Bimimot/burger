import React from 'react';
import ReactDOM from 'react-dom';
import { useEffect } from 'react';
import mStyles from './modal.module.css';
import { modalProptypes, modalTitleProptypes, modalCloseProptypes } from '../../utils/proptypes';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalOverlay } from "../modal-overlay/modal-overlay";

const modalRoot = document.getElementById('modal');

export const Modal = React.memo(
    ({children, isLoading, onClose, title}) => {
        Modal.propTypes = modalProptypes;

        useEffect(() => {
            document.addEventListener('keydown', closeByKey);
            return () => { document.removeEventListener('keydown', closeByKey) };
        }, [isLoading]);

        const closeByKey = (e) => {
            if (e.key === "Escape" && !isLoading) {
                onClose()
            }
        }

        return ReactDOM.createPortal(
            (<ModalOverlay onClose={isLoading ? null : onClose}>
                <div className={mStyles.modalBox} onClick={(e) => e.stopPropagation()}>
                    {!isLoading && <ModalClose onClose={onClose} />}
                    
                    {title && <ModalTitle title={title} />}

                    <div className={mStyles.content}>
                        {children}
                    </div>
                </div>
            </ModalOverlay>), modalRoot)
    }
);

const ModalClose = ({ onClose }) =>
    <button className={mStyles.closePosition}>
        <CloseIcon onClick={onClose} />
    </button>;
ModalClose.propTypes = modalCloseProptypes;

const ModalTitle = ({ title }) =>
    <p className={"text text_type_main-large"}>
        {title}
    </p>;
ModalTitle.propTypes = modalTitleProptypes;