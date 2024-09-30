import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Home from './Pages/Home';
import UserAuth from './Pages/UserPage/UserAuth'; 
import ProtectedRoute from './ProtectedRouter/ProtectedRouter';
import SellerDashboard from './Pages/SellerPage/SellerDashboard';
import UserDashboard from './Pages/UserPage/UserDashboard';
import ProductListing from "./Pages/UserPage/UserProducts"
import ProductAddingForm from './Pages/SellerPage/Seller-AddProduct';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/login" element={<UserAuth form="login" />} />
          <Route path="/signup" element={<UserAuth form="signup" />} />
          <Route path="/userDashboard" element={<ProtectedRoute allowedRoles={["user"]}><UserDashboard/></ProtectedRoute>} />
          <Route path="/products" element={<ProductListing/>} />
          {/* <Route path="/products" element={<ProtectedRoute allowedRoles={["user"]}><ProductListing/></ProtectedRoute>} /> */}
          <Route path='/sellerDashboard' element={<ProtectedRoute allowedRoles={["seller"]}><SellerDashboard/></ProtectedRoute>}/>
          <Route path='/seller-addProduct' element={<ProtectedRoute allowedRoles={["seller"]}><ProductAddingForm/></ProtectedRoute>}/>
        </Route>
      </Routes>
      <ToastContainer/>
    </Router>
  );
}

export default App;
