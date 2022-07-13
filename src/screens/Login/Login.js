import React, { useEffect, useState } from "react";

import { Formik } from "formik";
import * as yup from "yup";
import {
  Visibility,
  VisibilityOff,
  Person,
  CachedOutlined,
} from "@mui/icons-material";
import {
  Typography,
  Alert,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { getLogin } from "../../redux/actions/loginAction";
import Card from "../../components/Card/Card";
import "./Login.css";

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { loginStatus, loading } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = yup.object({
    username: yup.string().required(),
    password: yup.string().required(),
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = () => {};

  const submitHandler = async (user) => {
    await dispatch(getLogin(user));
  };

  useEffect(() => {
    if (loginStatus === "success") {
      history.push("/dashboard");
    } else if (loginStatus === "Failed") {
      alert("something  wrong tyr agian");
    }
  }, [loginStatus]);
  return (
    <Card>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(fields) => {
          submitHandler(fields);
        }}
      >
        {({ errors, status, touched, values, handleChange, handleSubmit }) => (
          <Grid
            container
            spacing={3}
            direction={"column"}
            justify={"center"}
            alignItems={"center"}
          >
            <Grid item xs={12}>
              <Typography variant="h2">Welcome</Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined">
                <InputLabel htmlFor="username">Username</InputLabel>
                <OutlinedInput
                  id="username"
                  type="text"
                  value={values.username}
                  onChange={handleChange}
                  label="username"
                  fullWidth
                  startAdornment={
                    <InputAdornment position="start">
                      <IconButton aria-label="toggle username " edge="start">
                        {<Person />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined">
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            </Grid>
            <Grid>
              {loading ? (
                <CachedOutlined />
              ) : (
                <Button
                  variant="contained"
                  sx={{ mt: 4 }}
                  disabled={!values.username || !values.password}
                  onClick={() => handleSubmit(values.username, values.password)}
                >
                  Login
                </Button>
              )}
            </Grid>
            <Grid>
              {loginStatus === "Failed" && (
                <Alert sx={{ m: 3 }} severity="error">
                  invalid credentials— check it out!
                </Alert>
              )}
            </Grid>
          </Grid>
        )}
      </Formik>
    </Card>
  );
};
export default Login;
