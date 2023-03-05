import React, { useEffect } from 'react';
import '../css/features.css';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import {useState} from 'react';

function Features(props) {
  function getPrediction(){
    if(props.predictSlNo.length===1){

    fetch("http://localhost:8080/Highradius_training/GetPredictData",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({"data":props.predictSlNo[0]})
    }).then((res)=>res.json().then((data)=>{
        fetch("http://127.0.0.1:5000/",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({"business_code":data.business_code,"cust_number":data.cust_number,"name_customer":"hem","clear_date":data.clear_date,"buisness_year":data.buisness_year.slice(0,4),"doc_id":data.doc_id,"due_in_date":data.due_in_date,"posting_date":data.posting_date,"baseline_create_date":data.baseline_create_date,"cust_payment_terms":data.cust_payment_terms,"converted_usd":data.total_open_amount})
    }).then((res)=>res.json().then((data)=>{
      props.setPredicted(data);
    })).catch((err)=>{
      console.log("ERROR")
    })
    })).catch((err)=>{
      console.log(err);
    })

    
    
    }
  }
  

  
  return (
    <div id="features">
      <div id="tech_button">
        <input
          style={{borderTopLeftRadius:" 5px",borderBottomLeftRadius: "5px"}}
          className="button"
          type="button"
          value="Predict"
          onClick={getPrediction}
        /><input className="button" type="button" value="Analytics View" /><input
        style={{borderTopRightRadius: "5px",borderBottomRightRadius: "5px"}}
          className="button"
          type="button"
          value="Advance Search"
          onClick={props.setAdvanceTrigger}
        />

        <button className='button' style={{width:"7%",marginLeft:"2%"}} onClick={props.refreshTable}><RefreshRoundedIcon/></button>
      </div>
      <input id="search" type="text" placeholder="Search Customer Id" onChange={event=>props.getSearchCustomerId(event.target.value)}/>
      <div id="extra_button">
        <button
          className="button"
          style={{borderTopLeftRadius:" 5px", borderBottomLeftRadius: "5px"}}
          onClick={props.addButton}
        >
          ADD</button
        ><button className="button" onClick={props.editButton}>Edit</button
        ><button
          className="button"
          style={{borderTopRightRadius: "5px", borderBottomRightRadius: "5px"}}
          onClick={props.deleteButton}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default Features