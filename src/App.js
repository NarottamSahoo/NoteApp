
import { DatePicker } from 'antd';
import "antd/dist/antd.css";
import './App.css';
import React, { useState } from "react";
import { Modal } from 'antd'


function App() {
  const [values, setValues] = useState({
    date: '',
    notes: '',
    data: [],
    mDate: '',
    mNote:''
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = (e) => {
    setIsModalVisible(true);
    let x = e.target.id;
    let findArr = values.data.find(e=> e.date == x)
    setValues((values) => ({
      ...values,
      mDate: findArr.date,
      mNote: findArr.notes
    }));
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  function handleDateChange(date, dateString) {
    console.log(dateString);
    setValues((values) => ({
      ...values,
      date: dateString,
    }));

  }
  function handleChange(e){
    console.log(e.target.value)
    setValues((values) => ({
      ...values,
      notes: e.target.value,
    }));
  }
  
  function add(){
    if(values.date === '')
    {
      alert('Please choose a Date')
    }
    else if(values.notes === '')
    {
      alert('Please enter your thoughts')
    }
    else{
      let temp=[];
      temp.push(...values.data,{date: values.date, notes: values.notes});
      setValues((values) =>({
        ...values,
        data: temp
      }))
    }
    
  }
  return (
    <div className="">
      
      <div className="container">
      <h3>Create Notes for Particular Date</h3><br/><br/>
      <div class="form-group col-md-6">
        <label>Choose a Date</label>
        <div >
          <DatePicker className="form-control" onChange={handleDateChange} />
        </div>
        
      </div>
      <div class="form-group col-md-6">
        
        <label>Share your thoughts</label>
        <input type="text" class="form-control" onChange={handleChange} placeholder="Please note something..." />
       
      </div>
      <div class="form-group col-md-6">
        <button className="btn btn-primary" onClick={add}>Add</button>
       
      </div>
      <br/><br/>
      {values.data.length == 0 ?'':<table class="table table-borderless " >
        
        <thead>
          <tr>
            <th>Date</th>
            <th>Notes</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          
          { values.data.map ((data) =>{
                        return (<tr><th scope="row" className='fnt-size13'>{data.date}</th>
                        <td className='fnt-size13'>{data.notes}</td>
                        <td className='fnt-size13'><a className='status-class color-view' id={values.date} onClick={showModal}>View</a></td>
                      </tr > )      
                      })} 
        </tbody>
      </table>}
    </div>
    <Modal title="Details" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Date: {values.mDate}</p>
        <p>Note: {values.mNote}</p>
      </Modal>
    </div>
  );
}

export default App;
