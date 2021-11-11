import React from 'react';
import closeIcon from 'static/icons/close.svg';
import styles from './BuyStatusModal.module.scss';

function BuyStatusModal({ status, onClose }) {
  return (
    <div
      className={`${styles.BuyStatusModal} ${
        status.type === 'error' && styles.isError
      }`}
    >
      <div className={styles.header}>
        <button type="button" onClick={onClose} className={styles.close}>
          <img src={closeIcon} alt="Close" />
        </button>
        <h3>{status.message}</h3>
      </div>
    </div>
  );
}

export default BuyStatusModal;
