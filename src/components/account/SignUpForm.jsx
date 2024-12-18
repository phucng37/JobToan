import { reduxForm } from "redux-form";
import { compose } from "redux";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastError, ToastSuccess } from "../../notifi/toastify";
import { useDispatch } from "react-redux";
import { handleStartRegisterRedux } from "../../redux/slice/registerSlice";
import CustomInput from "../base/CustomInput";
const nameSchema = yup.string().required("Tên là bắt buộc");
const addressSchema = yup.string().required("Địa chỉ là bắt buộc");

const phoneSchema = yup
  .string()
  .required("Sđt là bắt buộc")
  .matches(/^(?:\+84|0)[1-9]\d{8,9}$/, "Sđt ko hợp lệ");

const pwSchema = yup
  .string()
  .required("Mật khẩu là bắt buộc")
  .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
  .max(20, "Mật khẩu không được quá 20 ký tự")
  .matches(/[a-z]/, "Mật khẩu phải chứa ít nhất một ký tự chữ thường")
  .matches(/[A-Z]/, "Mật khẩu phải chứa ít nhất một ký tự chữ hoa")
  .matches(/\d/, "Mật khẩu phải chứa ít nhất một chữ số")
  .matches(/[\W_]/, "Mật khẩu phải chứa ít nhất một ký tự đặc biệt");

const yupResolverSignUpValidate = yup.object({
  firstName: nameSchema,
  lastName: nameSchema,
  phone: phoneSchema,
  password: pwSchema,
  address: addressSchema
});

const SignUpForm = () => {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      password: "",
    },
    resolver: yupResolver(yupResolverSignUpValidate),
  });
  const onSubmit = handleSubmit(
    (res) => {
      //submit form thành công
      console.log("ok", res);
      dispatch(
        handleStartRegisterRedux({
          ...res,
        })
      );
    },
    (err) => {
      console.log("lỗi", err);
      //submit form lỗi
      for (let i = 0; i < Object.values(err).length; i++) {
        ToastError(Object.values(err)[i].message);
      }
    }
  );
  return (
    <form
      onSubmit={onSubmit}
      className={`needs-validation ${
        Object.keys(errors)?.length ? "was-validated" : ""
      }`}
      noValidate
    >
      <div className="row mb-2 mt-4">
        <div className="col-md-6">
          <input
            type="text"
            {...register("firstName")}
            placeholder="First Name"
            style={{
              width: "100%",
              display: "block",
              margin: "auto",
              borderRadius: "5px",
              outline: "none",
              border: "2px solid #ececec",
              height: "38px",
              marginBottom: "20px",
            }}
          />
        </div>
        <div className="col-md-6">
          <input
            type="text"
            {...register("lastName")}
            placeholder="Last Name"
            style={{
              width: "100%",
              display: "block",
              margin: "auto",
              borderRadius: "5px",
              outline: "none",
              border: "2px solid #ececec",
              height: "38px",
              marginBottom: "20px",
            }}
          />
        </div>
      </div>
      <input
        type="text"
        {...register("phone")}
        placeholder="Mobile no"
        style={{
          width: "100%",
          display: "block",
          margin: "auto",
          borderRadius: "5px",
          outline: "none",
          border: "2px solid #ececec",
          height: "38px",
          marginBottom: "20px",
        }}
      />
      <input
        type="text"
        {...register("password")}
        placeholder="Password***"
        style={{
          width: "100%",
          display: "block",
          margin: "auto",
          borderRadius: "5px",
          outline: "none",
          border: "2px solid #ececec",
          height: "38px",
          marginBottom: "20px",
        }}
      />
       <input
        type="text"
        {...register("address")}
        placeholder="Address***"
        style={{
          width: "100%",
          display: "block",
          margin: "auto",
          borderRadius: "5px",
          outline: "none",
          border: "2px solid #ececec",
          height: "38px",
          marginBottom: "20px",
        }}
      />
      <div className="d-grid">
        <button type="submit" className="btn btn-primary mb-3">
          Create
        </button>
      </div>
      <Link className="float-start" to="/account/signin" title="Sign In">
        Sing In
      </Link>
      <div className="clearfix"></div>
      <hr></hr>
    </form>
  );
};

export default compose(
  reduxForm({
    form: "signup",
  })
)(SignUpForm);
