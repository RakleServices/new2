import React from 'react'
import { json, Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { GetProduct, UpsertProduct, DeleteProduct, GetCatagory, GetProductTag, UpsertProductTag, GetProductByVendor } from '../api';
import { Modal, Button, Form, Table, Tab } from 'react-bootstrap';
import { useRef } from 'react'
import DataTable from 'react-data-table-component';
function Product() {
    const [prod, setProduct] = useState([]);
    const [modalShow, setModalShow] = React.useState(false);
    const [editmodalShow, seteditModalShow] = React.useState(false);
    const [search, setSearch] = useState('');
    const [selectProd, setSelectedProd] = useState({});
    const [delmodalshow, setdelmodalshow] = React.useState(false);
    const [tagModalShow, settagModalShow] = React.useState(false);
    const navigate = useNavigate();
    const showAddProductModal = () => {

        setModalShow(true);
    };
    const goToProductTag = (e) => {
        // console.log(id, "home");
        navigate(`/producttag/?productid=${e.pid}`);
    };
    const goToProductImage = (e) => {
        // console.log(id, "home");
        navigate(`/productimage/?productid=${e.pid}`);
    };
    const showTagModal = (item) => {
        // alert(item);
        setSelectedProd(item);
        settagModalShow(true);
    }
    const showUpdateProductModal = (item) => {
        setSelectedProd(item);
        setModalShow(true);
    };
    const showEditProductModal = (item) => {
        setSelectedProd(item);
        seteditModalShow(true);
    };

    const submitTagData = (body) => {
        debugger;
        UpsertProduct(body).then(res => {
            if (res) {
                console.log(res)
                setModalShow(false);
                seteditModalShow(false);
                const bid = sessionStorage.getItem("bid");
                sessionStorage.getItem("role") != "admin" ? GetProductDataByVendor(bid) :
                    GetProductData();

            }
        })
    }
    const deleteModalShow = (id) => {
        setSelectedProd(id);
        setdelmodalshow(true);

    }
    const deleteData = async id => {
        // alert(id);
        await DeleteProduct(id).then(res => {
            if(res && res.data){
                setdelmodalshow(false);
                const bid = sessionStorage.getItem("bid");
                sessionStorage.getItem("role") != "admin" ? GetProductDataByVendor(bid) :
                    GetProductData();
            }
        });
        
    };
    const GetProductData = () => {
        GetProduct().then(res => {
            if (res && res.data) {
                setProduct(res.data)
                console.log(res.data);
            }
        })
    }
    const GetProductDataByVendor = (id) => {
        GetProductByVendor(id).then(res => {
            if (res && res.data) {
                res.data != "No Rows Found" ?
                    setProduct(res.data) : setProduct([])
                console.log(res.data);
            }
        })
    }

    useEffect(() => {
        const bid = sessionStorage.getItem("bid");
        sessionStorage.getItem("role") != "admin" ? GetProductDataByVendor(bid) :
            GetProductData();
    }, [])
    useEffect(() => {
        const result = prod.filter((image) => {
            return image.pname.toLowerCase().match(search.toLowerCase());
        });
        setProduct(result);
    }, [search])

    const column = [
        {
            name: "Id",
            selector: (row) => row.pid,
            sortable: true
        },
        {
            name: "Product Name",
            selector: (row) => row.pname,
            sortable: true
        },
        {
            name: "Product Image",
            selector: (row) => <img height={"80px"} width={"80px"} src={"https://service.nilamiadda.com/pdimage/" + row.prodimage} alt="" />,
            sortable: true
        },
        {
            name: "Price",
            selector: (row) => row.pprice,
            sortable: true
        },
        {
            name: "Status",
            selector: (row) => row.status,
            sortable: true
        },
        {
            name: "Cat Name",
            selector: (row) => row.catname,
            sortable: true
        },
        {
            name: "Description",
            selector: (row) => row.pdesc,
            sortable: true
        },
        {
            name: "Transdate",
            selector: (row) => row.transdate,
            sortable: true
        },


        {
            name: "Action",
            selector: (row) => <div className='row'>
                <div onClick={() => showEditProductModal(row)} className="btn btn-primary shadow btn-xs sharp me-1"><i className="fas fa-pencil-alt"></i></div> || <div onClick={() => deleteModalShow(row.pid)} className="btn btn-primary shadow btn-xs sharp me-1"><i className="fas fa-trash"></i></div>
            </div>,
        },
        {
            name: "Product Image",
            selector: (row) => <Button onClick={() => goToProductImage(row)}> Add Image</Button>,
            // sortable:true
        },
        {
            name: "Tag",
            selector: (row) => <Button onClick={() => goToProductTag(row)}>Add Description</Button>,
            // sortable:true
        },
    ]
    return (
        <div>


            <div className="content-body">
                <div className="container-fluid">
                    <div className="row page-titles mx-0">
                        <div className="col-sm-4 p-md-0">
                            {/* <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="javascript:void(0)">Home</a></li>
                                <li className="breadcrumb-item active"><a href="javascript:void(0)">Product</a></li>
                            </ol> */}
                        </div>
                        <div className="col-sm-4 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
                            {/* <Link className="btn btn-primary mb-2" to="/addBusinessDetails">Add business Details</Link> */}
                            <Button className='btn btn-primary btn-block mb-2' onClick={showAddProductModal} >Add Product</Button>

                        </div>
                        <div className="col-sm-4 p-md-0">
                            {/* <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="javascript:void(0)">Home</a></li>
                                <li className="breadcrumb-item active"><a href="javascript:void(0)">Product</a></li>
                            </ol> */}
                        </div>
                    </div>



                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title">Product</h4>
                                </div>
                                <div>
                                    {
                                        sessionStorage.getItem("role") != "admin" ?
                                         <div className='card-body'>
                                           
                                            <div className="col-md-12">
                                            <div className="row">
                                                {
                                                   prod != "No Rows Found" ?  prod.map((item) => (
                                                        <div className="col-md-6">
                                                        <div class="card" >
                                                        <img class="card-img-top" src={"https://service.nilamiadda.com/pdimage/" +item.prodimage} alt="Card image cap"/>
                                                        <div class="card-body">
                                                            <h5 class="card-title">{item.pname}</h5>
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                <p class="card-text">{"Catagory: " + item.catname}</p>
                                                                </div>
                                                                <div className="col-md-6">
                                                                <p class="card-text">{"Views: " + item.counter}</p>
                                                                </div>
                                                            </div>
                                                            <h4 class="card-text">{"Price: ₹ " + item.pprice}</h4>
                                                            <div style={{marginBottom:"10px"}}>
                                                            <button onClick={() => goToProductImage(item)} style={{marginRight:"5px"}}  class="btn btn-primary">More Image</button> <button onClick={() => goToProductTag(item)} style={{marginLeft:"5px"}} href="#" class="btn btn-primary">More Features</button>
                                                            </div>
                                                            <button onClick={() => showUpdateProductModal(item)} style={{marginRight:"5px"}}  class="btn btn-primary">Product Edit</button> <button onClick={() => deleteModalShow(item.pid)} style={{marginLeft:"5px"}} href="#" class="btn btn-primary">Product Delete</button>
                                                        </div>
                                                        </div>
                                                        </div>
                                                    )) : <p>No Any Tags are present</p>
                                                }
                                            </div>
                                            </div>
                                        </div> :
                                        <div className="card-body">
                                            <DataTable columns={column}
                                                data={prod}
                                                pagination
                                                fixedHeader
                                                fixedHeaderScrollHeight='500px'
                                                highlightOnHover
                                                subHeader
                                                subHeaderComponent={
                                                    <input type="text" placeholder='Search Here' className='w-25 form-control' value={search} onChange={(e) => setSearch(e.target.value)} />
                                                }
                                            />
        
                                        </div>
                                    }
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
                bn={selectProd}
                onHide={() => setModalShow(false)}
                submitTagData={submitTagData}

            />
            <MyVerticallyCenteredModalForEdit
                show={editmodalShow}
                bn={selectProd}
                onHide={() => seteditModalShow(false)}
                submitTagData={submitTagData}

            />
            <DeleteProductModal
                delshow={delmodalshow}
                id={selectProd}
                delonHide={() => setdelmodalshow(false)}
                deletetagdata={deleteData}
            />

        </div>
    )
}
export default Product;
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
                <Modal.Title>Delete Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are You sure ? You want to delete</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={delonHide}>Close</Button>
                <Button variant="primary" onClick={deleteDataForm}>Delete Product</Button>
            </Modal.Footer>
        </Modal>
    )
}
function MyVerticallyCenteredModal(props) {

    const { bn, onHide, show, submitTagData } = props;
    let [catval, setCatVal] = useState("⬇️ Select Catagory ⬇️")
    // let [productid, setProductid] = useState('')
    let [cat, setCat] = useState([]);
    const [catError, setcatError] = useState('');
    let separator = '/'
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    var datenow = `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date}`

    const GetCatagoryData = () => {
        GetCatagory().then(res => {
            if (res && res.data) {
                setCat(res.data)
                console.log("catagory", res.data);
            }
        })
    }

    useEffect(() => {
        GetCatagoryData();
        if (show) {

            var nameval = document.getElementById('pname');
            var ppriceval = document.getElementById('pprice');
            var pdescval = document.getElementById('pdesc');

            nameval.value = bn.pname;
            ppriceval.value = bn.pprice;
            pdescval.value = bn.pdesc;
            // setProductid(bn.bid)
        }
    }, [show])


    let handleCatChange = (e) => {

        if (catval !== "⬇️ Select Catagory ⬇️") {
            setcatError("Select  catagory")
        }
        else {
            setCatVal(e.target.value)

            console.log(catval);
        }
    }
    var bnlength = Object.keys(bn).length;
    const [fsubmit, fissubmit] = useState(false);
    const [prodimagerr, setprodimageerr] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);


    const [pname, setPName] = useState("");
    const [price, setPrice] = useState("");
    const [pdesc, setDesc] = useState("");
    const [ndate, setndate] = useState("");

    const submitForm = () => {

        debugger;
        var nilamidate = catval === "33" ? ndate : "None";
        const bbid = sessionStorage.getItem("bid");
        const formData = new FormData();
        // formData.append("pid", bn.pid);
        formData.append("pname", pname);
        formData.append("pprice", price);
        formData.append("status", 'active');
        formData.append("catid", catval);
        formData.append("pdesc", pdesc);
        formData.append("transdate", datenow);
        formData.append("nilamidate", nilamidate);
        formData.append("prodimage", selectedFile);
        formData.append("bid", bbid);


        // console.log("Body:", formData);
        submitTagData(formData);

        // SubmitloginForm(formValues);

    }



    return (
        <Modal
            show={props.show}
            size="md"
            centered
            aria-labelledby="contained-modal-title-vcenter"
        >
            <Modal.Header >
                <Modal.Title>{bn && bn.pid ? 'Update' : 'Add'} Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form encType="multipart/form">
                    <div >
                        <div className='col-md-12'>
                            {/* {fruit} */}
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Catagory Name</Form.Label>
                                {/* <Form.Control name='catname' id='catname'   type="text" placeholder="Enter Name" /> */}
                                <Form.Select onChange={handleCatChange}>
                                    <option > -- Select Catagory -- </option>

                                    {cat.map((catval) => <option value={catval.catid}>{catval.catname}</option>)}
                                </Form.Select>
                                <p style={{ color: "red" }}>{catError}</p>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control name='pname' id='pname' type="text" onChange={(e) => setPName(e.target.value)} placeholder="Enter Name" />
                                {/* <p style={{color:"red"}}>{formErrors.pname}</p> */}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Price</Form.Label>
                                <Form.Control name='pprice' id='pprice' onChange={(e) => setPrice(e.target.value)} type="text" placeholder="Enter Price" />
                                {/* <p style={{color:"red"}}>{formErrors.pprice}</p> */}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Description</Form.Label>
                                <Form.Control name='pdesc' id='pdesc' type="text" onChange={(e) => setDesc(e.target.value)} placeholder="Enter Description" />
                                {/* <p style={{color:"red"}}>{formErrors.pdesc}</p> */}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Product Image</Form.Label>
                                <Form.Control name='prodimage' id onChange={(e) => setSelectedFile(e.target.files[0])} type="file" />
                                {/* <p style={{color:"red"}}>{prodimagerr}</p> */}
                            </Form.Group>



                            {
                                catval === "33" ? <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Nilami Date</Form.Label>
                                    <Form.Control name='nilamidate' onChange={(e) => setndate(e.target.value)} type="datetime-local" placeholder="Select Date and Time" />
                                </Form.Group> : <div></div>
                            }


                        </div>

                    </div>


                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={onHide}>Close</Button>
                <Button variant="primary" onClick={submitForm}>{bn && bn.pid ? 'Update' : 'Add'} Product</Button>
            </Modal.Footer>
        </Modal>
    )
}

function MyVerticallyCenteredModalForEdit(props) {

    const { bn, onHide, show, submitTagData } = props;
    let [catval, setCatVal] = useState("⬇️ Select Catagory ⬇️")
    // let [productid, setProductid] = useState('')
    let [cat, setCat] = useState([]);
    const [catError, setcatError] = useState('');
    let separator = '/'
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    var datenow = `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date}`

    const GetCatagoryData = () => {
        GetCatagory().then(res => {
            if (res && res.data) {
                setCat(res.data)
                console.log("catagory", res.data);
            }
        })
    }

    useEffect(() => {
        GetCatagoryData();
        if (show) {

            var nameval = document.getElementById('pname');
            var ppriceval = document.getElementById('pprice');
            var pdescval = document.getElementById('pdesc');

            nameval.value = bn.pname;
            ppriceval.value = bn.pprice;
            pdescval.value = bn.pdesc;
            // setProductid(bn.bid)
        }
    }, [show])


    let handleCatChange = (e) => {

        if (catval !== "⬇️ Select Catagory ⬇️") {
            setcatError("Select  catagory")
        }
        else {
            setCatVal(e.target.value)

            console.log(catval);
        }
    }
    var bnlength = Object.keys(bn).length;
    const [fsubmit, fissubmit] = useState(false);
    const [prodimagerr, setprodimageerr] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);


    const [pname, setPName] = useState("");
    const [price, setPrice] = useState("");
    const [pdesc, setDesc] = useState("");
    const [ndate, setndate] = useState("");

    const submitForm = () => {

        debugger;
        var nilamidate = catval === "33" ? ndate : "None";
        const bbid = sessionStorage.getItem("bid");
        const formData = new FormData();
        formData.append("pid", bn.pid);
        formData.append("pname", pname);
        formData.append("pprice", price);
        formData.append("status", 'active');
        formData.append("catid", catval);
        formData.append("pdesc", pdesc);
        formData.append("transdate", datenow);
        formData.append("nilamidate", nilamidate);
        formData.append("prodimage", selectedFile);
        formData.append("bid", bbid);


        // console.log("Body:", formData);
        submitTagData(formData);

        // SubmitloginForm(formValues);

    }



    return (
        <Modal
            show={props.show}
            size="md"
            centered
            aria-labelledby="contained-modal-title-vcenter"
        >
            <Modal.Header >
                <Modal.Title>{bn && bn.pid ? 'Update' : 'Add'} Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form encType="multipart/form">
                    <div >
                        <div className='col-md-12'>
                            {/* {fruit} */}
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Catagory Name</Form.Label>
                                {/* <Form.Control name='catname' id='catname'   type="text" placeholder="Enter Name" /> */}
                                <Form.Select onChange={handleCatChange}>
                                    <option > -- Select Catagory -- </option>

                                    {cat.map((catval) => <option value={catval.catid}>{catval.catname}</option>)}
                                </Form.Select>
                                <p style={{ color: "red" }}>{catError}</p>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control name='pname' id='pname' type="text" onChange={(e) => setPName(e.target.value)} placeholder="Enter Name" />
                                {/* <p style={{color:"red"}}>{formErrors.pname}</p> */}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Price</Form.Label>
                                <Form.Control name='pprice' id='pprice' onChange={(e) => setPrice(e.target.value)} type="text" placeholder="Enter Price" />
                                {/* <p style={{color:"red"}}>{formErrors.pprice}</p> */}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Description</Form.Label>
                                <Form.Control name='pdesc' id='pdesc' type="text" onChange={(e) => setDesc(e.target.value)} placeholder="Enter Description" />
                                {/* <p style={{color:"red"}}>{formErrors.pdesc}</p> */}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Product Image</Form.Label>
                                <Form.Control name='prodimage' id onChange={(e) => setSelectedFile(e.target.files[0])} type="file" />
                                {/* <p style={{color:"red"}}>{prodimagerr}</p> */}
                            </Form.Group>



                            {
                                catval === "33" ? <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Nilami Date</Form.Label>
                                    <Form.Control name='nilamidate' onChange={(e) => setndate(e.target.value)} type="datetime-local" placeholder="Select Date and Time" />
                                </Form.Group> : <div></div>
                            }


                        </div>

                    </div>


                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={onHide}>Close</Button>
                <Button variant="primary" onClick={submitForm}>{bn && bn.pid ? 'Update' : 'Add'} Product</Button>
            </Modal.Footer>
        </Modal>
    )
}
