import './css/heading.css';
import Navbar from './Components/Navbar';
import Features from './Components/Features';
import Footer from './Components/Footer';
import TableData from './Components/TableData';
import AddData from './Components/AddData';
import {useState} from 'react';
import EditData from './Components/EditData';
import DeleteData from './Components/DeleteData';
import AdvanceSearch from './Components/AdvanceSearch';

function App() {
  const [advanceSearchTrigger, setAdvanceSerchTrigger] = useState(false);
  const [advanceSearchData, setAdvanceSerchData] = useState([]);
  const [addButtonTrigger, setaddButtonTrigger] = useState(false);
  const [editButtonTrigger, seteditButtonTrigger] = useState(false);
  const [deleteTrigger, setdeleteTrigger] = useState(false);
  const [deleteSlNo, setDeleteSlNo] = useState([]);
  const [predictSlNo, setPredictSlNo] = useState([]);
  const [predictedData, setpredictedData] = useState('');
  const [editSlNo, setEditSlNo] = useState('');
  const [refreshTableTrigger, setrefreshTableTrigger] = useState(false);
  const [searchCustomerId, setSearchCustomerId] = useState('');

  function setPredictSl(val){
    if(predictSlNo.includes(val)){
      predictSlNo.splice(predictSlNo.indexOf(val))
    }
    else{
      setPredictSlNo([...predictSlNo,val]);
    }
    
  }
  function setPredicted(val){
    setpredictedData(val);
    
  }
  
  function addButton(){
    setaddButtonTrigger(true);
  }
  function closeAddButton(){
    setaddButtonTrigger(false);
  }

  function editButton(){
      seteditButtonTrigger(true);
  }
  function editRow(val){
    setEditSlNo(val);
  }
  function deleteButton(){
    setdeleteTrigger(true);
  }
  function closeEditButton(){
    seteditButtonTrigger(false);
  }
  
  function closeDeleteButton(){
    setdeleteTrigger(false);
  }
  function getDeleteRow(val){
    if(deleteSlNo.includes(val)){
      deleteSlNo.splice(deleteSlNo.indexOf(val))
    }
    else{
      setDeleteSlNo([...deleteSlNo,val]);
    }
    
  }
  function refreshTable(){
    setrefreshTableTrigger(true);
  }
  function closeRefreshTrigger(){
    setrefreshTableTrigger(false);
  }
  function getSearchCustomerId(customerId){
    setSearchCustomerId(customerId);
  }
  function getAdvanceSearchData(val){
    setAdvanceSerchData(val);
  }
  function closeAdvanceSearch(){
    setAdvanceSerchTrigger(false);
  }
  function setAdvanceTrigger(){
    setAdvanceSerchTrigger(true);
  }
  return (
    <>
    <Navbar/>
    <Features setAdvanceTrigger={setAdvanceTrigger} predictSlNo={predictSlNo} setPredicted={setPredicted} addButton={addButton} editButton={editButton} deleteButton={deleteButton} refreshTable={refreshTable} getSearchCustomerId={getSearchCustomerId}/>
    
    <TableData setPredictSl={setPredictSl} predictedData={predictedData} getDeleteRow={getDeleteRow} getEditRow={editRow} advanceSearchData={advanceSearchData} refreshTrigger={refreshTableTrigger} closeRefreshTrigger={closeRefreshTrigger} customerId={searchCustomerId} />
    {advanceSearchTrigger?<AdvanceSearch  getAdvanceSearchData={getAdvanceSearchData} closeAdvanceSearch={closeAdvanceSearch}/>:""}
    {addButtonTrigger?<AddData closeAddButton={closeAddButton}/>:""}
    {(editButtonTrigger && editSlNo!=="")?<EditData editRow={editRow} row_value={editSlNo} closeEditButton={closeEditButton} />:""}
    {(deleteTrigger && deleteSlNo.length>0)?<DeleteData delData={deleteSlNo} closeDeleteButton={closeDeleteButton}/>:""}
    <Footer/>
    </>
  );
}

export default App;
