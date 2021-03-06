import { useState } from "react";
import UserModel from "../UserModel";
import "./Login.css";
import { socketManagerInstance } from "../../../Socket.io/SocketManager";
import {
  TextField,
  makeStyles,
  Typography,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core";
import { green, orange } from "@material-ui/core/colors";
import { useForm } from "react-hook-form"; // npm i react-hook-form
import { Globals } from "../../../Services/Globals";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import store from "../../../Redux/store";
import { userLoggedInAction } from "../../../Redux/AuthState";

function Login(): JSX.Element {
 const history = useHistory();
  const { register, handleSubmit } = useForm<UserModel>();

  async function send(user: UserModel) {
    try {
      const response = await Axios.post<UserModel>(
        Globals.authUrl + "login",
        user
      );

      const userLoggedIn = response.data;
      const action = userLoggedInAction({...userLoggedIn, isLoggedIn:true} );
      store.dispatch(action);

      socketManagerInstance.connect();


      history.push("/home");
    } catch (err) {
      console.log(err);
      alert("Error");
    }
  }

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
        <Typography variant="h3">Login </Typography>
        <form onSubmit={handleSubmit(send)}>
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
          <input className="input-button" type="submit"/>
        </form>
      </div>
    </ThemeProvider>
  );
}

export default Login;
