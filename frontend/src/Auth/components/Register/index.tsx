import { useFormik } from "formik";
import * as Yup from "yup";
import { authService } from "../../service";
import { Link, useHistory } from "react-router-dom";

export const Register = () => {
  const { push } = useHistory();

  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      fullname: Yup.string()
        .min(3, "Must be 3 characters or more")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(8, "Must be 8 characters or more")
        .required("Required"),
    }),
    onSubmit: (values) => {
      authService.registerUser(values).then(() => push("/login"));
    },
  });

  return (
    <div className="container my-4">
      <div className="row justify-content-center">
        <div className="col-lg-6 text-center">
          <h1>Register</h1>
          <form className="mb-3" onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputName" className="form-label">
                Fullname
              </label>
              <input
                type="text"
                onChange={formik.handleChange}
                className="form-control"
                name="fullname"
                id="exampleInputName"
                aria-describedby="nameHelp"
              />
              {formik.touched.fullname && formik.errors.fullname ? (
                <div className="error-msg text-danger">
                  {formik.errors.fullname}
                </div>
              ) : null}
            </div>
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
            <button type="submit" className="btn btn-primary ">
              Register
            </button>
          </form>
          <Link to="/login">Go to login</Link>
        </div>
      </div>
    </div>
  );
};
