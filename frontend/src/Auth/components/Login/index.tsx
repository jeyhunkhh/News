import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IAppState } from "../../../redux/interface";
import { Link, useHistory } from "react-router-dom";

export const Login = () => {
  const dispatch = useDispatch();
  const { push } = useHistory();
  const user = useSelector((state: IAppState) => state.user);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      if (values.email && values.password) {
        dispatch(login(values));
      }
    },
  });

  useEffect(() => {
    if (user.status === `SUCCESS`) {
      push("/");
    }
  }, [user.status, push]);
  return (
    <div className="container my-4">
      <div className="row justify-content-center">
        <div className="col-lg-6 text-center">
          <h2>Login</h2>
          <form className="mb-3" onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                onChange={formik.handleChange}
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="error-msg text-danger">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                onChange={formik.handleChange}
                className="form-control"
                id="exampleInputPassword1"
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="error-msg text-danger">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
          <Link to="/register">Go to register</Link>
        </div>
      </div>
    </div>
  );
};
