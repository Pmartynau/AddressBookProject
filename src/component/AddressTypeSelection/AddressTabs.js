import React from 'react';
import styles from './AddressTabs.module.css';

/**
 * Component to select different address Type
 *
 * @param {props} {
 *   onDeliveryAddressSelect,
 *   onBillingAddressSelect,
 *   addressTypeSelected
 * }
 * @returns JSX element to allow for selecting different address type
 */
export const AddressTypeSelection = ({
  onDeliveryAddressSelect,
  onBillingAddressSelect,
  addressTypeSelected
}) => {
  return (
    <div className="col-sm-12 col-lg-6">
      <div className={styles.table}>
        <div className={styles['table-row']}>
          <div
            className={[
              styles['table-cell'],
              addressTypeSelected === 'S' ? styles.active : ''
            ].join(' ')}
          >
            {/* Button for the Shipping Tab */}
            <button
              id="delivery"
              type="button"
              onClick={e => onDeliveryAddressSelect(e.target.id)}
              className="btn btn-link"
            >
              Shipping
            </button>
          </div>
          <div
            className={[
              styles['table-cell'],
              addressTypeSelected === 'B' ? styles.active : ''
            ].join(' ')}
          >
            {/* Button for the Billing Tab */}
            <button
              type="button"
              id="billing"
              onClick={e => onBillingAddressSelect(e.target.id)}
              className="btn btn-link"
            >
              Billing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
