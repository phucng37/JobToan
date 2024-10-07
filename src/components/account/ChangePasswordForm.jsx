import React from "react";
import { Field, reduxForm } from "redux-form";
import { compose } from "redux";
import renderFormGroupField from "../../helpers/renderFormGroupField";
import { required, maxLength20, minLength8 } from "../../helpers/validation";
import { ReactComponent as IconShieldLock } from "bootstrap-icons/icons/shield-lock.svg";
import { useFormContext, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { handleChangePasswordRedux } from "../../redux/slice/loginSlice";

const ChangePasswordForm = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useFormContext();

  const dispatch = useDispatch();

  const onSubmit = handleSubmit(
    (res) => {
      console.log("ok", res);
      dispatch(handleChangePasswordRedux(res.newPw));
    },
    (err) => {
      console.log("lỗi", err);
    }
  );
  console.log(errors);

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
                placeholder="Enter old password"
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
          {errors.currentPw && (
            <p
              style={{
                marginBottom: "20px",
                fontFamily: "sans-serif",
                fontSize: "12px",
                color: "red",
              }}
            >
              {errors.currentPw.message}
            </p>
          )}

          <label>
            New Password <strong style={{ color: "red" }}>*</strong>
          </label>
          <Controller
            control={control}
            name="newPw"
            render={({ field }) => (
              <input
                type="text"
                placeholder="Enter new password"
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
          {errors.newPw && (
            <p
              style={{
                marginBottom: "20px",
                fontFamily: "sans-serif",
                fontSize: "12px",
                color: "red",
              }}
            >
              {errors.newPw.message}
            </p>
          )}

          <label>
            Confirm New Password <strong style={{ color: "red" }}>*</strong>
          </label>
          <Controller
            control={control}
            name="reNewPw"
            render={({ field }) => (
              <input
                type="text"
                placeholder="Enter confirm new password"
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
          {errors.reNewPw && (
            <p
              style={{
                marginBottom: "20px",
                fontFamily: "sans-serif",
                fontSize: "12px",
                color: "red",
              }}
            >
              {errors.reNewPw.message}
            </p>
          )}
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
