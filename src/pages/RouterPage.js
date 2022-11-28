import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Index from './Index'
import Portfolio from './portfolio'
import MarketingExecutive from './marketing_exe'
import Business from './business'
import BusinesDetail from './business_detail'
import OwnerDetails from './owner_detail'
import AddImage from './add_image'
import Login from './login'

function RouterPage() {
  return (
    <>
      <Router>
        <Switch>
          
          <Route path="/" exact element={<Index />} />
          {/* <Route path='/portfolio' element={Portfolio} />
          <Route path='/mar_exe' element={MarketingExecutive} />
          <Route path='/business' element={Business} />
          <Route path='/business_details' element={BusinesDetail} />
          <Route path='/owner_details' element={OwnerDetails} />
          <Route path='/add_images' element={AddImage} /> */}

        </Switch>
      </Router>
    </>
  )
}
export default RouterPage;