import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CImage,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle
} from "@coreui/react";
import { ACTION } from "../../../constant/action";
export default function CreateEditCategoryModal({
  category,
  isLoading,
  action,
  closeModal,
  dispatchSubmit
}) {
  return (
    <CModal
      visible={action === ACTION.create || action === ACTION.edit}
      onClose={closeModal}
      aria-labelledby="Write"
    >
      <CModalHeader>
        <CModalTitle id="Write">
          {action === ACTION.create ? "Create" : "Edit"} a category
        </CModalTitle>
      </CModalHeader>
      <CForm noValidate validated={validated} onSubmit={dispatchSubmit}>
        <CModalBody>
          <CCol md={12}>
            <CFormInput
              type="text"
              label="Category name"
              required
              onChange={(e) => handleChnage(e)}
              value={category.name}
              name="name"
            />
          </CCol>
          <CCol md={12} className="mt-2">
            <CImage
              hidden={!category?.icon}
              rounded
              thumbnail
              src={category?.icon}
              width={200}
              height={200}
            />
          </CCol>
          <CCol md={12}>
            <CFormInput
              type="file"
              label="Category icon"
              onChange={(e) => {
                setIcon(e.target.files[0]);
              }}
              name="icon"
            />
          </CCol>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={closeModal}>
            Close
          </CButton>
          <CButton color="primary" type="submit" disabled={isLoading}>
            Submit
          </CButton>
        </CModalFooter>
      </CForm>
    </CModal>
  );
}
