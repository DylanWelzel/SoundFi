import React, { useState } from "react";
import { useDispatch, } from "react-redux";
import * as sessionActions from "../../store/session";
import './SignUpForm.css';

function SignupForm() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const demoLogin = (e) => {
        e.preventDefault();
        return dispatch(sessionActions.login({ credential: 'Dylan', password: 'password' }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({ email, username, password }))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                });
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    return (
        <form className='signupform' onSubmit={handleSubmit}>
            <h1 className='signuptext'>Create An Account</h1>
            <ul>
                {errors.map((error, idx) => <li className='errors' key={idx}>{error}</li>)}
            </ul>
            <label>
                Email
                <input
                    className='userinput'
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </label>
            <label>
                Username
                <input
                    className='userinput'
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </label>
            <label>
                Password
                <input
                    className='userinput'
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </label>
            <label>
                Confirm Password
                <input
                    className='userinput'
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            </label>
            <button className='signupbutton' type="submit">Sign Up</button>
            <button className='loginbutton' onClick={demoLogin}>Demo User</button>
        </form>
    );
}

export default SignupForm;
