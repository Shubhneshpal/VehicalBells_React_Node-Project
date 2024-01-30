import React, { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import moment from "moment";
const TeamAttendance = ({ collapsed }) => {
  const [attendData,setattendData] = useState([]);
  const [registerData,setregisterData] = useState([]);
// Fetch attendance aproval page
  const fethData = async()=>{
    try{
      const response = await fetch("http://localhost:5000/attendanceModule/GetAttendanceData") 
      if(response.ok){
        const jsondata = await response.json()
        setattendData(jsondata)
      }else{
        console.log("error fetching data")
      }
    } catch(error){
      console.log("error fetching data", error)
    }
  }

  useEffect(()=>{
    fethData()
  },[])

// Fetch register  page
  const fethRegisterData = async()=>{
    try{
      const response = await fetch("http://localhost:5000/RegistrationApiModule/RegistrationGetData") 
      if(response.ok){
        const jsondata = await response.json()
        setregisterData(jsondata)
      }else{
        console.log("error fetching data")
      }
    } catch(error){
      console.log("error fetching data", error)
    }
  }

  useEffect(()=>{
    fethRegisterData()
  },[])


  
  return (
    <>
      <div
        className={`app sidebarstyle ${
          collapsed ? "maxwidth_content" : "main_box"
        }`}
      >
        <div className="mainwrapper">
          <div className="head45 ">
            <h2>Team Attendance</h2>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="Dash_block div_add">
                <div  className="contents1 d-flex justify-content-between align-items-start">
                  <h4> Pending Attendance Request </h4>
                </div>
                <div className="head_center mb-5">                  
                  {attendData.length > 0 ? (
                    <div className="head_center">
                  <div className="table_content mt-4">
                    <table>
                      <thead>
                        <tr>
                          <th>Full Name</th>
                          <th>TimeIn</th>
                          <th>TimeOut</th>
                          <th>Date</th>
                          <th>Status</th>
                          <th className="ththth">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {attendData.map((data, ind) => {                                           
                          return (
                            <tr key={ind}>                             
                              <td>{registerData.map((item,index)=>{
                                return (
                                  <p key={index}>{item.name} {item.lname}</p>
                                )
                              })}</td>
                              <td>{data.timeIn}</td>
                              <td>{data.timeOut}</td>
                              <td>{moment(data.Cdate).format("DD-MMM-YYYY")}</td>
                              <td>Pending</td>
                              <td className="tdtdtdtd">                               
                                {/* <RiDeleteBin6Line
                                  // onClick={() => handleDelete(data._id)}
                                  className="pen del7"
                                /> */}
                                <button className="btn btnbutton btnbutton108">Accept</button>
                                <button className="btn btnbutton">Reject</button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
                  ) : (<h6>There are no records to display</h6>)
                  }                  
                </div>
                <hr />
                <div className="contents1 d-flex justify-content-between align-items-start">
                  <h4> Attendance List </h4>
                </div>
                <div className="head_center">                 
                  {attendData.length > 0 ? (
                    <div className="head_center">
                  <div className="table_content mt-4">
                    <table>
                      <thead>
                        <tr>
                          <th>Full Name</th>
                          <th>TimeIn</th>
                          <th>TimeOut</th>
                          <th>Date</th>
                          <th>Status</th>                          
                        </tr>
                      </thead>
                      <tbody>
                        {attendData.map((data, ind) => {                                               
                          
                          return (
                            <tr key={ind}>                             
                              <td>{registerData.map((item,index)=>{
                                return (
                                  <p key={index}>{item.name} {item.lname}</p>
                                )
                              })}</td>
                              <td>{data.timeIn}</td>
                              <td>{data.timeOut}</td>
                              <td>{moment(data.Cdate).format("DD-MMM-YYYY")}</td>
                              <td>Marked</td>                          
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
                  ):(<h6>There are no records to display</h6>)
                  }
            
                </div>
              </div>
            </div>
          </div>
        
        </div>
      </div>
    </>
  );
};

export default TeamAttendance;
