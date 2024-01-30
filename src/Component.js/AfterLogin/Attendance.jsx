import React, { useEffect, useState } from "react";
import "../../style.css/AfterLogin/Attendance.css";
import { Link } from "react-router-dom";
import { FormControlLabel, Switch, styled } from "@mui/material";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Form from "react-bootstrap/Form";
import { FiCalendar } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import moment from "moment";

const Attendance = ({ collapsed }) => {
  const [attendance, setattendance] = useState({
    Cdate: "",
    timeIn: "",
    timeOut: "",
  });
  const [show, setShow] = useState(false);
  // Api Data
  const [attendData, setattendData] = useState([]);
  const [registerData, setregisterData] = useState([]);
  // Modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDateChange = (date) => {
    setattendance({ ...attendance, Cdate: date });
  };
  const handleTimeInChange = (e) => {
    setattendance({ ...attendance, timeIn: e.target.value });
  };
  const handleTimeOutChange = (e) => {
    setattendance({ ...attendance, timeOut: e.target.value });
  };

  const IOSSwitch = styled((props) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 61,
    height: 32,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(28px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor:
            theme.palette.mode === "dark" ? "#2ECA45" : "#EC3C3F",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color:
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 27,
      height: 27,
    },
    "& .MuiSwitch-track": {
      borderRadius: 36 / 2,
      backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  }));

  // Api calling

  const handleSubmit = async (e) => {
    e.preventDefault();
    const attendaceData = {
      Cdate: attendance.Cdate,
      timeIn: attendance.timeIn,
      timeOut: attendance.timeOut,
    };
    try {
      const response = await fetch(
        "http://localhost:5000/attendanceModule/markAttendance",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(attendaceData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("attendance save successfully:", data);
      } else {
        const errorData = await response.json();
        console.error("Failed to save attendance data :", errorData);
      }
    } catch (error) {
      console.error("Error during save attendance:", error);
    }

    setattendance({
      Cdate: "",
      timeIn: "",
      timeOut: "",
    });

    handleClose();
  };

  // Attendance api and register api

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/attendanceModule/GetAttendanceData"
      );
      if (response.ok) {
        const jsondata = await response.json();
        setattendData(jsondata);
      } else {
        console.log("error fetching data");
      }
    } catch (error) {
      console.log("error fetching data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Fetch register  page
  const fethRegisterData = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/RegistrationApiModule/RegistrationGetData"
      );
      if (response.ok) {
        const jsondata = await response.json();
        setregisterData(jsondata);
      } else {
        console.log("error fetching data");
      }
    } catch (error) {
      console.log("error fetching data", error);
    }
  };

  useEffect(() => {
    fethRegisterData();
  }, []);

    // DELETE API
    const handleDelete = async (id) => {
      try {
        const userConfirom = window.confirm("Are you sure you want to delete?");
        if(userConfirom){     
        const response = await fetch( 
          `http://localhost:5000/attendanceDeleteModule/attendanceDeleteData/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        if (response.ok) {               
          console.log("Data deleted successfully");
          // You can update the state or refetch the data if needed
          // setGetdata((prevData) => prevData.filter(item => item._id !== id));
          fetchData();
        } else {
          console.error("Failed to delete data:", response.statusText);
        }
      }
      } catch (error) {
        console.error("Error deleting data:", error);
      }
    };

  return (
    <>
      <div
        className={`app sidebarstyle ${
          collapsed ? "maxwidth_content" : "main_box"
        }`}
      >
        <div className="mainwrapper">
          <div className="head45 ">
            <h2>Mark attendance</h2>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="Dash_block div_add">
                <div className="contents1 d-flex justify-content-between align-items-start">
                  <h4> Self-attendance Tracker </h4>
                </div>
                <div className="attend_btn d-flex mt-3 justify-content-between align-items-start">
                  <Link onClick={handleShow} className="btn small_btn">
                    Request attendance Approval for previous Date
                  </Link>
                  <span>
                    <FormControlLabel
                      control={<IOSSwitch sx={{ m: 1 }} />}
                      label="Mark attendance"
                    />
                  </span>
                </div>
                <br />
                <hr />
                <div className="contents1 attend_btn d-flex justify-content-between align-items-start">
                  <h4> attendance List </h4>
                  <Link className="btn small_btn" to={"/teamattendance"}>
                    Team attendance List
                  </Link>
                </div>
                <div className="head_center">
                  
                  {attendData.length >0 ? (
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
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {attendData.map((data, ind) => {
                            return (
                              <tr key={ind}>
                                <td>
                                  {registerData.map((item, index) => {
                                    return (
                                      <p key={index}>
                                        {item.name} {item.lname}
                                      </p>
                                    );
                                  })}
                                </td>
                                <td>{data.timeIn}</td>
                                <td>{data.timeOut}</td>
                                <td>
                                  {moment(data.Cdate).format("DD-MMM-YYYY")}
                                </td>
                                <td>Marked</td>
                                <td>
                                  <RiDeleteBin6Line
                                    onClick={() => handleDelete(data._id)}
                                    className="pen del7"
                                  />
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
              </div>
            </div>
          </div>
          <div className="">
            <Modal
              className="fade"
              size="lg"
              show={show}
              onHide={handleClose}
              animation={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>attendance Tracker</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group controlId="formDate">
                      <Form.Label>Date</Form.Label>
                      <div className="position-relative">
                        <DatePicker
                          selected={attendance.Cdate}
                          onChange={handleDateChange}
                          dateFormat="dd/MM/yyyy"
                          className="form-control form01_control"
                        />
                        {/* <FiCalendar
                          className="position-absolute top-50 end-0 translate-middle-y me-2"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setSelectedDate(selectedDate);
                            // You can open the date picker here if needed
                          }}
                        /> */}
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group controlId="formTime">
                      <Form.Label>Time in</Form.Label>
                      <Form.Control
                        onChange={handleTimeInChange}
                        name="timeIn"
                        value={attendance.timeIn}
                        style={{ cursor: "pointer" }}
                        type="time"
                        step={300}
                      />
                    </Form.Group>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group controlId="formTime">
                      <Form.Label>Time out</Form.Label>
                      <Form.Control
                        onChange={handleTimeOutChange}
                        name="timeOut"
                        value={attendance.timeOut}
                        style={{ cursor: "pointer" }}
                        type="time"
                        step={300}
                      />
                    </Form.Group>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                  Submit attendance
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default Attendance;
