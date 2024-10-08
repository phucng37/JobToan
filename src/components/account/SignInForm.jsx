import React, { useState } from "react";
import { reduxForm } from "redux-form";
import { compose } from "redux";
import { Link } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import { useDispatch } from "react-redux";

const SignInForm = ({ onSubmit }) => {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext();

  const [type, setType] = useState(false);
  return (
    <form
      onSubmit={onSubmit}
      className={`needs-validation ${
        Object.keys(errors)?.length ? "was-validated" : ""
      }`}
      noValidate
    >
      <input
        type="text"
        {...register("phone")}
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
      />
      <div
        style={{
          bottom: "20px",
          top: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
        }}
      >
        <input
          type={!type ? "password" : "text"}
          {...register("password")}
          placeholder="Nhập mật khẩu"
          style={{
            width: "100%",
            display: "block",
            margin: "auto",
            borderRadius: "5px",
            outline: "none",
            border: "2px solid #ececec",
            height: "38px",
            position: "absolute",
          }}
        />
        <button
          type="button"
          className="btn"
          style={{
            position: "absolute",
            right: "8px",
          }}
          onClick={() => {
            setType(!type);
          }}
        >
          <i className={`bi ${!type ? "bi-eye-slash" : "bi-eye"}`}></i>
        </button>
      </div>

      <div
        className="d-grid"
        style={{ marginBottom: "20px", marginTop: "50px" }}
      >
        <button type="submit" className="btn btn-primary mb-3">
          Log In
        </button>
      </div>
      <Link
        style={{ textAlign: "center", display: "block" }}
        to="/account/signup"
        title="Sign Up"
      >
        Create your account
      </Link>
      <div className="clearfix"></div>
      <hr></hr>
    </form>
  );
};

export default compose(
  reduxForm({
    form: "signin",
  })
)(SignInForm);
