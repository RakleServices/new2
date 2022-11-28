

import React from 'react'
import { json, Link } from 'react-router-dom'
import { Modal,Button, Form, Table } from 'react-bootstrap';

import { useState, useEffect } from 'react';
import { GetNilamiUser, UpdateNilamiUserSts } from '../api';
import { useRef } from 'react';
export default function NilamiUser(){
          const [userData, setUserData] = useState([]);
          const [stsUpdate, setstsUpdate] = useState(false);


          const acceptUserStatus = (item) =>{
                    
                   var sts = item.isactive === "true" ? "false"  : "true";
                   console.log(item.phone, sts);
                    UpdateNilamiUserSts(sts, item.phone)
            .then(res => {
                if (res) {
                    if (res.sts === "success") {
                              setstsUpdate(true);
                              GetNilamiUserData();
                    }
                    else {
                        setstsUpdate(false);
                    }
                }
            })
          }
          const GetNilamiUserData = () =>{
                    GetNilamiUser().then(res => {
                        if (res && res.data) {
                              setUserData(res.data)
                            console.log(res.data);
                        }
                    })
                }
                useEffect(() => {
                    
                    GetNilamiUserData();
                }, [])
          return (
                    <div>


            <div className="content-body">
                <div className="container-fluid">
                <div className="row page-titles mx-0">
                        <div className="col-sm-12 p-md-0">
                            <p>{stsUpdate === true ? "Status Updated Successfully" : ""}</p>
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
                                                    <th>Name</th>
                                                    <th>Phone</th>
                                                    <th>Email</th>
                                                    <th>IsActive</th>
                                                    <th>Amount</th>
                                                    <th>Accept User</th>
                                                    <th>Transdate</th>
                                                    
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    userData.map((item) => 
                                                        < tr >
                                                            <td>{item.name}</td>
                                                            <td>{item.phone}</td>
                                                            <td>{item.email}</td>
                                                            <td>{item.isactive}</td>
                                                            <td>{item.amount}</td>
                                                            <td><div onClick={() => acceptUserStatus(item)}  className="btn btn-primary shadow btn-xs sharp me-1"><i className="fas fa-pencil-alt"></i></div></td>
                                                            <td>{item.transdate}</td>
                                                           
                                                            
                                                            
                                                        </tr>
                                                     )
                                                } 

                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                <th>Name</th>
                                                    <th>Phone</th>
                                                    <th>Email</th>
                                                    <th>IsActive</th>
                                                    <th>Amount</th>
                                                    <th>Accept User</th>
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