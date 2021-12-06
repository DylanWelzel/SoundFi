import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";

function LoginForm() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const demoLogin = (e) => {
        e.preventDefault();
        return dispatch(sessionActions.login({ credential: 'Demo-lition', password: 'password' }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password })).catch(
            async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            }
        );
    };

    return (
        <form className='loginform' onSubmit={handleSubmit}>
            <h1 className='logintext'>Login To Your Account</h1>
            <ul>
                {errors.map((error, idx) => (
                    <li className='errors' key={idx}>{error}</li>
                ))}
            </ul>
            <label>
                Username or Email
                <input
                    className='userinput'
                    type="text"
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                    required
                />
            </label>
            <label>
                Password
                <input
                    className='passwordinput'
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </label>
            <button className='loginbutton' type="submit">Log In</button>
            <button className='loginbutton' onClick={demoLogin}>Demo User</button>
        </form>
    );
}

export default LoginForm;
