import React from 'react';
import { useState, useEffect } from 'react';
import { NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { GetProduct, GetCatagory, GetNilamiUser, GetPlan } from '../api';

function Index() {
    const [plan, setPlan] = useState([]);
    const [cat, setcat] = useState([]);
    const [prod, setprod] = useState([]);
    const [user, setNilmaiUser] = useState([]);
    const GetPlanData = () => {
        GetPlan().then(res => {
            if (res && res.data) {
                setPlan(res.data)
                console.log(res.data);
            }
        })
    }
    const GetCatagoryData = () => {
        GetCatagory().then(res => {
            if (res && res.data) {
                setcat(res.data)
                console.log(res.data);
            }
        })
    }
    const GetNilamiUserData = () => {
        GetNilamiUser().then(res => {
            if (res && res.data) {
                if(res.data === "No Rows Found"){
                    setNilmaiUser([])
                    console.log();
                }
                else {
                    setNilmaiUser(res.data)
                    console.log(res.data);
                }
            }
            
        })
    }
    const GetProductData = () => {
        GetProduct().then(res => {
            if (res && res.data) {
                setprod(res.data)
                console.log(res.data);
            }
        })
    }
    useEffect(() => {

        GetCatagoryData();
        GetProductData();
        GetNilamiUserData();
        GetPlanData();
    }, [])


    return (
        <div>




            <div className="content-body">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-3 col-sm-6">
                            <div className="card overflow-hidden">
                                <div className="card-header align-items-start border-0 pb-0">
                                    <div className="me-auto">
                                        <p className="mb-2 fs-13"><i className="fa fa-caret-up scale5 me-2 text-success"
                                            aria-hidden="true"></i>Catagory</p>
                                        <h2 className="text-black mb-0 font-w600">{cat.length}</h2>
                                    </div>

                                </div>

                            </div>
                        </div>
                        <div className="col-xl-3 col-sm-6">
                            <div className="card overflow-hidden">
                                <div className="card-header align-items-start border-0 pb-0">
                                    <div className="me-auto">
                                        <p className="mb-2 fs-13"><i className="fa fa-caret-up scale5 me-2 text-success"
                                            aria-hidden="true"></i>Product</p>
                                        <h2 className="text-black mb-0 font-w600">{prod.length}</h2>
                                    </div>

                                </div>

                            </div>
                        </div>
                        <div className="col-xl-3 col-sm-6">
                            <div className="card overflow-hidden">
                                <div className="card-header align-items-start border-0 pb-0">
                                    <div className="me-auto">
                                        <p className="mb-2 fs-13"><i className="fa fa-caret-up scale5 me-2 text-success"
                                            aria-hidden="true"></i>Nilami User</p>
                                        <h2 className="text-black mb-0 font-w600">{user.length}</h2>
                                    </div>

                                </div>

                            </div>
                        </div>
                        <div className="col-xl-3 col-sm-6">
                            <div className="card overflow-hidden">
                                <div className="card-header align-items-start border-0 pb-0">
                                    <div className="me-auto">
                                        <p className="mb-2 fs-13"><i className="fa fa-caret-up scale5 me-2 text-success"
                                            aria-hidden="true"></i>Plan</p>
                                        <h2 className="text-black mb-0 font-w600">{plan.length}</h2>
                                    </div>

                                </div>

                            </div>
                        </div>



                        {
                            sessionStorage.getItem("role") != "admin" ? <li></li> : <div className="col-xl-6 col-xxl-12">
                                <div className="row">
                                    <div className="col-xl-12">
                                        <div className="card">

                                            <div className="card-body">
                                                <div className="d-flex mb-3 justify-content-between align-items-center">
                                                    <h4 className="text-black fs-20 mb-0">Registered Product</h4>
                                                    <Link to="/product" className="btn-link">View more</Link>
                                                </div>
                                                <div className="testimonial-one px-4 owl-right-nav owl-carousel owl-loaded owl-drag">
                                                    {
                                                        prod.map((item) => (
                                                            <div className="items">
                                                                <div className="text-center">
                                                                    <img className="mb-3 rounded" height={"80px"} width={"80px"} src={"https://service.nilamiadda.com/pdimage/" + item.prodimage} alt="image" />
                                                                    <h5 className="text-black mb-0">{item.pname}</h5>
                                                                    <span className="fs-12">{item.catname}</span>
                                                                </div>
                                                            </div>
                                                        ))
                                                    }

                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }

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

    );
}


export default Index;