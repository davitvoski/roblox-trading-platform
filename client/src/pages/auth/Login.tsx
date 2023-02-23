import { Input, TextField } from "@mui/joy";
import { CredentialResponse } from "@react-oauth/google";
import axios, { AxiosResponse } from "axios";
import { FormEvent, useEffect, useState } from "react";
import { Link, redirect, useLocation, useNavigate } from "react-router-dom";
import { PubUser } from "../../../../shared";
import GoogleLoginButton from "../../components/google/GoogleLogin";

export default function Login() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleGoogleLogin(googleData: CredentialResponse) {
    await axios
      .post(
        "/api/auth/google/login",
        {
          token: googleData.credential,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res: AxiosResponse) => {
        const user: PubUser = res.data.user;
        navigate("/profile")
      })
      .catch((err: any) => {
        if (err.response.data.error_message) {
          setError(err.response.data!!.error_message);
        } else {
          setError("Could not login. Please try again later.");
        }
      });
  }

  async function handleGoogleError() {
    navigate("/login", {
      state: { error: "Could not sign in with Google." },
    });
  }

  async function handleLogin(e: FormEvent) {
    e.preventDefault();

    if (username === "" || password === "") {
      setError("Please fill in all fields");
      return;
    }
    await axios
      .post(
        "/api/login",
        {
          username: username,
          password: password,
        },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      )
      .then((res: AxiosResponse) => {
        // TODO: Set the user Context
        navigate("/profile");
      })
      .catch((err: any) => {
        console.log(err);
        if (err.response.data.error_message) {
          setError(err.response.data!!.error_message);
        } else {
          setError("Could not login. Please try again later.");
        }
      });
  }

  return (
    <>
      <div className="flex h-full w-full -translate-y-10 flex-col items-center justify-center gap-4 text-center">
        <h1 className="text-2xl">LOGIN</h1>
        {error && <h1 className=" text-error"> {error}</h1>}
        {state?.error && <h1 className=" text-error"> {state?.error}</h1>}
        {state?.user_created && (
          <h1 className=" text-success"> {state?.user_created}</h1>
        )}
        <form
          id="login-form"
          onSubmit={handleLogin}
          className="flex flex-col gap-4"
        >
          <Input
            className="w-5/5"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            type="text"
            variant="outlined"
          />
          <Input
            className="w-5/5"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            variant="outlined"
          />
          <h5 className="text-start text-xs text-sky-200 transition delay-100 ease-in-out hover:text-action">
            <Link to="/signup">CLICK ME TO SIGN UP</Link>
          </h5>
          <button
            type="submit"
            form="login-form"
            className=" w-1/2 self-center rounded-xl bg-sky-500 p-2 transition delay-100 ease-in-out hover:bg-action "
          >
            SIGN IN
          </button>
          <GoogleLoginButton
            text="signin_with"
            onError={handleGoogleError}
            onSuccess={handleGoogleLogin}
          />
        </form>
      </div>
    </>
  );
}
