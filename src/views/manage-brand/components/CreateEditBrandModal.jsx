import {
    CButton,
    CForm,
    CImage,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle
} from "@coreui/react";
import CustomInput from "src/components/base/CustomInput";
import { ACTION } from "../../../constant/action";

export default function CreateEditBrandModal({
  brand,
  action,
  closeModal,
  dispatchSubmit,
  register,
  handleSubmit,
  errors,
}) {
  const handleValidateThumbnailImageField = () => {
    if (brand?.image) {
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
          {action === ACTION.create ? "Create" : "Edit"} a brand
        </CModalTitle>
      </CModalHeader>
      <CForm onSubmit={handleSubmit(dispatchSubmit)}>
        <CModalBody>
          <CustomInput
            size={12}
            name="name"
            lable="Name"
            validation={{
              required: "This input is required",
            }}
            errors={errors}
            register={register}
          />
          <div className="text-center my-2">
            <CImage
              hidden={!brand?.image}
              rounded
              thumbnail
              src={brand?.image}
              height={200}
            />
          </div>
          <CustomInput
            size={12}
            type="file"
            name="image"
            lable="Thumbnail"
            validation={{
              required: handleValidateThumbnailImageField(),
            }}
            errors={errors}
            register={register}
          />
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
