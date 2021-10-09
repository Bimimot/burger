import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import { useEffect } from 'react';
import mStyles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalOverlay } from "../modal-overlay/modal-overlay";
import { Tmodal } from '../../utils/proptypes';
const modalRoot: Element = document.getElementById('modal')!;


export const Modal: FC<Tmodal> = React.memo(
    ({ children, isLoading, onClose, title }) => {

        useEffect(() => {
            document.addEventListener('keydown', closeByKey);
            return () => { document.removeEventListener('keydown', closeByKey) };
        }, [isLoading]);

        const closeByKey = (e: KeyboardEvent) => {
            if (e.key === "Escape" && !isLoading) {
                onClose()
            }
        }

        return ReactDOM.createPortal(
            (<ModalOverlay onClose={isLoading ? null : onClose}>
                <div className={mStyles.modalBox} onClick={(e) => e.stopPropagation()}>
                    {!isLoading && <button className={mStyles.closePosition}>
                        <CloseIcon onClick={onClose} type={"primary"}/>
                    </button>}

                    {title &&
                        <p className={"text text_type_main-large"}>
                            {title}
                        </p>
                    }

                    <div className={mStyles.content}>
                        {children}
                    </div>
                </div>
            </ModalOverlay>), modalRoot)
    }
);

