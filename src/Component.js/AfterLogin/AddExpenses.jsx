import React from "react";
import { validateFormAddExpenses } from "../../utilti/validation";
import { SlCalender } from "react-icons/sl";
import { AiFillCar } from "react-icons/ai";
import { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../style.css/AfterLogin/AddExpenses.css";
import { RiContactsBookFill } from "react-icons/ri";
import { FaOilCan } from "react-icons/fa";
import { FaPumpMedical } from "react-icons/fa";
import { FaRoad } from "react-icons/fa";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { FaFloppyDisk,FaNoteSticky } from "react-icons/fa6";


const AddExpenses = ({ collapsed }) => {
  
  const [expensesData, setExpensesData] = useState({
    vType: "",
    fpDate: "",
    State: "",
    fType: "",
    fprice: "",
    Trip: "",
    Distance: "",
    vAverage: "",
    vRegistration: "",
    Notes: "",
  });
 
  const [errors, setErrors] = useState({});

  // datepicker onchang
  const Datehandlechange = (date) => {
    setExpensesData({ ...expensesData, fpDate: date });
  };
  const AddExpenseshandleChange = (e) => {
    const { name, value } = e.target;
    setExpensesData({ ...expensesData, [name]: value });
  };

  const handleSubmitExpenses = async (e) => {
    e.preventDefault();
    const newErrors = validateFormAddExpenses(expensesData);
    setErrors(newErrors);

    const isValid = Object.keys(newErrors).length === 0;
    if (isValid) {    
      const addexpensesformData = {
        vType: expensesData.vType,
        fpDate: expensesData.fpDate,
        State: expensesData.State,
        fType: expensesData.fType,
        fprice: expensesData.fprice,
        Trip: expensesData.Trip,
        Distance: expensesData.Distance,
        vAverage: expensesData.vAverage,
        vRegistration: expensesData.vRegistration,
        Notes: expensesData.Notes,
      };

      try {
        const response = await fetch(
          "http://localhost:5000/addExpensesModule/addExpensesData",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(addexpensesformData),
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("addExpenses save successfully:", data);
        } else {
          const errorData = await response.json();
          console.error("Failed to save addExpenses data :", errorData);
        }
      } catch (error) {
        console.error("Error during save addTrip:", error);
      }
      setExpensesData({
        vType: "",
        fpDate: "",
        State: "",
        fType: "",
        fprice: "",
        Trip: "",
        Distance: "",
        vAverage: "",
        vRegistration: "",
        Notes: "",
      });
    }

    return isValid;
  };
  return (
    <>
      <div
        className={`app sidebarstyle ${
          collapsed ? "maxwidth_content" : "main_box"
        }`}
      >
        <div className="mainwrapper">
          <div className="container">
            <div className="head45">
              <h2>Add New Expenses</h2>
            </div>
            <div className="newTrip">
              <div className="contents1">
                <h4>Expense Detail</h4>
              </div>
              <form className="mb-5" onSubmit={handleSubmitExpenses}>
                <div className="row mb-5">
                  <div className="col-lg-7">
                    <div className="name_group form_group">
                      <label htmlFor="">Vehicle Type</label>
                      <InputGroup
                        controlId="validationCustom01"
                        className="mb-3"
                      >
                        <InputGroup.Text id="basic-addon1">
                          <AiFillCar />
                        </InputGroup.Text>
                        <Form.Select
                          onChange={AddExpenseshandleChange}
                          name="vType"
                          value={expensesData.vType}
                          aria-label="Default select example"
                          className="form-control"
                        >
                          <option>Select Vehicle</option>
                          <option value="One">One</option>
                          <option value="Two">Two</option>
                          <option value="Three">Three</option>
                        </Form.Select>
                      </InputGroup>
                      {errors.vType && (
                        <p className="style01">{errors.vType}</p>
                      )}
                    </div>

                    <div className="col-lg-6 form_group">
                      <label htmlFor="">Fuel Price Date</label>
                      <InputGroup key="endDate" className="mb-3">
                        <InputGroup.Text id="basic-addon1">
                          <SlCalender />
                        </InputGroup.Text>
                        <DatePicker
                          className="form-control018"
                          selected={expensesData.fpDate}
                          onChange={Datehandlechange}
                        />
                      </InputGroup>
                    </div>

                    <div className="name_group form_group">
                      <label htmlFor="">State</label>
                      <InputGroup
                        controlId="validationCustom01"
                        className="mb-3 "
                      >
                        <InputGroup.Text id="basic-addon1">
                          <RiContactsBookFill />
                        </InputGroup.Text>
                        <Form.Select
                          onChange={AddExpenseshandleChange}
                          name="State"
                          value={expensesData.State}
                          aria-label="Default select example"
                          className="form-control"
                        >
                          <option>Select Fuel State</option>
                          <option value="Uttar Predesh">Uttar Predesh</option>
                          <option value="Delhi">Delhi</option>
                          <option value="Haryana">Haryana</option>
                        </Form.Select>
                      </InputGroup>
                      {errors.State && (
                        <p className="style01">{errors.State}</p>
                      )}
                    </div>
                    <div className="name_group form_group">
                      <label htmlFor="">Fuel type</label>
                      <InputGroup
                        controlId="validationCustom01"
                        className="mb-3"
                      >
                        <InputGroup.Text id="basic-addon1">
                          <FaOilCan />
                        </InputGroup.Text>
                        <Form.Select
                          onChange={AddExpenseshandleChange}
                          name="fType"
                          value={expensesData.fType}
                          aria-label="Default select example"
                          className="form-control"
                        >
                          <option>Select Fuel Type</option>
                          <option value="CNG">CNG</option>
                          <option value="Petrol">Petrol</option>
                          <option value="Disel">Disel</option>
                        </Form.Select>
                      </InputGroup>
                      {errors.fType && <p className="style01">{errors.fType}</p>}
                    </div>

                    <div className="name_group form_group">
                      <label htmlFor="">Fuel Price</label>
                      <InputGroup
                        controlId="validationCustom01"
                        className="mb-3"
                      >
                        <InputGroup.Text id="basic-addon1">
                          <FaPumpMedical />
                        </InputGroup.Text>
                        <Form.Control
                          className="form-control"
                          placeholder="0"
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                          onChange={AddExpenseshandleChange}
                          name="fprice"
                          value={expensesData.fprice}
                        />
                      </InputGroup>
                      {errors.fprice && (
                        <p className="style01">{errors.fprice}</p>
                      )}
                    </div>
                    <div className="name_group form_group">
                      <label htmlFor="">Trip</label>
                      <InputGroup
                        controlId="validationCustom01"
                        className="mb-3"
                      >
                        <InputGroup.Text id="basic-addon1">
                          <AiFillCar />
                        </InputGroup.Text>
                        <Form.Select
                          onChange={AddExpenseshandleChange}
                          name="Trip"
                          value={expensesData.Trip}
                          aria-label="Default select example"
                          className="form-control"
                        >
                          <option>Select Trip</option>
                          <option value="One">One</option>
                          <option value="Two">Two</option>
                          <option value="Three">Three</option>
                        </Form.Select>
                      </InputGroup>
                      {errors.Trip && <p className="style01">{errors.Trip}</p>}
                    </div>
                    <div className="name_group form_group">
                      <label htmlFor="">Distance (KM)</label>
                      <InputGroup
                        controlId="validationCustom01"
                        className="mb-3"
                      >
                        <InputGroup.Text id="basic-addon1">
                          <FaRoad />
                        </InputGroup.Text>
                        <Form.Control
                          className="form-control"
                          type="number"
                          placeholder="add distance Km"
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                          onChange={AddExpenseshandleChange}
                          name="Distance"
                          value={expensesData.Distance}
                        />
                      </InputGroup>
                      {errors.Distance && <p className="style01">{errors.Distance}</p>}
                    </div>
                    <div className="name_group form_group">
                      <label htmlFor="">Vehicle Average (Per Liter)</label>
                      <InputGroup
                        controlId="validationCustom01"
                        className="mb-3"
                      >
                        <InputGroup.Text id="basic-addon1">
                          <FaOilCan />
                        </InputGroup.Text>
                        <Form.Control
                          onChange={AddExpenseshandleChange}
                          name="vAverage"
                          value={expensesData.vAverage}
                          className="form-control"
                          placeholder="Per Liter"
                          aria-label="Username"
                          aria-describedby="basic-addon1"                         
                        />
                      </InputGroup>
                      {errors.vAverage && <p className="style01">{errors.vAverage}</p>}
                    </div>
                    <div className="name_group form_group">
                      <label htmlFor="">Vehicle Registration</label>
                      <InputGroup
                        controlId="validationCustom01"
                        className="mb-3"
                      >
                        <InputGroup.Text id="basic-addon1">
                          <AiFillCar />
                        </InputGroup.Text>
                        <Form.Control
                          className="form-control"
                          placeholder="Vehicle Registration"
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                          onChange={AddExpenseshandleChange}
                          name="vRegistration"
                          value={expensesData.vRegistration}
                        />
                      </InputGroup>
                      {errors.vRegistration && <p className="style01">{errors.vRegistration}</p>}
                    </div>
                    <div className="name_group form_group">
                      <label htmlFor="">Notes</label>
                      <InputGroup
                        controlId="validationCustom01"
                        className="mb-3"
                      >
                        <InputGroup.Text id="basic-addon1">
                          <FaNoteSticky />
                        </InputGroup.Text>
                        <Form.Control
                          className="form-control "
                          as="textarea"                          
                          placeholder="Notes"
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                          onChange={AddExpenseshandleChange}
                          name="Notes"
                          value={expensesData.Notes}
                        />
                      </InputGroup>
                      {errors.Notes && <p className="style01">{errors.Notes}</p>}
                    </div>
                  </div>
                  <div className="col-lg-5 Rupees">
                    <h4>Total Expense</h4>
                    <label htmlFor="#">
                        <span>
                            <p ><MdOutlineCurrencyRupee className="Rupeessvg"/>0</p>
                        </span>
                    </label>
                  </div>
                </div>
                <div>
                  <button className="btn" type="submit">
                    <FaFloppyDisk className="svg_savebtn29"/> SAVE
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddExpenses;
