import oStyles from './modal-overlay.module.css';
import { modalOverlay } from '../../utils/proptypes';

export const ModalOverlay = (props) => {
    ModalOverlay.propTypes = modalOverlay;
    
    return (
        <div className={oStyles.overlay} onClick={props.onClose}>
            {props.children}
        </div>
    )
};
