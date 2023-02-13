import { Input, TextField } from "@mui/joy";
import axios, { AxiosError, AxiosResponse } from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleLoginButton from "../../components/google/GoogleLogin";


export default function SignUp() {
    const navigate = useNavigate();

    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [isErrorFields, setErrorFields] = useState(false);
    const [errorFailed, setErrorFailed] = useState("");


    function checkEmail() {
        const emailRegex = new RegExp('^[a-zA-Z|0-9]+@[a-zA-Z]+.[com|ca]+$')
        if (emailRegex.test(email as string)) {
            console.log("email paassed")
            return true
        } else {
            console.log("email failed")
            return false
        }
    }

    async function fetchData(e: FormEvent) {
        e.preventDefault()
        // TODO: find a way to reset the error state
        setErrorFields(false)

        if (username === "" || password === "" || checkEmail() !== true) {
            setErrorFields(true)
            return
        }

        await axios.post('api/signup', {
            username: username,
            password: password,
            email: email
        }, {
            headers: {
                "content-type": 'application/json'
            }
        }).then((res: AxiosResponse) => {
            navigate('/login', { state: { user_created: "User Created." } })
        }).catch((err: any) => {
            if (!err.response.data.available) {
                setErrorFailed(err.response.data!!.error)
            } else {
                setErrorFailed("Could not sign up. Please try again later.")

            }
        })
    }

    return (
        <>
            <div className="flex gap-4 -translate-y-10 flex-col justify-center items-center text-center w-full h-full">
                <h1 className="text-2xl">SIGN UP</h1>
                {isErrorFields && <h1 className='text-sm text-error'>Please Enter All Fields And Try Again</h1>}

                <form id="signup-form" className="flex flex-col gap-4">
                    <Input className="w-5/5" name="signup-form" onChange={(e) => setUsername(e.target.value)} placeholder="Enter Your Username" type="text" variant="outlined" required />
                    <Input className="w-5/5" name="signup-form" onChange={(e) => setPassword(e.target.value)} placeholder="Enter Your Password" type="password" variant="outlined" required />
                    <Input className="w-5/5" name="signup-form" onChange={(e) => setEmail(e.target.value)} placeholder="Enter A .com or .ca Email" type="email" variant="outlined" required />

                    <h5 className="text-xs text-start text-sky-200 transition ease-in-out delay-100 hover:text-action">
                        <Link to="/login">Already have an account? Click Me</Link>
                    </h5>
                    {errorFailed && <h1 className='text-sm text-error '>{errorFailed}</h1>}

                    <button type='submit' onClick={fetchData} form='signup-form' className="bg-sky-500 p-2 rounded-xl w-1/2 self-center transition ease-in-out delay-100 hover:bg-action ">
                        SIGN UP</button>
                    <GoogleLoginButton text="signup_with"/>
                </form>
            </div>
        </>
    )
}