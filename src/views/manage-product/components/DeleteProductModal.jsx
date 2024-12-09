import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import React from "react";
import { ACTION } from "src/constant/action";

export default function DeleteProductModal({
  action,
  closeModal,
  deleteProduct,
}) {
  return (
    <CModal
      aria-hidden
      visible={action === ACTION.delete}
      onClose={closeModal}
      aria-labelledby="delete-modal"
    >
      <CModalHeader>
        <CModalTitle id="delete-modal">Notification</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <p>Are you sure to delete this product?</p>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={closeModal}>
          Close
        </CButton>
        <CButton color="primary" onClick={deleteProduct}>
          Yes
        </CButton>
      </CModalFooter>
    </CModal>
  );
}
