import React, { useRef, useState } from "react";
import "./styles/Signup.css";
import { useAuth } from "../contexts/AuthContext";
import { auth } from "../firebase";
import { Link, useHistory } from "react-router-dom";
import {
  Card,
  CardContent,
  FormControl,
  TextField,
  Button,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";

function Signup() {
  const name = useRef();
  const email = useRef();
  const pass = useRef();
  const confPass = useRef();
  const { signup } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updateName = () => {
      auth.currentUser.updateProfile({
        displayName: name.current.value,
      });
    };

    if (pass.current.value === confPass.current.value) {
      try {
        setError();
        setLoading(true);
        await signup(email.current.value, pass.current.value);
        await updateName();
        history.push("/");
      } catch {
        setError("Failed to sign up maybe email already exists");
      }
      setLoading(false);
    } else {
      return setError("Passwords Do not match");
    }
  };

  return (
    <React.Fragment>
      <h1 style={{ textAlign: "center" }}>Web Chat Signup</h1>
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
              Sign up
            </h2>
            {error && <Alert severity="error">{error}</Alert>}
            <br />
            <form onSubmit={handleSubmit}>
              <FormControl>
                <TextField
                  fullWidth={true}
                  label="Your Name"
                  inputRef={name}
                  type="text"
                  variant="outlined"
                  disabled={loading}
                  required
                />
              </FormControl>
              <br />
              <br />
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
              <FormControl>
                <TextField
                  label="Confirm Password"
                  type="password"
                  inputRef={confPass}
                  variant="outlined"
                  disabled={loading}
                  fullWidth
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
                Sign Up
              </Button>
            </form>
            <br />
            <h3 style={{ textAlign: "center" }}>
              Already have an account <Link to="/login">Login</Link>
            </h3>
          </CardContent>
        </Card>
      </div>
    </React.Fragment>
  );
}

export default Signup;
