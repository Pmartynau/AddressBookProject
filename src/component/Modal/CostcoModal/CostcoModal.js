import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import styles from './CostcoModal.module.css';
import PropTypes from 'prop-types';

/**
 * Component to display modal window
 * You can pass different type of content in the body
 * by passing children props
 * @param {props} {
 *   show,
 *   handleClose,
 *   handleConfirm,
 *   titleText,
 *   children,
 *   secondaryBtnText,
 *   primaryBtnText,
 *   payload,
 *   showModalFooter
 * }
 * @returns JSX element to allow for selecting different address type
 */
export const CostcoModal = ({
  show,
  handleClose,
  handleConfirm,
  titleText,
  children,
  secondaryBtnText,
  primaryBtnText,
  payload,
  payload2,
  showModalFooter
}) => {
  // Function that uses a conditional to determine if payload & payload2 are present then handleConfirm, making sure to close the modal(handleClose) everytime
  let primaryFunction = () => {
    if (payload && payload2) {
      handleConfirm(payload, payload2);
      handleClose();
    } else if (payload && !payload2) {
      handleConfirm(payload);
      handleClose();
    } else {
      handleConfirm();
      handleClose();
    }
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header className={styles.modalheader}>
        <Modal.Title className={styles.modaltitle}>{titleText}</Modal.Title>
        <button type="button" className={styles.close} onClick={handleClose}>
          <span aria-hidden="true">×</span>
          <span className="sr-only">Close</span>
        </button>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      {showModalFooter ? (
        // Modal footer for Costco Modal
        <Modal.Footer>
          <Button
            className={styles.firstbutton}
            variant="secondary"
            onClick={handleClose}
          >
            {secondaryBtnText}
          </Button>
          <Button
            className={styles.secondbutton}
            variant="primary"
            onClick={() => primaryFunction()}
          >
            {primaryBtnText}
          </Button>
        </Modal.Footer>
      ) : (
        ''
      )}
    </Modal>
  );
};

//Proptypes for CostcoModal
CostcoModal.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired,
  titleText: PropTypes.string,
  secondaryBtnText: PropTypes.string,
  primaryBtnText: PropTypes.string,
  payload: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  showModalFooter: PropTypes.bool
};

CostcoModal.defaultProps = {
  show: false,
  payload: '',
  showModalFooter: true
};
