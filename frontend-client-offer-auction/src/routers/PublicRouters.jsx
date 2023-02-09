import React, {useState, useEffect} from 'react';
import { BrowserRouter, Switch, Route, Routes } from 'react-router-dom';
import Login from '../components/user/Login.jsx';
import Register from '../components/user/Register.jsx';
import DashboardAuctionProducts from '../components/auction/DashboardAuctionProducts.jsx';
import Navbar from '../components/Navbar.jsx';
import DashboardAuction from '../components/auction/DashboardAuction.jsx';
import DashboardAuctionClosed from '../components/auction/DashboardAuctionClosed.jsx';

function PublicRouters({user}) {
    const [location, setLocation] = useState(window.location.href);
    useEffect(() => {
        if (user && (location === 'http://localhost:3000/' || location === 'http://localhost:3001/')) {
            window.location.href = '/dashboard-auction';
        }
    }, [])

    return (
        <>
        {console.log("ver", user)}
            <Navbar user={user} />
            <Routes>
                {user && <Route path="*" element={<Login/>} />}
                <Route exact path="/" element={<Login />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/dashboard-products" element={<DashboardAuctionProducts />} />
                <Route exact path="/dashboard-auction" element={<DashboardAuction />} />
                <Route exact path="/dashboard-auction-closed" element={<DashboardAuctionClosed />} />
                {/* <Route component={NotFound} />  */}
            </Routes>
        </>
    );
};
export default PublicRouters;

