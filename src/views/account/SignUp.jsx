import { lazy } from "react";
import { Link } from "react-router-dom";

const SingUpForm = lazy(() => import("../../components/account/SignUpForm"));

const SignUpView = () => {
  return (
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
          <h4 className="text-center">Sign Up</h4>
          <SingUpForm />
        </div>
      </div>
    </div>
  );
};

export default SignUpView;
