import oStyles from './modal-overlay.module.css';

export const ModalOverlay = (props) => (
        <div className={oStyles.overlay} onClick={props.onClose}>
            {props.children}
        </div>
)