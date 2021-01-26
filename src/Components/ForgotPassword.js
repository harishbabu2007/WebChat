import React, { useRef, useState } from "react";
import "./styles/Signup.css";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
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
  const { forgotPassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError();
      setSuccess();
      setLoading(true);
      await forgotPassword(email.current.value);
      setSuccess("Please check your inbox for furthur instructions");
    } catch {
      setError("Failed To Reset Passowrd maybe wrong email");
    }
    setLoading(false);
  };

  return (
    <React.Fragment>
      <h1 style={{ textAlign: "center" }}>Web Chat Forgot Password</h1>
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
              Forgot Password
            </h2>
            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}
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
              <Button
                style={{ width: "100%" }}
                variant="contained"
                color="primary"
                disabled={loading}
                type="submit"
              >
                Reset Password
              </Button>
            </form>
            <br />
            <h3 style={{ textAlign: "center" }}>
              already have an account <Link to="/login">login</Link>
            </h3>
          </CardContent>
        </Card>
      </div>
    </React.Fragment>
  );
}

export default Login;
