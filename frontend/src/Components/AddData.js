import React from 'react';
import {useState} from 'react';
import './AddData.css';
function AddData(props) {
  
    const [business_code, setbusiness_code] = useState('');
    const [customer_number, setcustomer_number] = useState('');
    const [clear_date, setclear_date] = useState('');
    const [business_year, setbusiness_year] = useState('');
    const [doc_id, setdoc_id] = useState('');
    const [posting_date, setposting_date] = useState('');
    const [document_create_date, setdocument_create_date] = useState('');
    const [dueDate, setdueDate] = useState('');
    const [invoice_currency, setinvoice_currency] = useState('');
    const [document_type, setdocument_type] = useState('');
    const [posting_id, setposting_id] = useState('');
    const [total_open_amount, settotal_open_amount] = useState('');
    const [baseline_create_date, setbaseline_create_date] = useState('');
    const [cust_payment_terms, setcust_payment_terms] = useState('');
    const [invoice_id, setinvoice_id] = useState('');


    function saveData(){
        if(business_code!=="" && customer_number!=="" &&
        clear_date!=="" && business_year&&doc_id&&posting_date!=="" &&document_create_date!=="" && dueDate!=="" && 
            invoice_currency!=="" && document_type!=="" && posting_id!=="" && total_open_amount!=="" && baseline_create_date!=="" && cust_payment_terms!=="" && invoice_id!==""){
        fetch("http://localhost:8080/Highradius_training/SaveData",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({business_code,customer_number,clear_date,business_year,doc_id,posting_date,document_create_date,dueDate,
            invoice_currency,document_type,posting_id,total_open_amount,baseline_create_date,cust_payment_terms,invoice_id})
        }).then(()=>{
            window.alert("Saved sucessfully");
            console.log("Saved sucessfully")
        }).catch(()=>{
            console.log("Something went wrong");
            window.alert("Something went wrong");
        })
        props.closeAddButton()
    }
    }


  return (
    <div className='AddData'>
      <h3 style={{color:"white",marginTop:"2%"}}>Add</h3>
      <div className='AddDataBox'>
      <div className='addDataField'><input type="text" className='form_input' placeholder=""  onChange={(event)=>setbusiness_code(event.target.value)}/><label class="form_label">Business Code</label>
    </div>
        <div className='addDataField'><input type="text" className='form_input' placeholder="" onChange={(event)=>setcustomer_number(event.target.value)}/><label class="form_label">Customer Number</label>
    </div>
        <div className='addDataField'><input type="date" className='form_input' placeholder="" id='clear_date'  onChange={(event)=>setclear_date(event.target.value)}/><label class="form_label dateField">Clear Date</label>
    </div>
        <div className='addDataField'><input type="text" className='form_input' placeholder=""  onChange={(event)=>setbusiness_year(event.target.value)}/><label class="form_label">Business Year</label>
    </div>
        <div className='addDataField'><input type="text" className='form_input' placeholder=""  onChange={(event)=>setdoc_id(event.target.value)}/><label class="form_label">Document Id</label>
    </div>
        <div className='addDataField'><input type="date" className='form_input' placeholder=""  onChange={(event)=>setposting_date(event.target.value)}/><label class="form_label dateField">Posting Date</label>
    </div>
        <div className='addDataField'><input type="date" className='form_input' placeholder="" onChange={(event)=>setdocument_create_date(event.target.value)}/><label class="form_label dateField">Document Create Date</label>
    </div>
        <div className='addDataField'><input type="date" className='form_input' placeholder=""  onChange={(event)=>setdueDate(event.target.value)}/><label class="form_label dateField">Due Date</label>
    </div>
        <div className='addDataField'><input type="text" className='form_input' placeholder=""  onChange={(event)=>setinvoice_currency(event.target.value)}/><label class="form_label">Invoice Currency</label>
    </div>
        <div className='addDataField'><input type="text" className='form_input' placeholder=""  onChange={(event)=>setdocument_type(event.target.value)}/><label class="form_label">Document Type</label>
    </div>
        <div className='addDataField'><input type="text" className='form_input' placeholder=""  onChange={(event)=>setposting_id(event.target.value)}/><label class="form_label">Posting Id</label>
    </div>
        <div className='addDataField'><input type="text" className='form_input' placeholder=""  onChange={(event)=>settotal_open_amount(event.target.value)}/><label class="form_label">Total Open Amount</label>
    </div>
        <div className='addDataField'><input type="date" className='form_input' placeholder=""  onChange={(event)=>setbaseline_create_date(event.target.value)}/><label class="form_label dateField">Baseline Create Date</label>
    </div>
        <div className='addDataField'><input type="text" className='form_input' placeholder=""  onChange={(event)=>setcust_payment_terms(event.target.value)}/><label class="form_label">Customer Payment Terms</label>
    </div>
        <div className='addDataField'><input type="text" className='form_input' placeholder=""  onChange={(event)=>setinvoice_id(event.target.value)}/><label class="form_label">Invoice ID</label>
    </div>
        </div>
        <div className="button">
        <input type="submit" onClick={saveData} value="Add"/>
        <input type="button " onClick={props.closeAddButton} value="Cancel"/>
        </div>
    </div>
    
    
  )
}

export default AddData