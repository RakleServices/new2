import React from 'react'
import { json, Link } from 'react-router-dom'
import { Modal,Button, Form, Table } from 'react-bootstrap';

import { useState, useEffect } from 'react';
import { GetPlan ,InsertPlan, DeletePlan} from '../api';
import { useRef } from 'react';

function SubscriptionPlan() {
    const [plan, setPlan] = useState([]);
    const [modalShow, setModalShow] = React.useState(false);
    const [selectedBranch, setselectedBranch] = useState({});
    const [delmodalshow, setdelmodalshow] = React.useState(false);


    const showAddBranchModal = () =>{
        setselectedBranch({});
        setModalShow(true);
        console.log(modalShow)
    };

    const showUpdateBranchModal = (item) =>{
        // alert(item.bname);
        setselectedBranch(item);
        setModalShow(true);
    };

    const submitTagData = (body) => {
        InsertPlan({...body}).then(res => {
            if(res){
                setModalShow(false);
                GetPlanData();
                
            }
        })
    }
    const deleteModalShow =(id) => {
        setselectedBranch(id);
        setdelmodalshow(true);
        
    }
    const deleteData = async id => {
        // alert(id);
        await DeletePlan(id).then(res => {
            console.log(res);   
            if(res === "Subscription Plan  Deleted Succcessfully"){
                setdelmodalshow(false);
                GetPlanData();
            }
            else{
                alert("Plan not deleted");
            }
        })
        
      };
    const GetPlanData = () =>{
        GetPlan().then(res => {
            if (res && res.data) {
                setPlan(res.data)
                console.log(res.data);
            }
        })
    }
    useEffect(() => {
        
          GetPlanData();
    }, [])
    return (
        <div>


            <div className="content-body">
                <div className="container-fluid">
                    <div className="row page-titles mx-0">
                        <div className="col-sm-6 p-md-0">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="javascript:void(0)">Home</a></li>
                                <li className="breadcrumb-item active"><a href="javascript:void(0)">Plan</a></li>
                            </ol>
                        </div>
                        <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
                            <Button className='btn btn-primary mb-2' onClick={showAddBranchModal}>Add Plan</Button>

                        </div>
                    </div>



                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title">Plan Details</h4>
                                </div>
                                <div className="card-body">
                                    
                                    <div className="table-responsive">
                                        <Table striped hover responsive="md">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Plan Name</th>
                                                    <th>Amount</th>
                                                    <th>No Of Bid</th>
                                                    <th>Transdate</th>
                                                    <th>Action</th>
                                                    
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                   plan !== "No Rows Found" ? plan.map((item) => 
                                                        < tr >
                                                            <td>{item.planid}</td>
                                                            <td>{item.plnname}</td>
                                                            <td>{item.amount}</td>
                                                            <td>{item.noofbid}</td>
                                                            <td>{item.transdate}</td>
                                                           
                                                            <td >
                                                            <div className='row'>
                                                            <div onClick={() => showUpdateBranchModal(item)}  className="btn btn-primary shadow btn-xs sharp me-1"><i className="fas fa-pencil-alt"></i></div> || <div onClick={() => deleteModalShow(item.planid)}  className="btn btn-primary shadow btn-xs sharp me-1"><i className="fas fa-trash"></i></div>
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
                                                    <th>Plan Name</th>
                                                    <th>Amount</th>
                                                    <th>No Of Bid</th>
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
                onHide ={() => setModalShow(false)}
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

export default SubscriptionPlan;
function DeleteBranchModal(props){
    const {id,delonHide, delshow, deletetagdata} = props;

    useEffect(() =>{
        
        if(delshow){
            console.log(id)
        }
    }, [delshow])
    const deleteDataForm =() =>{
        
        let bid =id;
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
          <Modal.Title>Delete Plan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <p>Are You sure ? You want to delete</p>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="primary" onClick={delonHide}>Close</Button>
          <Button variant="primary" onClick={deleteDataForm}>Delete Plan</Button>
        </Modal.Footer>
      </Modal>
    )
}
function MyVerticallyCenteredModal(props){
    
    const {bn,onHide, show, submitTagData} = props;
    var bnlength = Object.keys(bn).length;
    let separator = '/'
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    var datenow = `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date}`

    
    const initialValues = {plnname:bnlength === 0 ?"" : bn.plnname, amount:bnlength === 0  ?"" : bn.amount, noofbid:bnlength === 0  ?"" : bn.noofbid};
    const [formValues, setformValues] = useState(initialValues);
    const [formErrors, setformErros] = useState({});
    const [fsubmit, fissubmit] = useState(false);
    const handleChange = (e) => {
        const {name, value} = e.target;
        setformValues({...formValues, [name]:value});
        // console.log(formValues);
    }

    const validate = (value) => {
        const error ={};
        if(!value.plnname){
            error.plnname = "Plan is required";
        }
        if(!value.amount){
            error.amount = "Amount is required";
        }
        if(!value.noofbid){
            error.noofbid = "Bid is required";
        }
        
        return error;
    }
    const LoginFunc = (e) =>{
        
        e.preventDefault();
        setformErros(validate(formValues));
        fissubmit(true);
        
    }
    if(show === true && bnlength !== 0){
            // alert(bn.bname)
            formValues.plnname = bn.plnname;
            formValues.amount = bn.amount;
            formValues.noofbid = bn.noofbid;
        
    }

    useEffect(() => {
        console.log(bn);
        console.log("vhjvh" +show);
        
        if(Object.keys(formErrors).length === 0 && fsubmit){
            console.log(formValues);
            
            let body = {
                planid:bn.planid,
                plnname:formValues.plnname,
                amount:formValues.amount,
                noofbid:formValues.noofbid,
                transdate: datenow
            };
            console.log("Body:", body);
            submitTagData(body);
        
            // SubmitloginForm(formValues);
        }
        
    }, [formErrors])
    

    return (
        <Modal
        show={props.show}
        size="md"
        // onHide={handleClose}
        // backdrop="static"
        centered
        aria-labelledby="contained-modal-title-vcenter"
        // keyboard={false}
      >
        <Modal.Header >
          <Modal.Title>{bn && bn.planid ? 'Update' : 'Add'} Plan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form >
           <div className='row'>
            <div className='col-md-12'>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Plan Name</Form.Label>
                    <Form.Control name='plnname' value={formValues.plnname} onChange={handleChange} type="text" placeholder="Enter Name" />
                    <p style={{color:"red"}}>{formErrors.plnname}</p>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control name='amount' value={formValues.amount} onChange={handleChange} type="text" placeholder="Enter Phone" />
                    <p style={{color:"red"}}>{formErrors.amount}</p>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>No of Bid</Form.Label>
                    <Form.Control name='noofbid' value={formValues.noofbid} onChange={handleChange} type="text" placeholder="Enter Email" />
                    <p style={{color:"red"}}>{formErrors.noofbid}</p>
                </Form.Group>
            </div>
            
           </div>
      
      
    </Form>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="primary" onClick={onHide}>Close</Button>
          <Button variant="primary" onClick={LoginFunc}>{bn && bn.planid ? 'Update' : 'Add'} Plan </Button>
        </Modal.Footer>
      </Modal>
    )
}