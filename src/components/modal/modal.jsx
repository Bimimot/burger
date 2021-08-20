import ReactDOM from 'react-dom';

import mStyles from './modal.module.css';
import { ModalOverlay } from "../modal-overlay/modal-overlay";

const modalRoot = document.getElementById('modal');

export const Modal = (props) => {



    return ReactDOM.createPortal(
        (
            <>

                <ModalOverlay onClose={props.onClose}>
                    <div className={mStyles.modalBox} onClick={(e) => e.stopPropagation()}>
                        
                        <p className={mStyles.header}>
                            {props.title}
                        </p>
                        <div className={mStyles.close} onClick={props.onClose}></div>
                                                
                    </div>
                </ModalOverlay>

            </>
        ), modalRoot)
}