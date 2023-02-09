import React from 'react';
import { BrowserRouter, Switch, Route, Routes, redirect } from 'react-router-dom';
import Login from '../components/user/Login.jsx';
import Register from '../components/user/Register.jsx';
import DashboardProductsOffered from '../components/product/DashboardProductsOffered.jsx';
import { useEffect, useState } from 'react';

function PublicRouters({ user }) {
    const [location, setLocation] = useState(window.location.href);
    //imprimo el valor de useLocalStorage
    console.log("useLocalStorage el user", user);
    useEffect(() => {
        if (user && location === 'http://localhost:3000/' ) {
            window.location.href = '/dashboard-products';
        }
    }, [])

    return (
        <>
            <Routes>
                <Route exact path="/" element={<Login />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/dashboard-products" element={<DashboardProductsOffered />} />
                {/* <Route component={NotFound} />  */}
            </Routes>
        </>
    );
};
export default PublicRouters;

