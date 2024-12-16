import {
  CButton,
  CCol,
  CForm,
  CFormSelect,
  CImage,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from "@coreui/react";
import CustomInput from "src/components/base/CustomInput";
import { ACTION } from "../../../constant/action";

export default function CreateEditBrannerModal({
  banner,
  isLoading,
  action,
  closeModal,
  dispatchSubmit,
  register,
  handleSubmit,
  errors,
}) {
  const handleValidateThumbnailImageField = () => {
    if (banner?.thumbnailURL) {
      return false;
    }
    return "This input is required";
  };
  return (
    <CModal
      visible={action === ACTION.create || action === ACTION.edit}
      onClose={closeModal}
      aria-labelledby="Write"
    >
      <CModalHeader>
        <CModalTitle id="Write">
          {action === ACTION.create ? "Create" : "Edit"} a banner
        </CModalTitle>
      </CModalHeader>
      <CForm onSubmit={handleSubmit(dispatchSubmit)}>
        <CModalBody>
          <CRow className="gap-3">
            <CCol md={12}>
              <CFormSelect
                label="Name"
                options={[
                  { label: "Main", value: "main" },
                  { label: "Sub", value: "sub" },
                  { label: "Event", value: "event" },
                ]}
                {...register("name", {
                  required: "Please select a option",
                })}
              />
            </CCol>
            <CCol md={12} hidden={!banner?.thumbnailURL}>
              <div className="text-center">
                <CImage
                  hidden={!banner?.thumbnailURL}
                  rounded
                  thumbnail
                  src={banner?.thumbnailURL}
                  height={200}
                />
              </div>
            </CCol>
            <CustomInput
              size={12}
              type="file"
              name="thumbnailURL"
              lable="Thumbnail"
              validation={{
                required: handleValidateThumbnailImageField(),
              }}
              errors={errors}
              register={register}
            />
            <CustomInput
              size={12}
              name="directURL"
              lable="Direct URL"
              validation={{
                required: "This input is required",
              }}
              errors={errors}
              register={register}
            />
          </CRow>
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
