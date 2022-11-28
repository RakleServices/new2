import React from 'react'
import { json, Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { GetBanner, InsertBanner, DeleteBanner } from '../api';
import { Modal,Button, Form, Table } from 'react-bootstrap';
import {useRef} from 'react';

function Banner() {
    const [ban, setBanner] = useState([]);
    const [modalShow, setModalShow] = React.useState(false);
    const [selectCat, setSelectedCat] = useState({});
    const [delmodalshow, setdelmodalshow] = React.useState(false);
    const showAddCatagoryModal = () =>{
        setSelectedCat({});
        setModalShow(true);
        // console.log(modalShow)
    };

    const showUpdateCatagoryModal = (item) =>{
        setSelectedCat(item);
        setModalShow(true);
    };
    
    const submitTagData = (body) => {
        InsertBanner(body).then(res => {
            if(res){
                setModalShow(false);
                GetBannerData();
                
            }
        })
    }
    const deleteModalShow =(id) => {
        setSelectedCat(id);
        setdelmodalshow(true);
        
    }
    const deleteData = async id => {
        // alert(id);
        await DeleteBanner(id).then(res => {
          if(res && res.data){
                    setdelmodalshow(false);
                    GetBannerData();
          }
        });
        
      };
    const GetBannerData = () =>{
        GetBanner().then(res => {
            if (res && res.data) {
                setBanner(res.data)
                console.log(res.data);
            }
        })
    }
    useEffect(() => {
          GetBannerData();
    }, [])


    return (
        <div>

            <div>
                <div className="content-body">
                    <div className="container-fluid">
                        <div className="row page-titles mx-0">
                            <div className="col-sm-6 p-md-0">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="javascript:void(0)">Home</a></li>
                                    <li className="breadcrumb-item active"><a href="javascript:void(0)">Banner</a></li>
                                </ol>
                            </div>
                            <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
                                {/* <Link className="btn btn-primary mb-2" to="/addBusiness">Add Catagory</Link> */}

                                <Button className='btn btn-primary mb-2' onClick={showAddCatagoryModal}>Add Banner</Button>
                            </div>
                        </div>



                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h4 className="card-title">Banner</h4>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <Table striped hover responsive="md">
                                                <thead>
                                                    <tr>
                                                        <th>Id</th>
                                                        <th>Banner Image</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                       ban !== "No Rows Found" ? ban.map((item) => (
                                                            < tr >
                                                                <td>{item.id}</td>
                                                                {/* <td>{item.banimage}</td> */}
                                                                <td><img height={"80px"} width={"80px"} src={"https://service.nilamiadda.com/banner/" + item.banimage} alt="" /></td>
                                                                
                                                                <td >
                                                            <div className='row'>
                                                            <div onClick={() => deleteModalShow(item.id)}  className="btn btn-primary shadow btn-xs sharp me-1"><i className="fas fa-trash"></i></div>
                                                            </div> 
                                                            </td>
                                                            </tr>
                                                        )) : <div>No Image found</div>
                                                    }

                                                </tbody>
                                                <tfoot>
                                                    <tr>
                                                    <th>Id</th>
                                                        <th>Image</th>
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
            </div>
            
            <MyVerticallyCenteredModal
                show={modalShow}
                bn={selectCat}
                onHide ={() => setModalShow(false)}
                submitTagData={submitTagData}
                
            />
            <DeleteCatagoryModal
            delshow={delmodalshow}
            id={selectCat}
            delonHide={() => setdelmodalshow(false)}
            deletetagdata={deleteData}
             />
        </div >

    )
}

export default Banner;
function DeleteCatagoryModal(props){
    const {id,delonHide, delshow, deletetagdata} = props;

    useEffect(() =>{
        
        if(delshow){
            console.log(id)
        }
    }, [delshow])
    const deleteDataForm =() =>{
        
        let catid =id;
        console.log(catid);
        deletetagdata(catid);
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
          <Button variant="primary" onClick={deleteDataForm}>Delete Banner</Button>
        </Modal.Footer>
      </Modal>
    )
}
function MyVerticallyCenteredModal(props){
    
    const {bn,onHide, show, submitTagData} = props;
    const [name, setName] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [imsgeErr, setimageErr] = useState(false);
    
    useEffect(() =>{
        
        if(show){
          //   var name = document.getElementById('catname');
            var banimage = document.getElementById('banimage');
            
            banimage.src = bn.banimage;

           }
    }, [show])
    
    const submitForm =() =>{
        const formData = new FormData();
        if(!selectedFile){
            setimageErr("Image not selected");
        }
        else{
            formData.append("banimage", selectedFile);
            submitTagData(formData);
        }
       
        
    }

    return (
        <Modal
        show={props.show}
        size="md"
        centered
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header >
          <Modal.Title>{bn && bn.catid ? 'Update' : 'Add'} Banner</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form encType="multipart/form">
           <div >
            <div className='col-md-12'>
                
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Banner Image</Form.Label>
                    <Form.Control id='banimage' onChange={(e) => setSelectedFile(e.target.files[0])}  type="file" required/>
                    <p style={{color:"red"}}>{imsgeErr}</p>
                </Form.Group>
                
            </div>
            
           </div>
      
      
    </Form>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="primary" onClick={onHide}>Close</Button>
          <Button variant="primary" onClick={submitForm}>{bn && bn.catid ? 'Update' : 'Add'} Banner</Button>
        </Modal.Footer>
      </Modal>
    )
}