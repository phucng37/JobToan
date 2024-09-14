import { yupResolver } from "@hookform/resolvers/yup";
import { lazy, Component } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import store1 from "../../redux/slice/rootSlice";

const ProfileForm = lazy(() => import("../../components/account/ProfileForm"));
const ChangePasswordForm = lazy(() =>
  import("../../components/account/ChangePasswordForm")
);

const curPwSchema = yup
  .string()
  .required("Mật khẩu cũ là bắt buộc")
  .test("check_currentpw", "Mật khẩu cũ không chính xác", (value) => {
    const pwRedux = store1.getState().loginReducer.password;
    return pwRedux === value;
  });

const pwSchema = yup
  .string()
  .required("Mật khẩu là bắt buộc")
  .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
  .max(20, "Mật khẩu không được quá 20 ký tự")
  .matches(/[a-z]/, "Mật khẩu phải chứa ít nhất một ký tự chữ thường")
  .matches(/[A-Z]/, "Mật khẩu phải chứa ít nhất một ký tự chữ hoa")
  .matches(/\d/, "Mật khẩu phải chứa ít nhất một chữ số")
  .matches(/[\W_]/, "Mật khẩu phải chứa ít nhất một ký tự đặc biệt");

const yupResolverSchema = yup.object({
  currentPw: curPwSchema,
  newPw: pwSchema,
  reNewPw: yup
    .string()
    .oneOf([yup.ref("newPw"), null], "Mật khẩu xác nhận không khớp")
    .required("Xác nhận mật khẩu mới là bắt buộc"),
});

const MyProfileView = () => {
  const method = useForm({
    mode: "onSubmit",
    resolver: yupResolver(yupResolverSchema),
  });
  return (
    <FormProvider {...method}>
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-md-10 mx-auto">
            <ChangePasswordForm />
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default MyProfileView;
