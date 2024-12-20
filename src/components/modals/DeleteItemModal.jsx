import {
    CButton,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle
} from "@coreui/react";
import React from "react";
import { ACTION } from "../../constant/action";


export default function DeleteItemModal({ action, name, dispatchDelete, closeModal }) {
  return (
    <CModal
      visible={action === ACTION.delete}
      onClose={closeModal}
      aria-labelledby="delete-modal"
    >
      <CModalHeader>
        <CModalTitle id="delete-modal">Notification</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <p>Are you sure to delete {name}?</p>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={closeModal}>
          Close
        </CButton>
        <CButton color="primary" onClick={dispatchDelete}>
          Yes
        </CButton>
      </CModalFooter>
    </CModal>
  );
}
