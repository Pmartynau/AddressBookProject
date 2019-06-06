import {
  EDIT_ADDRESS,
  CANCEL_EDIT_ADD_ADDRESS,
  REMOVE_ADDRESS,
  CANCEL_REMOVE_ADDRESS,
  ADD_NEW_ADRESS,
  //Change default address confirmation
  CANCEL_DEFAULT_ADDRESS,
  ACCEPT_DEFAULT_ADDRESS,
  //Edit change default address confirmation modal
  EDIT_CONFIRM_DEFAULT_ADDRESS,
  EDIT_CANCEL_DEFAULT_ADDRESS
} from '../actions/addressBook.action';

const initialState = {
  //Modal for default address
  showDefaultAddressConfirmationModal: false,
  //Modal for edit default address confirm
  showEditConfirmDefaultAddress: false,
  showAddressRemoveConfirmationModal: false,
  showAddressFormModal: false
};

export const modalStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_ADDRESS:
      return {
        ...state,
        showAddressFormModal: true
      };
    case CANCEL_EDIT_ADD_ADDRESS:
      return {
        ...state,
        showAddressFormModal: false
      };
    case ADD_NEW_ADRESS:
      return {
        ...state,
        showAddressFormModal: true
      };
    case REMOVE_ADDRESS:
      return {
        ...state,
        showAddressRemoveConfirmationModal: true
      };
    case CANCEL_REMOVE_ADDRESS:
      return {
        ...state,
        showAddressRemoveConfirmationModal: false
      };

    //ACCEPT & CANCEL EDIT DEFAULT ADDRESS
    case ACCEPT_DEFAULT_ADDRESS:
      return {
        ...state,
        showDefaultAddressConfirmationModal: true
      };
    case CANCEL_DEFAULT_ADDRESS:
      return {
        ...state,
        showDefaultAddressConfirmationModal: false
      };

    // EDIT CONFIRM MODAL ADDRESS
    case EDIT_CONFIRM_DEFAULT_ADDRESS:
      return {
        ...state,
        showAddressFormModal: true,
        showEditConfirmDefaultAddress: true
      };
    case EDIT_CANCEL_DEFAULT_ADDRESS:
      return {
        ...state,
        showEditConfirmDefaultAddress: false
      };

    default:
      return state;
  }
};
