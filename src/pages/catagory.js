import React from 'react'
import { json, Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { GetCatagory, UpsertCatagory, DeleteCatagory } from '../api';
import { Modal,Button, Form, Table } from 'react-bootstrap';
import {useRef} from 'react';
import DataTable from 'react-data-table-component';

function Catagory() {
    const [cat, setCatagory] = useState([]);
    const [modalShow, setModalShow] = React.useState(false);
    const [editmodalShow, seteditModalShow] = React.useState(false);
    const [search, setSearch] = useState('');
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
    const showEditCatagoryModal = (item) =>{
        setSelectedCat(item);
        seteditModalShow(true);
    };
    
    const submitTagData = (body) => {
        UpsertCatagory(body).then(res => {
            if(res){
                console.log(res)
                setModalShow(false);
                seteditModalShow(false);
                GetCatagoryData();
                
            }
        })
    }
    const deleteModalShow =(id) => {
        setSelectedCat(id);
        setdelmodalshow(true);
        
    }
    const deleteData = async id => {
        // alert(id);
        await DeleteCatagory(id).then(res => {
            console.log(res);
            if(res && res.data){
                setdelmodalshow(false);
        GetCatagoryData();
            }
            else if(res.data === "Catagory not Deleted Succesfully"){
                setModalShow(false);
            }
        });
        
      };
    const GetCatagoryData = () =>{
        GetCatagory().then(res => {
            if (res && res.data) {
                setCatagory(res.data)
                console.log(res.data);
            }
        })
    }
    useEffect(() => {
        GetCatagoryData();
    }, [])
    useEffect(() => {
        const result = cat.filter((catname) => {
            return catname.catname.toLowerCase().match(search.toLowerCase());
        });
        setCatagory(result);
      },[search])
      
      const column =[
        {
            name:"Id",
            selector : (row) => row.catid,
            sortable:true
          },
          {
            name:"Catagory Name",
            selector : (row) => row.catname,
            sortable:true
          },
          
          {
            name:"Product image",
            selector : (row) => <img height={"80px"} width={"80px"} src={"https://service.nilamiadda.com/catimage/" + row.catimage} alt="" />,
            sortable:true
          }
          ,{
            name:"Transdate",
            selector : (row) => <div className='row'>
            <div onClick={() => showEditCatagoryModal(row)}  className="btn btn-primary shadow btn-xs sharp me-1 w-10"><i className="fas fa-pencil-alt"></i></div> || <div onClick={() => deleteModalShow(row.catid)}  className="btn btn-primary shadow btn-xs sharp me-1"><i className="fas fa-trash"></i></div>
            </div>,
          },
      ]

    return (
        <div>

            <div>
                <div className="content-body">
                    <div className="container-fluid">
                        <div className="row page-titles mx-0">
                            <div className="col-sm-6 p-md-0">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="javascript:void(0)">Home</a></li>
                                    <li className="breadcrumb-item active"><a href="javascript:void(0)">Catagory</a></li>
                                </ol>
                            </div>
                            <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
                                {/* <Link className="btn btn-primary mb-2" to="/addBusiness">Add Catagory</Link> */}

                                <Button className='btn btn-primary mb-2' onClick={showAddCatagoryModal}>Add Catagory</Button>
                            </div>
                        </div>



                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h4 className="card-title">Catagory</h4>
                                    </div>
                                    <div className="card-body">
                                    <DataTable columns={column}
                                             data={cat}
                                              pagination
                                              fixedHeader
                                              fixedHeaderScrollHeight='400px'
                                              highlightOnHover
                                              subHeader
                                              subHeaderComponent={
                                                <input type="text" placeholder='Search Here' className='w-25 form-control' value={search} onChange={(e) => setSearch(e.target.value)}/>
                                              }
                                              />
                                       
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
            <MyVerticallyCenteredModalForEdit
                show={editmodalShow}
                bn={selectCat}
                onHide ={() => seteditModalShow(false)}
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

export default Catagory;
function DeleteCatagoryModal(props){
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
          <Modal.Title>Delete Catagory</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <p>Are You sure ? You want to delete</p>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="primary" onClick={delonHide}>Close</Button>
          <Button variant="primary" onClick={deleteDataForm}>Delete Catagory</Button>
        </Modal.Footer>
      </Modal>
    )
}
function MyVerticallyCenteredModal(props){
    const [caterr, setcaterr] = useState('');
    const [catimageerr, setcatimageerr] = useState('');
    
    const {bn,onHide, show, submitTagData} = props;
    const [name, setName] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    let separator = '/'
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    var datenow = `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date}`

    
    useEffect(() =>{
        
        if(show){
            var name = document.getElementById('catname');
            var cimage = document.getElementById('catimage');
            name.value = bn.catname;
            cimage.src = bn.catimage;

           }
    }, [show])
    
    const submitForm =() =>{
        const bidval = sessionStorage.getItem("bid");
        console.log(bidval);
        const formData = new FormData();
        if(name === '' && selectedFile === null){
            setcaterr("Catagory is  required");

            setcatimageerr("Image is required");
        }
        else{
            setcaterr("");
            // var catid = bn.catid != 'undefined' ? bn.catid : 0; 
            setcatimageerr("");
            // formData.append("catid", catid);
            formData.append("catname", name);
            formData.append("catimage", selectedFile);
            formData.append("bid", bidval)
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
          <Modal.Title>{bn && bn.catid ? 'Update' : 'Add'} Catagory</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form encType="multipart/form">
           <div >
            <div className='col-md-12'>
                <Form.Group className="mb-3" >
                    <Form.Label>Catagory Name</Form.Label>
                    <Form.Control name='catname' id='catname'  onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter Name" />
                    <p style={{color:"red"}}>{caterr}</p>
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Catagory Image</Form.Label>
                    <Form.Control id='catimage' onChange={(e) => setSelectedFile(e.target.files[0])}  type="file" />
                    <p style={{color:"red"}}>{catimageerr}</p>
                </Form.Group>

            </div>
            
           </div>
      
      
    </Form>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="primary" onClick={onHide}>Close</Button>
          <Button variant="primary" onClick={submitForm}>{bn && bn.catid ? 'Update' : 'Add'} Catagory</Button>
        </Modal.Footer>
      </Modal>
    )
}
function MyVerticallyCenteredModalForEdit(props){
    const [caterr, setcaterr] = useState('');
    const [catimageerr, setcatimageerr] = useState('');
    
    const {bn,onHide, show, submitTagData} = props;
    const [name, setName] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    let separator = '/'
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    var datenow = `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date}`

    
    useEffect(() =>{
        
        if(show){
            var name = document.getElementById('catname');
            var cimage = document.getElementById('catimage');
            name.value = bn.catname;
            cimage.src = bn.catimage;

           }
    }, [show])
    
    const submitForm =() =>{
        const bidval = sessionStorage.getItem("bid");
        console.log(bidval);
        const formData = new FormData();
        if(name === '' && selectedFile === null){
            setcaterr("Catagory is  required");

            setcatimageerr("Image is required");
        }
        else{
            setcaterr("");
            var catid = bn.catid != 'undefined' ? bn.catid : 0; 
            setcatimageerr("");
            formData.append("catid", catid);
            formData.append("catname", name);
            formData.append("catimage", selectedFile);
            formData.append("bid", bidval)
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
          <Modal.Title>{bn && bn.catid ? 'Update' : 'Add'} Catagory</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form encType="multipart/form">
           <div >
            <div className='col-md-12'>
                <Form.Group className="mb-3" >
                    <Form.Label>Catagory Name</Form.Label>
                    <Form.Control name='catname' id='catname'  onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter Name" />
                    <p style={{color:"red"}}>{caterr}</p>
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Catagory Image</Form.Label>
                    <Form.Control id='catimage' onChange={(e) => setSelectedFile(e.target.files[0])}  type="file" />
                    <p style={{color:"red"}}>{catimageerr}</p>
                </Form.Group>

            </div>
            
           </div>
      
      
    </Form>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="primary" onClick={onHide}>Close</Button>
          <Button variant="primary" onClick={submitForm}>{bn && bn.catid ? 'Update' : 'Add'} Catagory</Button>
        </Modal.Footer>
      </Modal>
    )
}