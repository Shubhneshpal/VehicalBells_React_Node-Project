import React, { useEffect, useState } from "react";
import "../../style.css/AfterLogin/TeamDashboard.css";
import { Link } from "react-router-dom";
import { HiPlus } from "react-icons/hi";
import { FaFileExport } from "react-icons/fa";
import TeamDshboardModal from "./TeamDshboardModal";
import moment from 'moment';
import { FaPencilAlt } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";


const TeamDashboard = ({ collapsed }) => {
  const [getdata, setGetdata] = useState([]);
  const [getlogin, setGetlogin] = useState([]);

  // selected TeamData

  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedEaddress, setSelectedEaddress] = useState("");

  //***** */
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //***** */
  const today =new  moment().format('DD-MMM-YYYY');

 // team  api
  useEffect(() => {
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
    fetchdata();
  }, []);

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

  const handleTeamChange = (event) => {
    const selectedTeamName = event.target.value;
    setSelectedTeam(selectedTeamName);

    // Find the selected team's data
    const selectedTeamData = getdata.find(
      (team) => team.TeamName === selectedTeamName
    );
    // Update the  state with selected TeamName and Eaddress
    // console.log("Selected Team Name:", selectedTeamName);
    // console.log("Selected Team Data:", selectedTeamData);
    if (selectedTeamData) {
      setSelectedEaddress(selectedTeamData.Eadress);      
    } else {
      setSelectedEaddress("No data found");
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
                <div className="contents1 d-flex justify-content-between align-items-start">
                  <h4>Create Team</h4>
                 {getdata.length < 0 ? <Link onClick={handleShow} className="btn small_btn">
                    <HiPlus /> Create Team
                  </Link>:
                  <>
                  <Link onClick={handleShow} className="btn small_btn ">
                    <HiPlus /> Create Team
                  </Link>
                  <Link to={"/teamlist"} className="btn small_btn">
                     Team List
                  </Link>
                  </>}
                </div>
                <div className="row mb-5">
                  <div className="col-md-8">
                    <label className="mt-3" htmlFor="select">
                      Select Team
                    </label>
                    <select
                      className="formSelect"
                      onChange={handleTeamChange}
                      value={selectedTeam}
                    >
                      {getdata.map((info, indno) => {
                        return <option key={indno}>{info.TeamName}</option>;
                      })}
                    </select>
                  </div>
                </div>
                <hr />
                <div className="contents1 d-flex justify-content-between align-items-start">
                  <h4>Your Team Members</h4>
                </div>
                <hr />

                {getdata.length > 0 && (
                  <>
                  <div>
                    <span>
                    <Link className="btn expoBtn small_btn">
                    <FaFileExport /> Export Team Members
                  </Link>
                  <Link className="btn expoBtns small_btn">
                    <HiPlus /> Invite Team Members
                  </Link>
                    </span>
                  </div>
                <div>
                  <div className="head_center">
                    <div className="table_content">
                      <table>
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Compnay Name</th>
                            <th>Role</th>
                            <th>Created Date</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        {getlogin.map((Items, ind) => {
                          return (
                            <tbody>
                              <tr key={ind}>
                                <td>{Items.name} {Items.lname}</td>
                                <td>{Items.email}</td>
                                <td>{Items.Cname}</td>
                                <td>Acount Owner</td>
                                <td>{moment(Items.createdDate).format('DD-MMM-YYYY')}</td>
                                <td><FaPencilAlt className='pen' /> <RiDeleteBin6Line className='pen del7'/></td>
                              </tr>
                            </tbody>
                          );
                        })}
                      </table>
                    </div>
                  </div>
                  <hr />                
                  <div className="head_center">
                    <div className="table_content">
                      <table>
                        <thead>
                          <tr>
                            <th>Email</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{selectedEaddress}</td>
                            <td>
                              <Link>Resend Invite</Link>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>              
                </div>
                </>
                )}
              </div>
            </div>

            {/* Modal */}

            <TeamDshboardModal
              handleClose={handleClose}
              setShow={setShow}
              show={show}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamDashboard;
