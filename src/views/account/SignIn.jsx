import { lazy, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastError, ToastSuccess } from "../../notifi/toastify";
import { useDispatch, useSelector } from "react-redux";
import { handleStartLoginRedux } from "../../redux/slice/loginSlice";
const SignInForm = lazy(() => import("../../components/account/SignInForm"));

const phoneSchema = yup
  .string()
  .required("Sđt là bắt buộc nà")
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

const yupResolverLoginValidate = yup.object({
  phone: phoneSchema,
  password: pwSchema,
});

const SignInView = () => {
  const dispatch = useDispatch();
  const isLoginStatus = useSelector(
    (state) => state.loginReducer.isLoginStatus
  );
  const navigate = useNavigate();
  const { handleSubmit, ...method } = useForm({
    mode: "onSubmit",
    defaultValues: {
      phone: "",
      password: "",
    },
    resolver: yupResolver(yupResolverLoginValidate),
  });
  const onSubmit = handleSubmit(
    (res) => {
      //submit form thành công
      console.log("ok", res);
      dispatch(
        handleStartLoginRedux({
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
  useEffect(() => {
    if (isLoginStatus) {
      navigate("/home");
      ToastSuccess("Đăng nhập thành công");
    }
  }, [isLoginStatus]);

  return (
    <FormProvider {...method}>
      <div className="container my-3">
        <div className="row border">
          <div className="col-md-6 bg-light bg-gradient p-3 d-none d-md-block">
            <Link to="/">
              <img
                src="../../images/banner/Dell.webp"
                alt="..."
                className="img-fluid"
              />
            </Link>
          </div>
          <div className="col-md-6 p-3">
            <h4 className="text-center">Sign In</h4>
            <SignInForm onSubmit={onSubmit} />
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default SignInView;
