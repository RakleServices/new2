import React from 'react'
import { Link } from "react-router-dom"
class Header extends React.Component {
    render() {
        return (
            <div>
                <div id="preloader">
                    <div className="sk-three-bounce">
                        <div className="sk-child sk-bounce1"></div>
                        <div className="sk-child sk-bounce2"></div>
                        <div className="sk-child sk-bounce3"></div>
                    </div>
                </div>

                <div id="main-wrapper">

                    <div className="nav-header">
                        <a href='/' className="brand-logo">
                            <img src="assets/NA.png" className="logo-abbr" alt="Image" />
                            <img className="brand-title" src="assets/logo2.png" alt="Image" />
                        </a>

                        <div className="nav-control">
                            <div className="hamburger">
                                <span className="line"></span><span className="line"></span><span className="line"></span>
                            </div>
                        </div>
                    </div>

                    <div className="header">
                        <div className="header-content">
                            <nav className="navbar navbar-expand">
                                <div className="collapse navbar-collapse justify-content-between">
                                    <div className="header-left">
                                        <div className="dashboard_bar">
                                            Dashboard
                                        </div>
                                    </div>

                                    <ul className="navbar-nav header-right">
                                        <li className="nav-item">
                                            <div className="input-group search-area d-xl-inline-flex d-none">
                                                <div className="input-group-append">
                                                    <button className="input-group-text"><i className="flaticon-381-search-2"></i></button>
                                                </div>
                                                <input type="text" className="form-control" placeholder="Search here..." />
                                            </div>
                                        </li>


                                        <li className="nav-item dropdown header-profile">
                                            <a className="nav-link" href="#" role="button" data-bs-toggle="dropdown">
                                                <img src="assets/NA.png" width="20" alt="image" />
                                                <div className="header-info">
                                                    <span>{sessionStorage.getItem("name") != null ? sessionStorage.getItem("name") : ""}</span>
                                                    <small>{sessionStorage.getItem("role") != null ? sessionStorage.getItem("role") : ""}</small>
                                                </div>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-end">
                                                <a href="./app-profile.html" className="dropdown-item ai-icon">
                                                    <svg id="icon-user1" xmlns="http://www.w3.org/2000/svg" className="text-primary"
                                                        width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                                        <circle cx="12" cy="7" r="4"></circle>
                                                    </svg>
                                                    <span className="ms-2">Profile </span>
                                                </a>

                                                <Link to='/logout' className="dropdown-item ai-icon">
                                                    <svg id="icon-logout" xmlns="http://www.w3.org/2000/svg" className="text-danger"
                                                        width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                                        <polyline points="16 17 21 12 16 7"></polyline>
                                                        <line x1="21" y1="12" x2="9" y2="12"></line>
                                                    </svg>
                                                    <span className="ms-2">Logout </span>
                                                </Link>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                        </div>
                    </div>

                    <div className="deznav">
                        <div className="deznav-scroll">
                            <ul className="metismenu" id="menu">
                                <li>
                                    <a className="has-arrow ai-icon" href="javascript:void()"  >
                                        <i className="flaticon-381-networking"></i>
                                        <span className="nav-text">Dashboard</span>
                                    </a>
                                    <ul  >
                                        <li><Link to="/">Dashboard</Link></li>
                                    </ul>

                                </li>
                                {
                                    sessionStorage.getItem("role") != "admin" ? <li></li> :
                                        <li>
                                            <a className="has-arrow ai-icon" href="javascript:void()"  >
                                                <i className="flaticon-381-television"></i>
                                                <span className="nav-text">Admin</span>
                                            </a>
                                            <ul  >
                                                <li><Link to="/branch">Branch</Link></li>
                                                <li><Link to="/banner">Banner</Link></li>
                                                <li><Link to="/contact-us">Contact Us</Link></li>
                                                <li><Link to="/sponsored">Sponsored</Link></li>
                                                <li><Link to="/notification">Notification</Link></li>
                                                <li><Link to="/soffer">Special Offer</Link></li>
                                            </ul>
                                        </li>
                                }
                                {
                                    sessionStorage.getItem("role") != "admin" ? <li></li> :
                                        <li>
                                            <a className="has-arrow ai-icon" href="javascript:void()"  >
                                                <i className="flaticon-381-internet"></i>
                                                <span className="nav-text">Main Module</span>
                                            </a>
                                            <ul  >
                                                {
                                                    sessionStorage.getItem("role") != "admin" ? <li></li> : <li><Link to="/catagory">Catagory</Link></li>
                                                }
                                                <li><Link to="/product">Product</Link></li>

                                            </ul>
                                        </li>
                                }
                                {
                                    sessionStorage.getItem("role") != "admin" ? <li></li> :

                                        <li>
                                            <a className="has-arrow ai-icon" href="javascript:void()"  >
                                                <i className="flaticon-381-internet"></i>
                                                <span className="nav-text">Nilami Module</span>
                                            </a>
                                            <ul  >
                                                <li><Link to="/nilamiUser">Nilami User</Link></li>
                                                <li><Link to="/subscription-plan">Subscription Plan</Link></li>

                                            </ul>
                                        </li>
                                }

                            </ul>
                        </div>

                    </div>
                </div>
            </div>

        );
    }
}

export default Header;