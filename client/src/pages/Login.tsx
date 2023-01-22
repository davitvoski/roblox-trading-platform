import { TextField } from "@mui/joy";
import axios from "axios";
import { FormEvent, useState } from "react";
import { redirect, useNavigate } from 'react-router-dom';


export default function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    async function handleLogin(e: FormEvent) {
        e.preventDefault()
        console.log("form submission")
        
        const resp = await axios.post('/api/login', {
            username: username, password: password
        }, {
            validateStatus: (status) => {
                return status === 200  
            },

            headers: {
                "content-type": 'application/json'
            }
        }
        ).catch( err => {
            setError(true)
            return
        })
        
        navigate('/profile')

    }

    return (
        <>
            <div className="flex gap-4 -translate-y-10 flex-col justify-center items-center text-center w-full h-full">
                <h1 className="text-2xl">LOGIN</h1>
                {error && <h1 className=' text-red-500'> Failed to Login! The user name or password are incorrect.</h1>}
                <form id="login-form" onSubmit={handleLogin} className="flex flex-col gap-4">
                    <TextField className="w-5/5" onChange={e => setUsername(e.target.value)} placeholder="Username" type="text" variant="outlined" />
                    <TextField className="w-5/5" onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" variant="outlined" />
                    <h5 className="text-xs text-start text-sky-200 transition ease-in-out delay-100 hover:text-action"> <a href="/signup">Don't have an account? SIGN UP</a></h5>
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