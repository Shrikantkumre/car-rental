import React, { useState, useEffect } from 'react';
import Footer from "../components/Footer";
import '../styles/style.css';
import { useNavigate } from "react-router-dom";
import DataFiltering from '../components/DataFiltering';

function Admin() {
    let navigate = useNavigate();

    useEffect(() => {
        // Check if user is logged in
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        if (!isLoggedIn) {
          navigate('/');
        }
      });

  return (
    <>
      <section className="admin-page">
       <div>Manage All of your Admin tasks here</div>
       <DataFiltering/>
      </section>
     
      <Footer />
    </>
  );
}

export default Admin;
