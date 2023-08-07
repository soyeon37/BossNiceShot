import React, { useState } from 'react'
import AccompanyList from './AccompanyList';
import "./accompany.css";

function Accompany() {


  return (
    <div className='accompany-container'>
      <div className='accompany-head'>
        <h1>Accompany</h1>
        <h2>
          함께 골프치러가용 '-'
        </h2>
        
      <div className='accompany-body'>
        <AccompanyList />
      </div>
      </div>
    </div>
  )
}

export default Accompany