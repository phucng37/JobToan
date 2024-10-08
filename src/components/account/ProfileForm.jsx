import React from "react";
import { Field, reduxForm } from "redux-form";
import { compose } from "redux";
import renderFormGroupField from "../../helpers/renderFormGroupField";
import renderFormFileInput from "../../helpers/renderFormFileInput";
import {
  required,
  maxLengthMobileNo,
  minLengthMobileNo,
  digit,
  name,
  email,
} from "../../helpers/validation";
import { ReactComponent as IconPerson } from "bootstrap-icons/icons/person.svg";
import { ReactComponent as IconPhone } from "bootstrap-icons/icons/phone.svg";
import { ReactComponent as IconEnvelop } from "bootstrap-icons/icons/envelope.svg";
import { ReactComponent as IconGeoAlt } from "bootstrap-icons/icons/geo-alt.svg";
import { ReactComponent as IconCalendarEvent } from "bootstrap-icons/icons/calendar-event.svg";

const ProfileForm = (props) => {
  // const {
  //   handleSubmit,
  //   submitting,
  //   onSubmit,
  //   submitFailed,
  //   onImageChange,
  //   imagePreview,
  // } = props;
  return (
    <form
      // onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div className="card border-primary">
        <h6 className="card-header">
          <i className="bi bi-person-lines-fill" /> Profile Detail
        </h6>
        <img
          // src={imagePreview ? imagePreview : "../../images/NO_IMG.png"}
          alt=""
          className="card-img-top rounded-0 img-fluid bg-secondary"
        />
        <div className="card-body">
          <Field
            name="formFile"
            component={renderFormFileInput}
            // onImageChange={onImageChange}
            validate={[required]}
            tips="You don't allow uploading a photo more than 5MB"
          />
        </div>
      </div>
    </form>
  );
};

export default compose(
  reduxForm({
    form: "profile",
  })
)(ProfileForm);
