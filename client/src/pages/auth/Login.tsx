import { Input, TextField } from "@mui/joy";
import axios, { AxiosResponse } from "axios";
import { FormEvent, useState } from "react";
import { Link, redirect, useLocation, useNavigate } from 'react-router-dom';


export default function Login() {
    const navigate = useNavigate();
    const { state } = useLocation()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");


    async function handleLogin(e: FormEvent) {
        e.preventDefault()

        if (username === "" || password === "") {
            setError("Please fill in all fields")
            return
        }

        console.log("form submission")

        const resp = await axios.post('/api/login', {
            username: username, password: password
        }, {
            headers: {
                "content-type": 'application/json'
            }
        }
        ).then((res: AxiosResponse) => {
            // TODO: Set the user Context
            navigate('/profile')

        }).catch((err: any) => {
            console.log(err)
            if (err.response.data.error_message) {
                setError(err.response.data!!.error_message)
            } else {
                setError("Could not login. Please try again later.")

            }
        })
        console.log(resp)

    }

    return (
        <>
            <div className="flex gap-4 -translate-y-10 flex-col justify-center items-center text-center w-full h-full">
                <h1 className="text-2xl">LOGIN</h1>
                {error && <h1 className=' text-error'> {error}</h1>}
                {state?.user_created && <h1 className=' text-success'> {state?.user_created}</h1>}
                <form id="login-form" onSubmit={handleLogin} className="flex flex-col gap-4">
                    <Input className="w-5/5" onChange={e => setUsername(e.target.value)} placeholder="Username" type="text" variant="outlined" />
                    <Input className="w-5/5" onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" variant="outlined" />
                    <h5 className="text-xs text-start text-sky-200 transition ease-in-out delay-100 hover:text-action">
                        <Link to="/signup">CLICK ME TO SIGN UP</Link>
                    </h5>
                    <button type='submit' form='login-form' className=" bg-sky-500 p-2 rounded-xl w-1/2 self-center transition ease-in-out delay-100 hover:bg-action ">
                        SIGN IN</button>

                    {/* <button type='submit' form='login-form' onClick={e => navigate('/api/login/google')} className="w-fit rounded-xl self-center hover:opacity-70">
                        <img src="./images/google_btn.png" />
                    </button> */}
                </form>
            </div>
        </>
    )
}