import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

declare type GoogleLoginProps = {
  text?: "signin_with" | "signup_with" | "continue_with" | "signin"
};

export default function GoogleLoginButton({ text }: GoogleLoginProps) {
  const navigate = useNavigate();

  async function handleLogin(googleData: CredentialResponse) {
    const res = await axios
      .post(
        "/api/auth/google",
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
        console.log(res);
        const resp = res.data();
      })
      .catch((err: AxiosError) => {});
  }

  async function handleError() {
    navigate("/login", { state: { error: "Could not sign in with Google." } });
  }

  return (
    <>
      <span className=" self-center">
        <GoogleLogin
          onSuccess={handleLogin}
          onError={handleError}
          theme="filled_blue"
          shape="circle"
          text={text}
        />
      </span>
    </>
  );
}
