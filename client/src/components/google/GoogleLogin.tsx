import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { PubUser } from "../../../../shared";

declare type GoogleLoginProps = {
  text?: "signin_with" | "signup_with" | "continue_with" | "signin";
  // setError: (error: string) => void;
  onSuccess: (googleData: CredentialResponse) => void;
  onError: () => void;
};

export default function GoogleLoginButton({
  text,
  onSuccess,
  onError,
}: GoogleLoginProps) {
  const navigate = useNavigate();

  return (
    <>
      <span className=" self-center">
        <GoogleLogin
          onSuccess={onSuccess}
          onError={onError}
          theme="filled_blue"
          shape="circle"
          text={text}
        />
      </span>
    </>
  );
}
