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
} from "@coreui/react";
import { useForm } from "react-hook-form";
import CustomInput from "src/components/base/CustomInput";
import { ACTION } from "../../../constant/action";

export default function CreateEditProductModal({
  isLoading,
  image,
  brands,
  categories,
  action,
  closeModal,
  dispatchSubmit,
  register,
  handleSubmit,
  errors,
}) {
  const handleValidateThumbnailImageField = ()=> {
    if(image?.primaryImage) {
      return false;
    }
    return "This input is required";
  };
  const handleValidateSubImagesField = ()=> {
    if(image?.subImages?.length) {
      return false;
    }
    return "This input is required";
  };
  return (
    <CModal
      size="lg"
      aria-hidden
      visible={ action === ACTION.create || action === ACTION.edit }
      onClose={closeModal}
      aria-labelledby="create-edit-modal"
    >
      <CModalHeader>
        <CModalTitle id="create-edit-modal">
          {action === ACTION.create ? "Create" : "Edit"} a product
        </CModalTitle>
      </CModalHeader>
      <CForm encType="" onSubmit={handleSubmit(dispatchSubmit)}>
        <CModalBody className="overflow-auto" style={{ height: 700 }}>
          <CustomInput
            size={12}
            name="name"
            lable="Product name"
            validation={{ required: "This input is required" }}
            errors={errors}
            register={register}
          />
          <CustomInput
            size={12}
            name="price"
            lable="Price"
            validation={{
              required: "This input is required",
              pattern: {
                value: /\d+/,
                message: "This input is number only.",
              },
            }}
            errors={errors}
            register={register}
          />
          <CustomInput
            size={12}
            name="quantity"
            lable="Quantity"
            validation={{
              required: "This input is required",
              pattern: {
                value: /\d+/,
                message: "This input is number only.",
              },
            }}
            errors={errors}
            register={register}
          />
          <CustomInput
            size={12}
            name="shortDescription"
            lable="Short description"
            validation={{
              required: "This input is required",
            }}
            errors={errors}
            register={register}
          />
          <div className="text-center my-2">
            <CImage rounded thumbnail src={image?.primaryImage} height={200} />
          </div>
          <CustomInput
            size={12}
            type="file"
            name="primaryImg"
            lable="Thumbnail"
            validation={{
              required: handleValidateThumbnailImageField(),
            }}
            errors={errors}
            register={register}
          />
          <div className="d-flex justify-content-around my-2 gap-2">
            {image?.subImages.map((image) => (
              <CImage
                rounded
                src={image}
                height={150}
                style={{ border: "1px solid #ccc" }}
              />
            ))}
          </div>
          <CustomInput
            multiple
            size={12}
            type="file"
            name="subImg1"
            lable="Sub Image"
            errors={errors}
            register={register}
            validation={{
              required: handleValidateSubImagesField(),
              validate: (values) => {
                if (values.length === 3 || (values.length === 0 && image.subImages?.length === 3)) {
                  return true;
                }
                return "Sub Image must have 3 image files";
              },
            }}
          />
          <CCol md={12} className="mt-2">
            <CFormSelect
              label="Category"
              {...register("category")}
              options={categories.map((category) => ({
                label: category.name,
                value: category._id,
              }))}
            />
          </CCol>
          <CCol md={12} className="mt-2">
            <CFormSelect
              label="Brand"
              {...register("brand")}
              options={brands.map((brand) => ({
                label: brand.name,
                value: brand._id,
              }))}
            />
          </CCol>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={closeModal}
          >
            Close
          </CButton>
          <CButton color="primary" type="submit" disabled={isLoading}>
            {action === ACTION.create ? "Submit" : "Update"}
          </CButton>
        </CModalFooter>
      </CForm>
    </CModal>
  );
}
