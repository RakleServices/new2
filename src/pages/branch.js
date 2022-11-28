import React from 'react'
import { json, Link } from 'react-router-dom'
import { Modal, Button, Form, Table } from 'react-bootstrap';

import { useState, useEffect } from 'react';
import { GetBranch, InsertBranch, DeleteBranch } from '../api';
import { useRef } from 'react';

function Branch() {
    const [branch, setBranch] = useState([]);
    const [modalShow, setModalShow] = React.useState(false);
    const [selectedBranch, setselectedBranch] = useState({});
    const [delmodalshow, setdelmodalshow] = React.useState(false);


    const showAddBranchModal = () => {
        setselectedBranch({});
        setModalShow(true);
        console.log(modalShow)
    };

    const showUpdateBranchModal = (item) => {
        // alert(item.bname);
        setselectedBranch(item);
        setModalShow(true);
    };

    const submitTagData = (body) => {
        InsertBranch(body).then(res => {
            if (res) {
                setModalShow(false);
                GetBranchData();

            }
        })
    }
    const deleteModalShow = (id) => {
        setselectedBranch(id);
        setdelmodalshow(true);

    }
    const deleteData = async id => {
        // alert(id);
        await DeleteBranch(id).then(res => {
            console.log(res);
            if (res && res.data) {
                setdelmodalshow(false);
                GetBranchData();
            }
            else {
                alert("Branch not deleted");
            }
        })

    };
    const url = "https://service.nilamiadda.com";
    const GetBranchData = () => {
        GetBranch().then(res => {
            if (res && res.data) {
                setBranch(res.data)
                console.log(res.data);
            }
        })
    }
    useEffect(() => {

        GetBranchData();
    }, [])
    return (
        <div>


            <div className="content-body">
                <div className="container-fluid">
                    <div className="row page-titles mx-0">
                        <div className="col-sm-6 p-md-0">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="javascript:void(0)">Home</a></li>
                                <li className="breadcrumb-item active"><a href="javascript:void(0)">Branch</a></li>
                            </ol>
                        </div>
                        <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
                            <Button className='btn btn-primary mb-2' onClick={showAddBranchModal}>Add Branch</Button>

                        </div>
                    </div>



                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title">Branch Details</h4>
                                </div>
                                <div className="card-body">

                                    <div className="table-responsive">
                                        <Table striped hover responsive="md">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Branch Name</th>
                                                    <th>Branch Phone</th>
                                                    <th>Branch Email</th>
                                                    <th>Whatsapp</th>
                                                    <th>Location</th>
                                                    <th>Transdate</th>
                                                    <th>Action</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    branch !== "No Rows Found" ? branch.map((item) =>
                                                        < tr >
                                                            <td>{item.bid}</td>
                                                            <td><img height={"80px"} width={"80px"} src={url + "/brimage/" + item.bimage} alt="" /></td>
                                                            <td>{item.bname}</td>
                                                            <td>{item.bphone}</td>
                                                            <td>{item.bemail}</td>
                                                            <td>{item.bwhatsapp}</td>
                                                            <td>{item.blocation}</td>
                                                            <td>{item.transdate}</td>

                                                            <td >
                                                                <div className='row'>
                                                                    <div onClick={() => showUpdateBranchModal(item)} className="btn btn-primary shadow btn-xs sharp me-1"><i className="fas fa-pencil-alt"></i></div> || <div onClick={() => deleteModalShow(item.bid)} className="btn btn-primary shadow btn-xs sharp me-1"><i className="fas fa-trash"></i></div>
                                                                </div>
                                                            </td>

                                                        </tr>
                                                    ) : <div>
                                                        <p>No Branch Found</p>
                                                    </div>
                                                }

                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Branch Name</th>
                                                    <th>Image</th>
                                                    <th>Branch Phone</th>
                                                    <th>Branch Email</th>
                                                    <th>Whatsapp</th>
                                                    <th>Location</th>
                                                    <th>Transdate</th>
                                                    <th>Action</th>
                                                </tr>
                                            </tfoot>
                                        </Table>
                                    </div>
                                </div>
                            </div>
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
            <MyVerticallyCenteredModal
                show={modalShow}
                bn={selectedBranch}
                onHide={() => setModalShow(false)}
                submitTagData={submitTagData}

            />
            <DeleteBranchModal
                delshow={delmodalshow}
                id={selectedBranch}
                delonHide={() => setdelmodalshow(false)}
                deletetagdata={deleteData}
            />
        </div>
    )
}

export default Branch;
function DeleteBranchModal(props) {
    const { id, delonHide, delshow, deletetagdata } = props;

    useEffect(() => {

        if (delshow) {
            console.log(id)
        }
    }, [delshow])
    const deleteDataForm = () => {

        let bid = id;
        deletetagdata(bid);
    }

    return (
        <Modal
            show={props.delshow}
            size="sm"
            // onHide={handleClose}
            // backdrop="static"
            centered
            aria-labelledby="contained-modal-title-vcenter"
        // keyboard={false}
        >
            <Modal.Header >
                <Modal.Title>Delete Branch</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are You sure ? You want to delete</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={delonHide}>Close</Button>
                <Button variant="primary" onClick={deleteDataForm}>Delete Branch</Button>
            </Modal.Footer>
        </Modal>
    )
}
function MyVerticallyCenteredModal(props) {

    const { bn, onHide, show, submitTagData } = props;
    var bnlength = Object.keys(bn).length;
    let separator = '/'
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    var datenow = `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date}`

    const [selectedFile, setSelectedFile] = useState(null);


    const [bname, setBName] = useState("");
    const [bphone, setBPhone] = useState("");
    const [bemail, setBemail] = useState("");
    const [bwhatsapp, setBWhatsapp] = useState("");
    const [blocation, setblocation] = useState("");
    const [bpassword, setbPassword] = useState("");





    

    useEffect(() => {
        if (show) {
            // debugger;
            var mname = document.getElementById('bname');
            var phone = document.getElementById('bphone');
            var email = document.getElementById('bemail');
            var whatsapp = document.getElementById('bwhatsapp');
            var password = document.getElementById('bpassword');
            var location = document.getElementById('blocation');
            // var bname = document.getElementById('bimage').value;

            mname.value = bn.bname;
            phone.value = bn.bphone;
            email.value = bn.bemail;
            whatsapp.value = bn.bwhatsapp;
            password.value = '';
            location.value = bn.blocation;

        }



    })
    const SumitdataForm = () => {
        const formData = new FormData();
        formData.append("bid", bn.bid);
        formData.append("bname", bname);
        formData.append("bphone", bphone);
        formData.append("bemail", bemail);
        formData.append("bwhatsapp", bwhatsapp);
        formData.append("password", bpassword);
        formData.append("blocation", blocation);
        formData.append("transdate", datenow);
        formData.append("bimage", selectedFile);
        submitTagData(formData);
    }


    return (
        <Modal
            show={props.show}
            size="lg"
            // onHide={handleClose}
            // backdrop="static"
            centered
            aria-labelledby="contained-modal-title-vcenter"
        // keyboard={false}
        >
            <Modal.Header >
                <Modal.Title>{bn && bn.bid ? 'Update' : 'Add'} Branch</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form encType="multipart/form">
                    <div className='row'>
                        <div className='col-md-6'>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Branch Name</Form.Label>
                                <Form.Control id='bname' name='bname' onChange={(e) => setBName(e.target.value)} type="text" placeholder="Enter Name" />
                                {/* <p style={{color:"red"}}>{formErrors.bname}</p> */}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Branch Phone</Form.Label>
                                <Form.Control id='bphone' name='bphone' onChange={(e) => setBPhone(e.target.value)} type="text" placeholder="Enter Phone" />
                                {/* <p style={{color:"red"}}>{formErrors.bphone}</p> */}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPasswor1">
                                <Form.Label>Branch Email</Form.Label>
                                <Form.Control id='bemail' name='bemail' onChange={(e) => setBemail(e.target.value)} type="text" placeholder="Enter Email" />
                                {/* <p style={{color:"red"}}>{formErrors.bemail}</p> */}
                            </Form.Group>
                        </div>
                        <div className='col-md-6'>
                            <Form.Group className="mb-3" controlId="formBasicEmail1">
                                <Form.Label>Whatsapp No</Form.Label>
                                <Form.Control id='bwhatsapp' name='bwhatsapp' onChange={(e) => setBWhatsapp(e.target.value)} type="text" placeholder="Enter Whatsapp" />
                                {/* <p style={{color:"red"}}>{formErrors.bwhatsapp}</p> */}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword2">
                                <Form.Label>Password</Form.Label>
                                <Form.Control id='bpassword' name='bpassword' onChange={(e) => setbPassword(e.target.value)} type="password" placeholder="Password" />
                                {/* <p style={{color:"red"}}>{formErrors.password}</p> */}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword3">
                                <Form.Label>Location</Form.Label>
                                <Form.Control id='blocation' name='blocation' onChange={(e) => setblocation(e.target.value)} type="text" placeholder="Location" />
                                {/* <p style={{color:"red"}}>{formErrors.blocation}</p> */}
                            </Form.Group>
                        </div>
                        <Form.Group className="mb-3" controlId="formBasicPassword4">
                            <Form.Label>Branch Image</Form.Label>
                            <Form.Control id='bimage' onChange={(e) => setSelectedFile(e.target.files[0])} type="file" placeholder="Location" />
                            {/* <p style={{color:"red"}}>{formErrors.blocation}</p> */}
                        </Form.Group>
                    </div>


                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={onHide}>Close</Button>
                <Button variant="primary" onClick={SumitdataForm}>{bn && bn.bid ? 'Update' : 'Add'} Branch</Button>
            </Modal.Footer>
        </Modal>
    )
}