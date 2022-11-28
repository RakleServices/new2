
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index'
import { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import Header from './pages/header';
import Login from './pages/login';
import Logout from './pages/Logout';
import ProductTags from './pages/ProductTags';
import ProductImage from './pages/ProductImage';
import NilamiUser from './pages/Nilamiuser';
import Banner from './pages/Banner';
import Branch from './pages/branch';
import Catagory from './pages/catagory';
import Product from './pages/product';
import SubscriptionPlan from './pages/SubscriptionPlan';
import Contact_us from './pages/contact_us';
import Sponsored from './pages/Sponsored';
import Register from './pages/Register';
import Notifications from './pages/Notification';
import SpecialOffer from './pages/SpecialOffer';


function App() {

  const isLogin = sessionStorage.getItem("loggedIn");
  const role = sessionStorage.getItem("role");
  return (
    <>


      <div className=''>


        <BrowserRouter>
          {!isLogin ? <div>
            <Routes><Route path="*" element={<Login />} />
              <Route path="register" exact element={<Register />} />
            </Routes>
          </div> : role != "admin" ?
            <div>
              <Header></Header>
              <Routes>
                <Route path="/login" exact element={<Login />} />


                <Route path="/" exact element={<Product />} />
                <Route path="/producttag" exact element={<ProductTags />} />
                <Route path="/productimage" exact element={<ProductImage />} />
                <Route path="/logout" exact element={<Logout />} />



              </Routes>
            </div>
            : <div>
              <Header></Header>
              <Routes>
                <Route path="/login" exact element={<Login />} />
                <Route path="/banner" exact element={<Banner />} />
                <Route path="/" exact element={<Index />} />
                <Route path="/branch" exact element={<Branch />} />
                <Route path="/catagory" exact element={<Catagory />} />\
                <Route path="/product" exact element={<Product />} />
                <Route path="/producttag" exact element={<ProductTags />} />
                <Route path="/productimage" exact element={<ProductImage />} />
                <Route path="/logout" exact element={<Logout />} />
                <Route path='/nilamiUser' exact element={<NilamiUser />} />
                <Route path='/subscription-plan' exact element={<SubscriptionPlan />} />
                <Route path='/contact-us' exact element={<Contact_us />} />
                <Route path='/sponsored' exact element={<Sponsored />} />
                <Route path='/notification' exact element={<Notifications />} />
                <Route path='/soffer' exact element={<SpecialOffer />} />


              </Routes>
            </div>
          }
        </BrowserRouter>
      </div>

    </>
  );
}

export default App;
