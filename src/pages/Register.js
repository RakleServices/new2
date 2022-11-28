import React from 'react'
import { Modal, Button, Form, Table } from 'react-bootstrap';
import { useState } from 'react';
import { InsertBranch } from '../api';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Register() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [bname, setBName] = useState("");
    const [bphone, setBPhone] = useState("");
    const [bemail, setBemail] = useState("");
    const [bwhatsapp, setBWhatsapp] = useState("");
    const [blocation, setblocation] = useState("");
    const [bpassword, setbPassword] = useState("");
    const navigate = useNavigate();


    const SumitdataForm = () => {
        const formData = new FormData();
        formData.append("bname", bname);
        formData.append("bphone", bphone);
        formData.append("bemail", bemail);
        formData.append("bwhatsapp", bwhatsapp);
        formData.append("password", bpassword);
        formData.append("blocation", blocation);
        formData.append("transdate", Date.now());
        formData.append("bimage", selectedFile);
        formData.append("role", "vendor");
        submitTagData(formData);
    }
    const submitTagData = (body) => {
        InsertBranch(body).then(res => {
            if (res) {
                console.log("registered succesfully");
                navigate("/");
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
                                            <h4 className="text-center mb-4">Register Yourself Here </h4>

                                            <Form >
                                                <div className='row'>
                                                    <div className='col-md-6'>
                                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                                            <Form.Label>User Name</Form.Label>
                                                            <Form.Control name='bname' onChange={(e) => setBName(e.target.value)} type="text" placeholder="Enter Name" />
                                                            {/* <p style={{color:"red"}}>{formErrors.bname}</p> */}
                                                        </Form.Group>
                                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                                            <Form.Label>    </Form.Label>
                                                            <Form.Control name='bphone' onChange={(e) => setBPhone(e.target.value)} type="text" placeholder="Enter Phone" />
                                                            {/* <p style={{color:"red"}}>{formErrors.bphone}</p> */}
                                                        </Form.Group>
                                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                                            <Form.Label>Email</Form.Label>
                                                            <Form.Control name='bemail' onChange={(e) => setBemail(e.target.value)} type="text" placeholder="Enter Email" />
                                                            {/* <p style={{color:"red"}}>{formErrors.bemail}</p> */}
                                                        </Form.Group>
                                                    </div>
                                                    <div className='col-md-6'>
                                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                                            <Form.Label>Whatsapp No</Form.Label>
                                                            <Form.Control name='bwhatsapp' onChange={(e) => setBWhatsapp(e.target.value)} type="text" placeholder="Enter Whatsapp" />
                                                            {/* <p style={{color:"red"}}>{formErrors.bwhatsapp}</p> */}
                                                        </Form.Group>
                                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                                            <Form.Label>Password</Form.Label>
                                                            <Form.Control name='bpassword' onChange={(e) => setbPassword(e.target.value)} type="password" placeholder="Password" />
                                                            {/* <p style={{color:"red"}}>{formErrors.password}</p> */}
                                                        </Form.Group>
                                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                                            <Form.Label>Location</Form.Label>
                                                            <Form.Control name='blocation' onChange={(e) => setblocation(e.target.value)} type="text" placeholder="Location" />
                                                            {/* <p style={{color:"red"}}>{formErrors.blocation}</p> */}
                                                        </Form.Group>
                                                    </div>
                                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                                        <Form.Label>Image</Form.Label>
                                                        <Form.Control name='bimage' onChange={(e) => setSelectedFile(e.target.files[0])} type="file" placeholder="Location" />
                                                        {/* <p style={{color:"red"}}>{formErrors.blocation}</p> */}
                                                    </Form.Group>
                                                </div>


                                            </Form>
                                            <div className="text-center">
                                                <button type="button" onClick={SumitdataForm} className="btn btn-primary btn-block">Register</button>
                                            </div>
                                            <br></br>
                                            <div className="form-group">
                                                <Link to="/">Login Now</Link>
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

