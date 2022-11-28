import React from 'react'
import { GetContact } from '../api';
import { Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';

function Contact_us() {
    const [contact, setcontact] = useState([]);
    const GetContactData = () => {
        GetContact().then(res => {
            if (res && res.data) {
                setcontact(res.data)
                console.log(res.data);
            }
        })
    }
    useEffect(() => {

        GetContactData();
    }, [])
    return (
        <div>


            <div className="content-body">
                <div className="container-fluid">
                    {/* <div className="row page-titles mx-0">
                                    <div className="col-sm-6 p-md-0">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item"><a href="javascript:void(0)">Home</a></li>
                                            <li className="breadcrumb-item active"><a href="javascript:void(0)">Plan</a></li>
                                        </ol>
                                    </div>
                                    <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
                                        <Button className='btn btn-primary mb-2' onClick={showAddBranchModal}>Add Plan</Button>
            
                                    </div>
                                </div> */}



                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title">Contact Details</h4>
                                </div>
                                <div className="card-body">

                                    <div className="table-responsive">
                                        <Table striped hover responsive="md">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Name</th>
                                                    <th>Phone</th>
                                                    <th>Email</th>
                                                    <th>Message</th>
                                                    <th>Transdate</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    contact !== "No Rows Found" ? contact.map((item) =>
                                                        < tr >
                                                            <td>{item.id}</td>
                                                            <td>{item.name}</td>
                                                            <td>{item.phone}</td>
                                                            <td>{item.email}</td>
                                                            <td>{item.message}</td>
                                                            <td>{item.transdate}</td>



                                                        </tr>
                                                    ) : <div>
                                                        <p>No Contact us Found</p>
                                                    </div>
                                                }

                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Name</th>
                                                    <th>Phone</th>
                                                    <th>Email</th>
                                                    <th>Message</th>
                                                    <th>Transdate</th>

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
    )
}

export default Contact_us