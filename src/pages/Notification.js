import React from 'react'
import { Modal, Button, Form, Table, Tab } from 'react-bootstrap';
import { useRef } from 'react';
import { useState, useEffect } from 'react';
import { PushNOtificationtoAll } from '../api';
import { Last } from 'react-bootstrap/esm/PageItem';
export default function Notifications() {
    const [notification, setNotifictaions] = useState([]);
    const formRef = useRef();
    const [tagError, setTagerror] = useState('');
    const [descError, setdescError] = useState('');


    const submitForm = () => {
        if (formRef.current.tagname.value === '' && formRef.current.tagdesc.value === '') {
            setTagerror("Title is required");
            setdescError("Description is  required");
        }
        else {
            setTagerror("");
            setdescError("");
            let body = {
                name: formRef.current.tagname.value,
                msg: formRef.current.tagdesc.value
            };
            console.log("Body:", body);
            submitTagData(body);
        }
    }
    const submitTagData = (body) => {
        PushNOtificationtoAll({ ...body }).then(res => {
            console.log(res)
            if (res && res.error === false) {
                alert(`Notification send succesfully to ${res.data.success}`);

            }
        })
    }
    return (
        <div>

            <div className="content-body">
                <div className="container-fluid">
                    <div className="row page-titles mx-0">
                        <div className='container'>
                            <Form ref={formRef}>
                                <div className='row'>
                                    <div className='col-md-4'>
                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control name='tagname' type="text" placeholder="Enter Name" />
                                            <p style={{ color: "red" }}>{tagError}</p>
                                        </Form.Group>
                                    </div>
                                    <div className='col-md-4'>
                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label>Descripttion</Form.Label>
                                            <Form.Control name='tagdesc' type="text" placeholder="Enter Description" />
                                            <p style={{ color: "red" }}>{descError}</p>
                                        </Form.Group>
                                    </div>
                                    <div className='col-md-4'>
                                        <div className='mt-4 pt-2' >
                                            <Button onClick={submitForm}>Push Notifictaion</Button>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div>





                </div>
            </div>

            <div className="footer">
                <div className="copyright">
                    <p>
                        Copyright © Designed &amp; Developed by{" "}
                        <a href="http://rakleitsolutions.com/" target="_blank">
                            Rakle IT Solutions
                        </a>
                        2022
                    </p>
                </div>
            </div>

        </div>

    )
}
