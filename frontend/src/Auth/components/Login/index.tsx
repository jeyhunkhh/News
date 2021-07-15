import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IAppState } from "../../../redux/interface";
import { Link, useHistory } from "react-router-dom";
import "../index.scss";

export const Login = () => {
  const dispatch = useDispatch();
  const { push } = useHistory();
  const user = useSelector((state: IAppState) => state.user);
  const [loginErr, setLoginErr] = useState<string[]>();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      if (values.email && values.password) {
        dispatch(login(values));
      }
    },
  });

  useEffect(() => {
    if (user.status === `SUCCESS`) {
      push("/");
    }
    if (user.status === "ERROR") {
      setLoginErr(user.errors);
    }
  }, [user.status, user.errors, push]);
  return (
    <div className="container my-4">
      <h2 className="text-center">Login</h2>
      <div className="row align-items-center">
        <div className="col-lg-6">
          <form className="mb-3" onSubmit={formik.handleSubmit}>
            {loginErr && <span className="text-danger">{loginErr} </span>}
            <div className="mb-3 auth-input">
              <input
                type="email"
                className="form-control"
                placeholder="Email address"
                name="email"
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
                className="form-control auth-input"
                id="exampleInputPassword1"
              />
              <i className="fas fa-lock"></i>
              {formik.touched.password && formik.errors.password ? (
                <div className="error-msg text-danger">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>
            <button type="submit" className="btn btn-primary">
              Log in
            </button>
          </form>
          <Link to="/register">
            Go to register <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
        <div className="col-lg-6 text-center">
          <img
            src="https://colorlib.com/etc/regform/colorlib-regform-7/images/signin-image.jpg"
            alt="login"
          />
        </div>
      </div>
    </div>
  );
};
