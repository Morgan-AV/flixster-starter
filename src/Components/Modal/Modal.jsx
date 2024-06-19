import react from "react";
import "../Modal/Modal.css";

import PropTypes from 'prop-types';


const Modal = ({show, onClose, children}) => {

    if(!show){
        return null;
    }

    return(
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <button onClick={onClose}>Close</button>
                </div>
                <div className="modal-body">{children}</div>

            </div>

        </div>
    )
    
}


Modal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};


export default Modal;