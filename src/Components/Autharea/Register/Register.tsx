import {TextField, makeStyles,Typography,createMuiTheme,ThemeProvider} from "@material-ui/core";
import React from "react";
import { green, orange } from "@material-ui/core/colors";
import "./Register.css";
import { useForm  } from "react-hook-form"; // npm i react-hook-form
import UserModel from "../UserModel";
import { Globals } from "../../../Services/Globals";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import Input from "@material-ui/core/Input";



function Register(): JSX.Element {
  const history = useHistory();
  const { register, handleSubmit } = useForm<UserModel>();

  async function send(user: UserModel) {
    try {
      await Axios.post<UserModel>(Globals.authUrl + "register", user);
      alert("Hi, " + user.firstName +  " " + "you are a part of the family now");

      history.push("/login");
    } catch (err) {
      console.log(err);
      alert("Error");
    }
  }

  //creating my own classes
  const createClasses = makeStyles({
    textBox: { margin: "5px 0", width: "400px" },
  });

  const classes = createClasses();

  //create custom theme
  const theme = createMuiTheme({
    typography: {
      fontFamily: "Arial",
      fontSize: 15,
      h3: {
        fontSize: 30,
      },
    },
    palette: {
      primary: {
        main: orange[600],
      },
      secondary: {
        main: green[600],
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="register">
        <Typography variant="h3">
          Register{" "}
        </Typography>
        <form onSubmit={handleSubmit(send)}>
          <TextField
            label="First Name"
            name="firstName"
            variant="outlined"
            className={classes.textBox}
            inputRef={register}
          />
          <br />
          <TextField
            label="Last Name"
            type="text"
            name="lastName"
            variant="outlined"
            className={classes.textBox}
            inputRef={register}
          />
          <br />
          <TextField
            label="Username"
            type="text"
            name="username"
            variant="outlined"
            className={classes.textBox}
            inputRef={register}
          />
          <br />
          <TextField
            label="Password"
            type="password"
            name="password"
            variant="outlined"
            className={classes.textBox}
            inputRef={register}
          />
          <br />
          <input type="submit" />
        </form>
      </div>
    </ThemeProvider>
  );
}

export default Register;
