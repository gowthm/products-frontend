import Modal from "@mui/material/Modal";
import "../login/login.css";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { instance } from "../../services/apiService.";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close"; 


export default function Register({
  open,
  handleClose,
  createNew
}) {

  const initialValues = {
    email: "",
    password: "",
  };
  const navigate = useNavigate()

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("")

  const openSnackbarMessage = (message) => {
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  };

  const LoginSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Valid email is required"),
    password: Yup.string().required("password is required"),
  });
  const submitSignup = (values) => {
    const reqObject = {
      user_name: values?.email,
      password: values?.password,
      name: values?.email.split('@')[0]
    }
    const registerApi = instance
      .post("/api/user", reqObject)
      .then((loginResponse) => {
        console.log("loginResponseloginResponse", loginResponse)
        if (loginResponse['data']['status'] == true) {
          console.log("loginResponse", loginResponse)
          sessionStorage.setItem("username", JSON.stringify(reqObject['name']));
          handleClose();
          navigate("/products");
          openSnackbarMessage(loginResponse['data']['message']);

        } else {
          openSnackbarMessage("Signup failed. Please check your credentials.");

        }

      })
      .catch((err) => { 
        openSnackbarMessage("Signup failed. Please check your mail.")
      });
    return registerApi;
  };



  return (
    <div>
       <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="modelPopUp"
      >
        <Container component="main" maxWidth="xs">
          <CssBaseline />

          <div className="close-icon" onClick={handleClose}>
            <CloseIcon />
          </div>


          <Formik
            initialValues={initialValues}
            validationSchema={LoginSchema}
            onSubmit={(values) => {
              submitSignup(values)
            }}
          >
            {({
              handleBlur,
              handleChange,
              values,
            }) => (
              <Form className="login-component">
                <Typography component="h1" variant="h5" className='text-center'>
                  Sign Up
                </Typography>
                <TextField
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Email id"
                  placeholder='Enter your email id'
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <ErrorMessage name="email" component="div" className="error-msg" />

                <TextField
                  margin="normal"
                  fullWidth
                  id="password"
                  label="Password"
                  placeholder='Enter your password'
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                <ErrorMessage name="password" component="div" className="error-msg" />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign up
                </Button>
                <Grid container>
                  <Grid item xs>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      <p onClick={createNew}>{"Already have an account? Sign In"}</p>
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
