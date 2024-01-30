import React, { useState } from 'react'
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { TeamvalidateForm } from '../../utilti/validation';

const TeamDshboardModal = ({handleClose, setShow,show}) => {

  const [TeamData, setTeamData] = useState({
    TeamName: "",
    Eadress: "",
  });
  const [errors, setErrors] = useState({});

  const TeamhandleChange = (e) => {
    const { name, value } = e.target;
    setTeamData({ ...TeamData, [name]: value });
  };

  const handleSubmitcreateTeam = async (e) => {
    e.preventDefault();
    const newErrors = TeamvalidateForm(TeamData);
    setErrors(newErrors);

    const isValid = Object.keys(newErrors).length === 0;
    if (isValid) {
      const TeamformData = {
        TeamName: TeamData.TeamName,
        Eadress: TeamData.Eadress,
      };

      try {
        const response = await fetch(
          "http://localhost:5000/CrateTeamModule/TeamData",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(TeamformData),
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("TeamData save successfully:", data);
        } else {
          const errorData = await response.json();
          console.error("Failed to save TeamData :", errorData);
        }
      } catch (error) {
        console.error("Error during save addTrip:", error);
      }
      setTeamData({
        TeamName: "",
        Eadress: "",
      });
      setShow(false);
    }

    return isValid;
  };
  return (
    <>
                  <Modal size='lg' show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add Team</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Team Name</Form.Label>
                    <Form.Control
                      onChange={TeamhandleChange}
                      name="TeamName"
                      value={TeamData.TeamName}
                      type="name"
                      placeholder="Enter Team Name"
                      autoFocus
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>Email address (test@example.com,test@example.com)</Form.Label>
                    <Form.Control onChange={TeamhandleChange} as="textarea" name="Eadress"
                      value={TeamData.Eadress} rows={3} />
                  </Form.Group>
                  {errors.Eadress && <p className="style01">{errors.Eadress}</p>}
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleSubmitcreateTeam}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
    </>
  )
}

export default TeamDshboardModal
