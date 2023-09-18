import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Gallery from '../gallery/gallery';
import Signin from "../signIn/signin";
const RouteSwitch = () => {
    return (
        <BrowserRouter >
            <Routes>
                <Route path="/" index element={<Gallery />} />
                <Route element={<Signin />} path="/signin" />
                <Route element={<div>error here</div>} path="*" />
            </Routes>
        </BrowserRouter>
    );
};
export default RouteSwitch; 