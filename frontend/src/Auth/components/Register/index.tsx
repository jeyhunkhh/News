import { useFormik } from "formik";
import * as Yup from "yup";
import { authService } from "../../service";
import { Link, useHistory } from "react-router-dom";
import "../index.scss";

export const Register = () => {
  const { push } = useHistory();

  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema: Yup.object({
      fullname: Yup.string()
        .min(3, "Must be 3 characters or more")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(8, "Must be 8 characters or more")
        .required("Required"),
      passwordConfirm: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Passwords must match"
      ),
    }),
    onSubmit: (values) => {
      authService.registerUser(values).then(() => push("/login"));
    },
  });

  return (
    <div className="container my-4">
      <h1 className="text-center mb-3">Register</h1>
      <div className="row align-items-center">
        <div className="col-lg-6 text-center">
          <img
            src="https://colorlib.com/etc/regform/colorlib-regform-7/images/signup-image.jpg"
            alt="register"
          />
        </div>
        <div className="col-lg-6">
          <form className="mb-3" onSubmit={formik.handleSubmit}>
            <div className="mb-3 auth-input">
              <input
                type="text"
                onChange={formik.handleChange}
                className="form-control"
                placeholder="Fullname"
                name="fullname"
                id="exampleInputName"
                aria-describedby="nameHelp"
              />
              <i className="fas fa-user"></i>
              {formik.touched.fullname && formik.errors.fullname ? (
                <div className="error-msg text-danger">
                  {formik.errors.fullname}
                </div>
              ) : null}
            </div>
            <div className="mb-3 auth-input">
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Email address"
                onChange={formik.handleChange}
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              <i className="fas fa-envelope"></i>
              {formik.touched.email && formik.errors.email ? (
                <div className="error-msg text-danger">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>
            <div className="mb-3 auth-input">
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={formik.handleChange}
                className="form-control"
                id="exampleInputPassword1"
              />
              <i className="fas fa-lock"></i>
              {formik.touched.password && formik.errors.password ? (
                <div className="error-msg text-danger">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>
            <div className="mb-3 auth-input">
              <input
                type="password"
                name="passwordConfirm"
                placeholder="Confirm Password"
                onChange={formik.handleChange}
                className="form-control"
                id="exampleInputPassword2"
              />
              <i className="fas fa-lock"></i>
              {formik.touched.passwordConfirm &&
              formik.errors.passwordConfirm ? (
                <div className="error-msg text-danger">
                  {formik.errors.passwordConfirm}
                </div>
              ) : null}
            </div>
            <button type="submit" className="btn btn-primary ">
              Register
            </button>
          </form>
          <Link to="/login">
            Go to login <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};
