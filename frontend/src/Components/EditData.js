import React, { useState } from 'react';
import './EditData.css';
function EditData(props) {
    const [invoiceCurrency, setInvoiceCurrency] = useState('')
    const [custPaymentTerms, setCustPaymentTerms] = useState()
    const row_value = props.row_value;
    function EditData(){
        
        fetch("http://localhost:8080/Highradius_training/EditData",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({invoiceCurrency,custPaymentTerms,row_value})
        }).then((res)=>{
            console.log("Updated sucessfully");
            window.alert("Edited sucessfully");
            
        }).catch(()=>{
            console.log("Something went wrong");
            window.alert("Something went wrong");
        })
        props.editRow('');
        props.closeEditButton()
    }
  return (
      <div className="EditData">
          <h3 style={{color:"white",marginTop:"2%"}}>Edit</h3>
          <div className='EditDataBox'>
        <div class="editDataField">
        <input type="text" class="form_input" onChange={event=>setInvoiceCurrency(event.target.value)}/>
        <label class="form_label">Invoice Currency</label>
    </div>
    <div class="editDataField">
        <input type="text" class="form_input" onChange={event=>setCustPaymentTerms(event.target.value)}/>
        <label class="form_label">Cust Payment Terms</label>
    </div>
    </div>
    <div className="button">
        <input type="Button" onClick={EditData} value="Edit"/>
        <input type="button" onClick={props.closeEditButton} value="Cancel"/>
        </div>
        </div>
    
  )
}

export default EditData