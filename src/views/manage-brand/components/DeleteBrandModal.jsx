import {
    CButton,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle
} from "@coreui/react";
import React from "react";
import { ACTION } from "../../../constant/action";

export default function DeleteBrandModal({
  action,
  handleCloseModal,
  handleDelete,
}) {
  return (
    <CModal
      visible={action === ACTION.delete}
      onClose={handleCloseModal}
      aria-labelledby="delete-modal"
    >
      <CModalHeader>
        <CModalTitle id="delete-modal">Notification</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <p>Are you sure to delete this brand?</p>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={handleCloseModal}>
          Close
        </CButton>
        <CButton color="primary" onClick={handleDelete}>
          Yes
        </CButton>
      </CModalFooter>
    </CModal>
  );
}
