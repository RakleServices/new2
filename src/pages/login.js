import React from 'react'
import { useRef, useState, useEffect } from 'react';
import Footer from './footer';
import { Link, useNavigate } from 'react-router-dom'
import { LoginUser } from '../api';

const Login = () => {
    const initialValues = { phone: "", password: "" };
    const [formValues, setformValues] = useState(initialValues);
    const [formErrors, setformErros] = useState({});
    const [fsubmit, fissubmit] = useState(false);
    const formRef = useRef();
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setformValues({ ...formValues, [name]: value });
        // console.log(formValues);
    }

    const RegistFunc = () =>{
        navigate("/register")
    }
    const validate = (value) => {
        const error = {};
        if (!value.phone) {
            error.phone = "Phone is required";
        }
        if (!value.password) {
            error.password = "Password is required";
        }
        return error;
    }
    const LoginFunc = (e) => {
        e.preventDefault();
        setformErros(validate(formValues));
        fissubmit(true);

    }
    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && fsubmit) {
            console.log(formValues);
            login(formValues.phone, formValues.password);
        }
    }, [formErrors])
    const userIdRef = useRef(null);
    const pwdRef = useRef(null);

    const login = (phone, password) => {
        LoginUser(phone, password)
            .then(res => {
                if (res) {
                    debugger;
                    if (res.Status === "Logged In") {
                        console.log(res);
                        sessionStorage.setItem("loggedIn", true);
                        sessionStorage.setItem("token", res.token);
                        sessionStorage.setItem("name", res.data[0].bname);
                        sessionStorage.setItem("bid", res.data[0].bid);
                        sessionStorage.setItem("role", res.data[0].role)
                        console.log(res.token)
                        window.location.reload(false);
                    }
                    else {
                        alert("Invalid Credentials");
                    }
                }
            })

    }
    return (
        <div className="vh-100">
            <div className="authincation h-100">
                <div className="container h-100">
                    <div className="row justify-content-center h-100 align-items-center">
                        <div className="col-md-6">
                            <div className="authincation-content">
                                <div className="row no-gutters">
                                    <div className="col-xl-12">
                                        <div className="auth-form">
                                            <div className="text-center mb-3">
                                                <a href="index.html"><img src="assets/logo2.png" alt="" /></a>
                                            </div>
                                            <h4 className="text-center mb-4">Sign in your account</h4>

                                            <div className="form-group">
                                                <label className="mb-1"><strong>Phone</strong></label>
                                                <input type="text" name='phone' value={formValues.phone} onChange={handleChange} className="form-control" placeholder='Enter Phone Number' />
                                            </div>
                                            <p style={{ color: "red" }}>{formErrors.phone}</p>
                                            <div className="form-group">
                                                <label className="mb-1"><strong>Password</strong></label>
                                                <input type="password" name='password' value={formValues.password} onChange={handleChange} className="form-control" placeholder='Enter password ' />
                                            </div>
                                            <p style={{ color: "red" }}>{formErrors.password}</p>
                                            <div className="form-row d-flex justify-content-between mt-4 mb-2">
                                                <div className="form-group">
                                                    <div className="form-check custom-checkbox ms-1">
                                                        <input type="checkbox" className="form-check-input"
                                                            id="basic_checkbox_1" />
                                                        <label className="form-check-label" for="basic_checkbox_1">Remember my
                                                            preference</label>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <a href="page-forgot-password.html">Forgot Password?</a>
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <button type="button" onClick={LoginFunc} className="btn btn-primary btn-block">Log In</button>
                                            </div>
                                            <br ></br>
                                            <div className="form-group">
                                            <button type="button" onClick={RegistFunc} className="btn btn-success btn-block">New Registration</button>
                                            </div>



                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;