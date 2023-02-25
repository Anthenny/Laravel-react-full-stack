import React from "react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../context/ContextProvider";

const Signup = () => {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const [errors, setErrors] = useState(null);
    const { setUser, setToken } = useStateContext();

    const onSubmit = (e) => {
        e.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        };
        // maak await van
        axiosClient
            .post("/signup", payload)
            .then(({ data }) => {
                setToken(data.token);
                setUser(data.user);
            })
            .catch((err) => {
                const response = err.response;

                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            });
    };
    return (
        <form onSubmit={onSubmit}>
            <h1 className="title">Signup for free</h1>
            {errors && <div className="alert">
                {Object.keys(errors).map(key => (
                    <p key={key}>{errors[key][0]}</p>
                ))}
            </div>}
            <input ref={nameRef} type="text" placeholder="Full Name" />
            <input ref={emailRef} type="email" placeholder="Email" />
            <input ref={passwordRef} type="password" placeholder="Password" />
            <input
                ref={passwordConfirmationRef}
                type="password"
                placeholder="Password confirmation"
            />
            <button className="btn btn-block" type="submit">
                Signup
            </button>
            <p className="message">
                Already registered?
                <Link to="/login">Sign in!</Link>
            </p>
        </form>
    );
};

export default Signup;
