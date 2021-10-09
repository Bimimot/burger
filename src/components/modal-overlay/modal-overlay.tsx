import {FC} from 'react';
import oStyles from './modal-overlay.module.css';

declare module 'react' {
    interface HTMLAttributes<T> extends DOMAttributes<HTMLDivElement> {
        // extends React's HTMLAttributes
        onClick?: MouseEventHandler<HTMLDivElement> | undefined | null | (()=>void);
    }
}

export const ModalOverlay: FC<{onClose: (() => void) | null}> = (props) => {
    
    return (
        <div className={oStyles.overlay} onClick={props.onClose}>
            {props.children}
        </div>
    )
};
