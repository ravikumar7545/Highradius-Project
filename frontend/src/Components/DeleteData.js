import React from 'react';
import './DeleteData.css';

function DeleteData(props) {

    function deleteRow(){
        fetch("http://localhost:8080/Highradius_training/DeleteData",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({"data":props.delData})
        }).then((res)=>{
            props.closeDeleteButton();
            window.alert("Deleted sucessfully");
            console.log("Deleted");
        }).catch(()=>{console.log("Error");
        window.alert("Something went wrong");
    })
    }

    
    
  return (
      <div className="DeleteData">
          <h3 style={{marginTop:"2%"}}>Delete Records ?</h3>
          <h3>Are you sure you want to delete these record[s] ?</h3>
          <div className="button">
                <input type="Button" onClick={deleteRow}  value="Delete"/>
                <input type="button" onClick={props.closeDeleteButton} value="Cancel"/>
          </div>
    </div>
    
    
  )
}

export default DeleteData;