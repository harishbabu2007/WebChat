import React, { useRef, useState } from "react";
import "./styles/Signup.css";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import {
  Card,
  CardContent,
  FormControl,
  TextField,
  Button,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";

function Login() {
  const email = useRef();
  const pass = useRef();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError();
      setLoading(true);
      await login(email.current.value, pass.current.value);
      history.push("/");
    } catch {
      setError("Failed To Login maybe wrong credentials");
    }
    setLoading(false);
  };

  return (
    <React.Fragment>
      <h1 style={{ textAlign: "center" }}>Web Chat Login</h1>
      <div className="signup">
        <Card style={{ width: "100%", maxWidth: "350px" }}>
          <CardContent>
            <h2
              style={{
                textTransform: "uppercase",
                textAlign: "center",
                marginBottom: "10px",
              }}
            >
              Login
            </h2>
            {error && <Alert severity="error">{error}</Alert>}
            <br />
            <form onSubmit={handleSubmit}>
              <FormControl>
                <TextField
                  fullWidth
                  inputRef={email}
                  label="Email"
                  type="email"
                  disabled={loading}
                  variant="outlined"
                  required
                />
              </FormControl>
              <br />
              <br />
              <FormControl>
                <TextField
                  fullWidth
                  inputRef={pass}
                  label="Password"
                  type="password"
                  disabled={loading}
                  variant="outlined"
                  required
                />
              </FormControl>
              <br />
              <br />
              <Button
                style={{ width: "100%" }}
                variant="contained"
                color="primary"
                disabled={loading}
                type="submit"
              >
                Login
              </Button>
            </form>
            <br />
            <h4 style={{ textAlign: "center" }}>
              Forgot Password <Link to="/forgot-password">Click here</Link>
            </h4>
            <h3 style={{ textAlign: "center" }}>
              Dont have an account <Link to="/signup">Sign up</Link>
            </h3>
          </CardContent>
        </Card>
      </div>
    </React.Fragment>
  );
}

export default Login;
