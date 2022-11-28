import React from 'react'
import { Modal,Button, Form, Table, Tab } from 'react-bootstrap';
import { useRef } from 'react';
import { useState, useEffect } from 'react';
import { GetProductTag,UpsertProductTag, DeleteProductTag } from '../api';
import { Last } from 'react-bootstrap/esm/PageItem';
import { useSearchParams } from 'react-router-dom';
export default function ProductTags({product}){
    const [searchParams] = useSearchParams();
          const [pTag, setPTag] = useState([]);
          const [productid, setproductId] = useState();
          const [stag, setstag] = useState({});
          const [delmodalshow, setdelmodalshow] = React.useState(false);
          const formRef =  useRef();
          const [tagError, setTagerror] = useState('');
          const [descError, setdescError]= useState('');
          
          const deleteModalShow = (item) => {
            setstag(item);
            setdelmodalshow(true);
          }
          const deleteData = async id => {
            // alert(id);
            await DeleteProductTag(id).then(res => {
                if(res && res.data){
                    setdelmodalshow(false);
                    GetProductTag(productid).then(res => {
                        if (res && res.data) {
                            setPTag(res.data)
                            console.log("main product tag data",res.data);
                        }
                    })
                }
            });
            
          };
          
          useEffect(() => {
            // debugger;
            let productid = searchParams.get('productid')
            setproductId(productid);
            GetProductTag(productid).then(res => {
                if (res && res.data) {
                    setPTag(res.data)
                    console.log("main product tag data",res.data);
                }
            })
                  
          }, [pTag])
          
          const submitForm =() =>{
            if(formRef.current.tagname.value === '' && formRef.current.tagdesc.value === ''){
                setTagerror("Title is required");
                setdescError("Description is  required");
            }
              else{
                setTagerror("");
                setdescError("");
                let body = {
                    pid:productid,
                    tagname:formRef.current.tagname.value,
                    tagdesc:formRef.current.tagdesc.value
                };
                console.log("Body:", body);
                submitTagData(body);
              }
          }
          const submitTagData = (body) => {
              UpsertProductTag({...body}).then(res => {
                  if(res){
                      alert("Tag Added successfully");
                      GetProductTag(productid).then(res => {
                        if (res && res.data) {
                            setPTag(res.data)
                            console.log("main product tag data",res.data);
                        }
                    })
                      
                      
                  }
              })
          }
          return(
                    <div>
                         
                    <div className="content-body">
                        <div className="container-fluid">
                            <div className="row page-titles mx-0">
                            <div className='container'>
                            <Form ref={formRef}>
                                        <div className='row'>
                                        <div className='col-md-4'>
                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                                  <Form.Label>Tag Name</Form.Label>
                                                  <Form.Control name='tagname' type="text" placeholder="Enter Tag Name" />
                                                  <p style={{color:"red"}}>{tagError}</p>
                                        </Form.Group>
                                        </div>
                                        <div className='col-md-4'>
                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                                  <Form.Label>Tag Descripttion</Form.Label>
                                                  <Form.Control name='tagdesc' type="text" placeholder="Enter Description" />
                                                  <p style={{color:"red"}}>{descError}</p>
                                        </Form.Group>
                                        </div>
                                        <div className='col-md-4'>
                                                  <div className='mt-4 pt-2' >
                                                  <Button onClick={submitForm}>Add Product Tag</Button>
                                                  </div>
                                        </div>
                                        </div>
                                        </Form>
                            </div>
                            </div>
                            
        
        
        
                            <div className="row">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <h4 className="card-title">Product Tag</h4>
                                        </div>
                                        <div className="card-body">
                                            <div className="table-responsive">
                                            <Table striped hover responsive="md">
                                                  <thead>
                                                  <tr>
                                                            <th>ID</th>
                                                            <th>Product Id</th>
                                                            <th>Title</th>
                                                            <th>Title</th>
                                                            <th>Action</th>
                                                  </tr>
                                                  </thead>
                                                  <tbody>
                                                  {
                                                            pTag != "No Rows Found" ? pTag.map((item) =>(
                                                                <tr>
                                                                <td>{item.tid}</td>
                                                                <td>{item.pid}</td>
                                                                <td>{item.tagname}</td>
                                                                <td>{item.tagdesc}</td>
                                                                <th><div onClick={() => deleteModalShow(item.tid)}  className="btn btn-primary shadow btn-xs sharp me-1"><i className="fas fa-trash"></i></div></th>
                                                                </tr>)) : <p>No Any Tags are present</p>
                                                  }
                                                  </tbody>
                                                  
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
                    <DeleteProductModal
            delshow={delmodalshow}
            id={stag}
            delonHide={() => setdelmodalshow(false)}
            deletetagdata={deleteData}
             />
                    </div>
                    
          )
}

function DeleteProductModal(props){
    const {id,delonHide, delshow, deletetagdata} = props;

    useEffect(() =>{
        
        if(delshow){
            console.log(id)
        }
    }, [delshow])
    const deleteDataForm =() =>{
        
        let catid =id;
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
          <Modal.Title>Delete Tag</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <p>Are You sure ? You want to delete</p>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="primary" onClick={delonHide}>Close</Button>
          <Button variant="primary" onClick={deleteDataForm}>Delete Tag</Button>
        </Modal.Footer>
      </Modal>
    )
}