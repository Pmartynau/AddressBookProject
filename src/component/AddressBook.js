import React, { useEffect } from 'react';
import { AddNewAddressBox } from './AddNewAddressBox/AddNewAddressBox';
import { AddressCard } from './AddressCard/AddressCard';
import { ConfirmationModalContent } from './ConfirmationModalContent/ConfirmationModalContent';
import styles from './AddressBook.module.css';
import { AddressTypeSelection } from './AddressTypeSelection/AddressTabs';
import * as stringConst from '../Assets/stringConstant/stringConstant';
// import { CostcoModal } from "./UI/CostcoModal/CostcoModal";
import { AddressForm } from '../component/AddressForm/AddressForm';
import { CostcoModal } from './Modal/CostcoModal/CostcoModal';
import { AddressSort } from '../component/AddressSort/AddressSort';
import _ from 'lodash';
import { paginate } from '../Utility/utility';
import { Row } from 'react-bootstrap';

//pagination
import { CostcoPagination } from './CostcoPagination/CostcoPagination';
export const AddressBook = ({
  onGetAddresses: getAddresses,
  addresses,
  onDeliveryAddressSelect,
  onBillingAddressSelect,
  addressTypeSelected,
  defaultCurrentAddrhandler,
  currentDefaultAddrId,
  onSetDefaultAddress,
  onRemoveAddress,
  onCancelRemoveAddress,
  modalStatus,
  onRemoveAddressData,
  selectedAddressId,
  onEditAddress,
  onCancelEditAddAddress,
  onSaveAddress,
  onAddNewAddress,
  onSaveNewAddress,
  sortCriteria,
  onChangeSortCriteria,
  paginationData,
  //onCancelDefaultAddress
  onCancelDefaultAddress,
  onAcceptDefaultAddress,
  onEditConfirm,
  onEditCancel,
  onPaginationNextPrevious,
  onPaginationPageChange
}) => {
  //You can pass the special value of empty array []
  //as a way of saying “only run on mount and unmount”.
  useEffect(() => {
    getAddresses();
  }, []);

  let addressFormTitle = '';

  //if the selected address id is present
  //then user click the edit button
  //otherwise the user click the add new address button
  if (selectedAddressId !== -1) {
    addressFormTitle =
      addressTypeSelected === 'S'
        ? stringConst.EDIT_SHIPPING_ADDRESS
        : stringConst.EDIT_BILLING_ADDRESS;
  } else {
    addressFormTitle = stringConst.ADD_NEW_ADDRESS;
  }

  //initialize total count and final address to be displayed
  let totalCount = 0;
  let finalAddress = [];

  if (addresses) {
    //need to filtered address by addresstypeselected
    const filteredAddresses = addressTypeSelected
      ? addresses.filter(address => address.addressType === addressTypeSelected)
      : addresses;

    //sort address by selected sort criteria but default address always first
    const sortedAddresses = _.orderBy(
      filteredAddresses,
      ['isPrimary', sortCriteria.sortBy],
      ['desc', sortCriteria.sortOrder]
    );

    //get a list of address to be disaplayed based on
    //page size and current page
    finalAddress = paginate(
      sortedAddresses,
      paginationData.currentPage,
      paginationData.pageSize
    );

    totalCount = filteredAddresses.length;
  }

  return (
    <>
      <h2>Address Book</h2>

      {/* Address tabs: selecting whether tabs are initiated on Shipping or Billing */}
      <Row>
        <AddressTypeSelection
          onDeliveryAddressSelect={onDeliveryAddressSelect}
          onBillingAddressSelect={onBillingAddressSelect}
          addressTypeSelected={addressTypeSelected}
        />
      </Row>
      {/* Sorting through address card to filter through data  */}
      <AddressSort
        onChangeSortCriteria={onChangeSortCriteria}
        totalCount={totalCount}
        pageSize={paginationData.pageSize}
        currentPage={paginationData.currentPage}
      />

      <div className={styles.addressBox}>
        <div className={styles.flex_container}>
          {/*
           * Added a new AddressBox
           */}
          <AddNewAddressBox onAddNewAddress={onAddNewAddress} />

          {finalAddress.map(address => (
            <AddressCard
              key={address.id}
              address={address}
              addressTypeSelected={addressTypeSelected}
              currentDefaultAddrId={currentDefaultAddrId}
              setCurrentDefaultAddrId={defaultCurrentAddrhandler}
              onSetDefaultAddress={onEditAddress}
              onRemoveAddress={onRemoveAddress}
              onEditAddress={onEditAddress}
              //new
              onAcceptDefaultAddress={onAcceptDefaultAddress}
            />
          ))}
        </div>
      </div>
      <div className="row">
        <CostcoPagination
          itemsCount={totalCount}
          pageSize={paginationData.pageSize}
          onPageChange={onPaginationPageChange}
          currentPage={paginationData.currentPage}
          maxLink={paginationData.maxLink}
          onHandleNext={onPaginationNextPrevious}
          onHandlePrevious={onPaginationNextPrevious}
        />
      </div>
      {/*
       * Removing Address Confirrmation Modal
       */}
      <CostcoModal
        show={modalStatus.showAddressRemoveConfirmationModal}
        titleText={stringConst.REMOVE_ADDRESS}
        primaryBtnText={stringConst.REMOVE}
        secondaryBtnText={stringConst.CANCEL}
        handleClose={onCancelRemoveAddress}
        payload={selectedAddressId}
        handleConfirm={onRemoveAddressData}
      >
        <ConfirmationModalContent
          confirmationText={stringConst.REMOVE_ADDRESS_CONFIRMATION_TEXT}
        />
      </CostcoModal>

      {/* NEWNEW This is the edit default confirmation modal */}
      <CostcoModal
        show={modalStatus.showEditConfirmDefaultAddress}
        titleText={stringConst.CHANGE_DEFAULT_ADDRESS}
        primaryBtnText={stringConst.ACCEPT}
        secondaryBtnText={stringConst.CANCEL}
        handleClose={onEditCancel}
        payload={selectedAddressId}
        handleConfirm={onEditConfirm}
      >
        <ConfirmationModalContent
          confirmationText={
            stringConst.CHANGE_DEFAULT_ADDRESS_CONFIRMATION_TEXT
          }
        />
      </CostcoModal>

      {/* NEW This is change default address confirmation modal */}
      <CostcoModal
        show={modalStatus.showDefaultAddressConfirmationModal}
        titleText={stringConst.CHANGE_DEFAULT_ADDRESS}
        primaryBtnText={stringConst.ACCEPT}
        secondaryBtnText={stringConst.CANCEL}
        handleClose={onCancelDefaultAddress}
        payload={currentDefaultAddrId}
        payload2={selectedAddressId}
        handleConfirm={onSetDefaultAddress}
      >
        <ConfirmationModalContent
          confirmationText={
            stringConst.CHANGE_DEFAULT_ADDRESS_CONFIRMATION_TEXT
          }
        />
      </CostcoModal>
      {/* This is EDIT OR NEW address modal */}
      <CostcoModal
        show={modalStatus.showAddressFormModal}
        titleText={addressFormTitle}
        handleClose={onCancelEditAddAddress}
        payload={selectedAddressId}
        showModalFooter={false}
      >
        {/* Initialize the address form populating the data inside the form */}
        <AddressForm
          address={
            selectedAddressId !== -1
              ? addresses.find(address => {
                  return address.id === selectedAddressId;
                })
              : ''
          }
          onSaveAddress={
            selectedAddressId !== -1 ? onSaveAddress : onSaveNewAddress
          }
          handleCancel={onCancelEditAddAddress}
          addressTypeSelected={addressTypeSelected}
        />
      </CostcoModal>
    </>
  );
};
