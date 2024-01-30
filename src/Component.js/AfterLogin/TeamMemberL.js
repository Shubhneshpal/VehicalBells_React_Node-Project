import React, { useEffect, useState } from "react";
import "../../style.css/AfterLogin/TeamMemberL.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaEye } from "react-icons/fa6";
import moment from "moment";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Profile_logo from "../../img/Profile-logo.png";

const TeamMemberL = ({ collapsed }) => {
  const [getdata, setGetdata] = useState([]);
  const [getlogin, setGetlogin] = useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Registratin form api
  useEffect(() => {
    const Regfetchdata = async () => {
      try {
        const Response = await fetch(
          "http://localhost:5000/RegistrationApiModule/RegistrationGetData"
        );
        if (Response.ok) {
          const jsonData = await Response.json();
          setGetlogin(jsonData);
        } else {
          console.error("error fetching data");
        }
      } catch (error) {
        console.error("error fetchig data", error);
      }
    };
    Regfetchdata();
  }, []);
  return (
    <>
      <div
        className={`app sidebarstyle ${
          collapsed ? "maxwidth_content" : "main_box"
        }`}
      >
        <div className="mainwrapper">
          <div className="row">
            <div className="col-lg-12">
              <div className="Dash_block div_add">
                <div className="contents1 d-flex justify-content-between align-items-start">
                  <h4>Your Team Members</h4>
                </div>
                <div>
                  <div className="head_center">
                    <div className="table_content">
                      <table>
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Compnay Name</th>
                            <th>Role</th>
                            <th>Created Date</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        {getlogin.map((Items, ind) => {
                          return (
                            <>
                              <tbody>
                                <tr key={ind}>
                                  <td>{Items.name}</td>
                                  <td>{Items.lname}</td>
                                  <td>{Items.email}</td>
                                  <td>{Items.Cname}</td>
                                  <td>Acount Owner</td>
                                  <td>
                                    {moment(Items.createdDate).format(
                                      "DD-MMM-YYYY"
                                    )}
                                  </td>
                                  <td>
                                    <FaEye
                                      className="pen"
                                      onClick={handleShow}
                                    />{" "}
                                    <RiDeleteBin6Line className="pen del7" />
                                  </td>
                                </tr>
                                
                              </tbody>
                              <div>                           
                             
                                <Modal
                                  show={show}
                                  onHide={handleClose}
                                  size="xl"
                                  aria-labelledby="contained-modal-title-vcenter"
                                  top                             
                                >
                                  <Modal.Header closeButton>
                                    <Modal.Title id="contained-modal-title-vcenter">
                                    Member Information
                                    </Modal.Title>
                                  </Modal.Header>
                                  <Modal.Body>
                                  <div className="row">
                                      <div className="col-md-8">
                                        <table>
                                          <tr style={{ display: "flex" }}>
                                            <th className="modalth">Name</th>
                                            <td className="modaltd">
                                              {Items.name}
                                            </td>
                                          </tr>
                                          <tr style={{ display: "flex" }}>
                                            <th className="modalth">Email</th>
                                            <td className="modaltd">
                                              {Items.email}
                                            </td>
                                          </tr>
                                          <tr style={{ display: "flex" }}>
                                            <th className="modalth">Phone</th>
                                            <td className="modaltd">_ _</td>
                                          </tr>
                                          <tr style={{ display: "flex" }}>
                                            <th className="modalth">Company</th>
                                            <td className="modaltd">
                                              {Items.Cname}
                                            </td>
                                          </tr>
                                          <tr style={{ display: "flex" }}>
                                            <th className="modalth">Role</th>
                                            <td className="modaltd">
                                              Acount Owner
                                            </td>
                                          </tr>
                                          <tr style={{ display: "flex" }}>
                                            <th className="modalth">
                                              Created At
                                            </th>
                                            <td className="modaltd">
                                              {moment(Items.createdDate).format(
                                                "DD-MMM-YYY"
                                              )}
                                            </td>
                                          </tr>
                                          <tr style={{ display: "flex" }}>
                                            <th className="modalth">
                                              Last Updated At
                                            </th>
                                            <td className="modaltd">
                                              {moment(Items.createdDate).format(
                                                "DD-MMM-YYY"
                                              )}
                                            </td>
                                          </tr>
                                        </table>
                                      </div>
                                      <div className="col-md-4">
                                        <span className="Profileimg">
                                          <img
                                            src={Profile_logo}
                                            alt="Profile-Logo"
                                          />
                                        </span>
                                      </div>
                                    </div>
                                    <hr />
                                    <div className="modal_redord">
                                      <h4>Trip List</h4>
                                      <div>
                                        <p>There are no records to display</p>
                                      </div>
                                    </div>
                                  </Modal.Body>
                                  <Modal.Footer>
                                    <Button onClick={handleClose}>
                                      Close
                                    </Button>
                                  </Modal.Footer>
                                </Modal>
                              </div>
                            </>
                          );
                        })}
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamMemberL;
