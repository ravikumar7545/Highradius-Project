import React from 'react';
import './AdvanceSearch.css';

function AdvanceSearch(props) {
    function advanceSearch(){
        fetch("http://localhost:8080/Highradius_training/AdvanceSearch",{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({"doc_id":"1930438491","invoice_id":"1930438491","cust_number":"200769623","buisness_year":"2020"})
          }).then((res)=>res.json().then((data)=>{
            props.getAdvanceSearchData(data.key);
          })).catch(()=>{
            console.log("Error");
          })
        }
  return (
      <div className="AdvanceSearch">
          <h3 style={{color:"white",marginTop:"2%"}}>Advance Search</h3>
          <div className='AdvanceSearchBox'>
            <div class="AdvanceSearchField">
                <input type="text" class="form_input"/>
                <label class="form_label">Document Id</label>
            </div>
            <div class="AdvanceSearchField">
                <input type="text" class="form_input"/>
                <label class="form_label">Invoice Id</label>
            </div>
            <div class="AdvanceSearchField">
                <input type="text" class="form_input"/>
                <label class="form_label">Customer Number</label>
            </div>
            <div class="AdvanceSearchField">
                <input type="text" class="form_input"/>
                <label class="form_label">Business Year</label>
            </div>
            </div>
        <div className="button">
            <input type="Button" onClick={advanceSearch} value="Search"/>
            <input type="button" onClick={props.closeAdvanceSearch} value="Cancel"/>
        </div>
    </div>
    
  )
}

export default AdvanceSearch;