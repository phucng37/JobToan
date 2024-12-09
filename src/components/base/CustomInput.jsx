import { CCol, CFormInput } from "@coreui/react";
import { ErrorMessage } from "@hookform/error-message";

const CustomInput = ({
  multiple,
  style,
  lable,
  size,
  type = "text",
  name,
  validation,
  errors,
  register,
}) => (
  <CCol md={size} style={style}>
    <CFormInput
      type={type}
      label={lable}
      {...register(name, {
        ...validation,
      })}
      multiple={multiple}
    />
    <ErrorMessage
      errors={errors}
      name={name}
      render={({ message }) => <p style={{ color: "red" }}>{message}</p>}
    />
  </CCol>
);

export default CustomInput;
