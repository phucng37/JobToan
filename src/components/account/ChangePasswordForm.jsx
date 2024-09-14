import React from "react";
import { Field, reduxForm } from "redux-form";
import { compose } from "redux";
import renderFormGroupField from "../../helpers/renderFormGroupField";
import { required, maxLength20, minLength8 } from "../../helpers/validation";
import { ReactComponent as IconShieldLock } from "bootstrap-icons/icons/shield-lock.svg";
import { useFormContext, Controller } from "react-hook-form";

const ChangePasswordForm = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useFormContext();

  const onSubmit = handleSubmit(
    (res) => {
      console.log("ok", res);
    },
    (err) => {
      console.log("lỗi", err);
    }
  );

  return (
    <div className="card border-info">
      <h6 className="card-header bg-info text-white">
        <i className="bi bi-key"></i> Change Password
      </h6>
      <div className="card-body">
        <form onSubmit={onSubmit} noValidate>
          <label>
            Current Password <strong style={{ color: "red" }}>*</strong>
          </label>
          <Controller
            control={control}
            name="currentPw"
            render={({ field }) => (
              <input
                type="text"
                placeholder="Nhập số điện thoại"
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
                {...field}
              />
            )}
          />

          <label>
            New Password <strong style={{ color: "red" }}>*</strong>
          </label>
          <Controller
            control={control}
            name="newPw"
            render={({ field }) => (
              <input
                type="text"
                placeholder="Nhập số điện thoại"
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
                {...field}
              />
            )}
          />

          <label>
            Confirm New Password <strong style={{ color: "red" }}>*</strong>
          </label>
          <Controller
            control={control}
            name="reNewPw"
            render={({ field }) => (
              <input
                type="text"
                placeholder="Nhập số điện thoại"
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
                {...field}
              />
            )}
          />
          <button type="submit" className="btn btn-info  d-flex">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default compose(
  reduxForm({
    form: "changepassword",
  })
)(ChangePasswordForm);
