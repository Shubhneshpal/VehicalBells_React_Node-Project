import React, { useEffect, useState } from "react";
import moment from "moment";
import { FaPencilAlt } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const TeamList = ({ collapsed }) => {
  const [getdata, setGetdata] = useState([]); 
  const [teamModals, setTeamModals] = useState({}); 

  const handleClose = (teamId) => {
    setTeamModals((prevModals) => ({
      ...prevModals,
      [teamId]: {       
        show: false,
      },
    }));
  };
  const handleShow = (teamId,teamName) => {
    setTeamModals((prevModals) => ({
      ...prevModals,
      [teamId]: {       
        show: true,
        updatedTeamName: teamName,
      },
    }));
  };

  // GET Api
  const fetchdata = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/TeamGetApiModule/TeamGetData"
      );
      if (response.ok) {
        const jsonData = await response.json();
        setGetdata(jsonData);
      } else {
        console.error("error fetching data");
      }
    } catch (error) {
      console.error("error fetchig data", error);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  // DELETE API
  const handleDelete = async (id) => {
    try {
      const userConfirom = window.confirm("Are you sure you want to delete?");
      if(userConfirom){     
      const response = await fetch( 
        `http://localhost:5000/DeleteModule/TeamDeleteData/${id}`,
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
        fetchdata();
      } else {
        console.error("Failed to delete data:", response.statusText);
      }
    }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  //   PATCH Api

  const handleUpdate = async (id, updatedData) => {
    try {
      const response = await fetch(
        `http://localhost:5000/patchTeamModule/TeamUpdateDatas/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ TeamName: updatedData }),
        }
      );
      if (response.ok) {
        console.log("Team updated successfully");
        // You can update the state or refetch the data if needed
        fetchdata();
        handleClose(id); // Close the specific modal      
        
      } else {
        console.error("Failed to update team:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating team:", error);
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
          <div className="row">
            <div className="col-lg-12">
              <div className="Dash_block div_add">
                <div className="contents1">
                  <h4>Teams</h4>
                </div>
                <div className="head_center">
                  <div className="table_content mt-4">
                    <table>
                      <thead>
                        <tr>
                          <th>Team Name</th>
                          <th>Total Members</th>
                          <th>Total Invites</th>
                          <th>Create Date</th>
                          <th>Update Date</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getdata.map((data, ind) => {
                          const modalState = teamModals[data._id] || {
                            show: false,
                            updatedTeamName: "",
                          };
                          
                          
                          return (
                            <tr key={ind}>
                              <td>
                                <Link to={"/teamMemberLlist"}>{data.TeamName}</Link>
                              </td>
                              <td>1</td>
                              <td>1</td>
                              <td>{moment(data.createdDate).format('DD-MMM-YYYY')}</td>
                              <td>{moment(data.updatedDate).format('DD-MMM-YYYY')}</td>
                              <td>
                                <FaPencilAlt
                                  className="pen"
                                  onClick={() => handleShow(data._id,data.TeamName)}
                                />{" "}
                                <RiDeleteBin6Line
                                  onClick={() => handleDelete(data._id)}
                                  className="pen del7"
                                />
                              </td>

                              {/* modal content */}

                              <div>
                                <Modal
                                  key={ind}
                                  size="lg"
                                  show={modalState.show}
                                  onHide={()=>handleClose(data._id)}
                                  animation={false}
                                >
                                  <Modal.Header closeButton>
                                    <Modal.Title>Team</Modal.Title>
                                  </Modal.Header>
                                  <Modal.Body>
                                    <label htmlFor="#">Team</label>
                                    <Form.Control
                                      type="text"
                                      value={modalState.updatedTeamName}
                                      onChange={(e) =>
                                        setTeamModals((prevModals) => ({
                                          ...prevModals,
                                          [data._id]: {
                                            ...modalState,
                                            updatedTeamName: e.target.value,
                                          },
                                        }))
                                      }
                                    />
                                  </Modal.Body>
                                  <Modal.Footer>
                                    <Button
                                      variant="secondary"
                                      onClick={()=>handleClose(data._id)}
                                    >
                                      Close
                                    </Button>
                                    <Button
                                      variant="primary"
                                      onClick={() =>
                                        handleUpdate( data._id,
                                          modalState.updatedTeamName)
                                      }
                                    >
                                      Save Changes
                                    </Button>
                                  </Modal.Footer>
                                </Modal>
                              </div>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
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

export default TeamList;
