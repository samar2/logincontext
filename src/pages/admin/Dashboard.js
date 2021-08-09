import React from 'react';
import Navbar from '../../components/admin/layout/sidebar/Navbar';
import { Redirect } from "react-router";
import Login from './Login'

function Dashboard (props){

    // const token = props.location.state.token
    // const storageToken = window.localStorage.getItem("adminToken");
    // if(token!==storageToken){
    //   <Redirect to="admin/login"/>
    // }
 
    return (
        <>
        <Navbar 
        // token={token}
        />
        <div className="dashboard">
        <h1>Dashboard</h1>
        </div>
        </>
    )
   
}

export default Dashboard;