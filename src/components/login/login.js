import Modal from "@mui/material/Modal";
import "./login.css";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { instance } from "../../services/apiService.";

export default function Login({ open, handleClose, createNew }) {
  const initialValues = {
    email: "",
    password: "",
  };

  const navigate = useNavigate();
  const LoginSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Valid email is required"),
    password: Yup.string().required("password is required"),
  });
  const submitLogin = (values) => {


    sessionStorage.setItem("fullstack-001", JSON.stringify("values"));
    handleClose();
    navigate("/products");

    const loginApi = instance
      .post("/login", values)
      .then((loginResponse) => {
        sessionStorage.setItem("fullstack-001", JSON.stringify("values"));
        handleClose();
        navigate("/products");
      })
      .catch((err) => {});
    return loginApi;
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="modelPopUp"
      >
        <Container component="main" maxWidth="xs">
          <CssBaseline />

          <Formik
            initialValues={initialValues}
            validationSchema={LoginSchema}
            onSubmit={(values) => {
              submitLogin(values);
            }}
          >
            {({ handleBlur, handleChange, values }) => (
              <Form className="login-component">
                <Typography component="h1" variant="h5" className="text-center">
                  Sign in
                </Typography>
                <TextField
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Email id"
                  placeholder="Enter your email id"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="error-msg"
                />

                <TextField
                  margin="normal"
                  fullWidth
                  id="password"
                  label="Password"
                  placeholder="Enter your password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error-msg"
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign in
                </Button>
                <Grid container>
                  <Grid item xs></Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      <p onClick={createNew}>
                        {"Don't have an account? Sign Up"}
                      </p>
                    </Link>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Container>
      </Modal>
    </div>
  );
}
