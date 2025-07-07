// JSJobDetails

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
const JSJobDetails =()=>{
    return(
        <>
        <div class ="JSJobDetails-JobPostContainer">
            <div class ="JSJobDetails-JobPostContainer-header">
        <h1>UI UX Designer</h1>
        <div class="SaveOrShare">
            {/* <span><img src="#" alt="Share">Share</img></span>
            <span><img src="#" alt="Saved Job">Saved Job</img></span> */}
        </div>
        <title>Techno Solutions Pvt Ltd</title>
        {/* <img src="#" alt="rating">Rating</img> */}
        <span>Hinjewadi,Pune</span>
        <span>Hybrid/Remote</span>
        <span>3.5Lakhs-6Lakhs</span>
        <span>0-1 year</span>
        <button class="">Apply</button>
        </div>

        <div class="Skilss">
        <span>Figma</span>
        <span>UI</span>
        <span>UX</span> 
        <span>Prototyping</span>
        <span>Wireframing</span>
        <span>User flow</span>
        <span>HTML</span>
        <span>CSS</span>
        <span>Information Architecture</span>
        </div>



{/* Job Summary */}
        <div class="Job Summary">
            <p>
                We are seeking a highly motivated UI/UX Designer to join design team.You'll collaborate with product
                managers, 
            </p>
        </div>

        {/* Key Responsibility */}




        {/* Qualifications And Skills */}




        {/* Perks and Benefits */}




        {/* Company Overview */}



        {/* Contact Details */}



        {/* Apply Button */}



        </div>
        

        </>
    );
};
export default JSJobDetails; 
