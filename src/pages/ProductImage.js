import React from 'react'
import { Modal, Button, Form, Table, Tab } from 'react-bootstrap';
import { useRef } from 'react';
import { useState, useEffect } from 'react';
import { GetProductImage, UpsertProductImage, DeleteProductImage } from '../api';
import { Last } from 'react-bootstrap/esm/PageItem';
import { useSearchParams } from 'react-router-dom';
import DataTable from 'react-data-table-component';
// import DatatableEx
export default function ProductImage({ product }) {
    const [searchParams] = useSearchParams();
    const [pimage, setPImage] = useState([]);
    const [productid, setproductId] = useState();
    const [simage, setsimage] = useState({});
    const [search, setSearch] = useState('');
    const [filteredProduct, setfileterdProduct] = useState([]);
    const [delmodalshow, setdelmodalshow] = React.useState(false);
    const formRef = useRef();
    const [selectedFile, setSelectedFile] = useState(null);
    const [ImageErr, setImageErr] = useState('');

    const deleteModalShow = (item) => {
        setsimage(item);
        setdelmodalshow(true);
    }
    const deleteData = async id => {
        // alert(id);
        await DeleteProductImage(id).then(res => {
            if(res && res.data){
                setdelmodalshow(false);
                GetProductImage(productid).then(res => {
                    if (res && res.data) {
                        setPImage(res.data)
                        console.log("main product tag data", res.data);
                    }
                })
            }
        });
        
    };

    useEffect(() => {
        //   debugger;
        let productid = searchParams.get('productid')
        setproductId(productid);
        GetProductImage(productid).then(res => {
            if (res && res.data) {
                setPImage(res.data)
                setfileterdProduct(res.data);
                console.log("main product tag data", res.data);
            }
        })

    }, [pimage])

    const submitForm = () => {
        const formData = new FormData();
        if (!selectedFile) {
            setImageErr("Image Not Selected");
        }
        else {
            formData.append("pid", productid);
            formData.append("pimage", selectedFile);
            submitTagData(formData);
        }
    }
    const submitTagData = (body) => {
        UpsertProductImage(body).then(res => {
            if (res) {
                // setModalShow(false);

                alert("Image Added successfully");
                GetProductImage(productid).then(res => {
                    if (res && res.data) {
                        setPImage(res.data)
                        console.log("main product tag data", res.data);
                    }
                })


            }
        })
    }
    //   const column =[
    //     {
    //         name:"Id",
    //         selector : (row) => row.piid,
    //         sortable:true
    //       },
    //       {
    //         name:"Product Id",
    //         selector : (row) => row.pid,
    //         sortable:true
    //       },

    //       {
    //         name:"Product image",
    //         selector : (row) => <img height={80} width={80} src = {"https://service.nilamiadda.com/productimage1/"+ row.pimage}/>,
    //         sortable:true
    //       }
    //       ,{
    //         name:"Transdate",
    //         selector : (row) => <div onClick={() => deleteModalShow(row.piid)}  className="btn btn-primary shadow btn-xs sharp me-1"><i className="fas fa-trash"></i></div>,
    //       },
    //   ]
    return (
        <div>

            <div className="content-body">
                <div className="container-fluid">
                    <div className="row page-titles mx-0">
                        <div className='container'>
                            <Form encType="multipart/form">
                                <div className='row'>
                                    <div className='col-md-8'>
                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label>Product Image</Form.Label>
                                            <Form.Control id='pimage' name='pimage' onChange={(e) => setSelectedFile(e.target.files[0])} type="file" />
                                            <p style={{ color: "red" }}>{ImageErr}</p>
                                        </Form.Group>
                                    </div>

                                    <div className='col-md-4'>
                                        <div className='mt-4 pt-2' >
                                            <Button onClick={submitForm}>Add Product Image</Button>
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
                                    <h4 className="card-title">Product Image</h4>
                                </div>
                                {/* <div className="card-body">
                                            <DataTable columns={column}
                                             data={pimage}
                                              pagination
                                              fixedHeader
                                              fixedHeaderScrollHeight='500px'
                                              highlightOnHover
                                            //   subHeader
                                            //   subHeaderComponent={
                                            //     <input type="text" placeholder='Search Here' className='w-25 form-control' value={search} onChange={(e) => setSearch(e.target.value)}/>
                                            //   }
                                              />
                                                                                    </div> */}
                                <div className="table-responsive">
                                    <Table striped hover responsive="md">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Product Id</th>
                                                <th>Image</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                pimage != "No Rows Found" ? pimage.map((item) => (
                                                    <tr>
                                                        <td>{item.piid}</td>
                                                        <td>{item.pid}</td>
                                                        <td> <img height={80} width={80} src={"https://service.nilamiadda.com/productimage1/" + item.pimage} /></td>
                                                        {/* <td>{item.tagdesc}</td> */}
                                                        <th><div onClick={() => deleteModalShow(item.piid)} className="btn btn-primary shadow btn-xs sharp me-1"><i className="fas fa-trash"></i></div></th>
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
                id={simage}
                delonHide={() => setdelmodalshow(false)}
                deletetagdata={deleteData}
            />
        </div>

    )
}

function DeleteProductModal(props) {
    const { id, delonHide, delshow, deletetagdata } = props;

    useEffect(() => {

        if (delshow) {
            console.log(id)
        }
    }, [delshow])
    const deleteDataForm = () => {

        let catid = id;
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
                <Modal.Title>Delete Product Image</Modal.Title>
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