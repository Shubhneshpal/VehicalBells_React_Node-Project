import React from "react";
import "../../style.css/AfterLogin/AddTrip.css";
import {validateFormAddTrip } from "../../utilti/validation";
import { SlCalender } from "react-icons/sl";
import { BiSolidMap } from "react-icons/bi";
import { AiFillCar, AiFillStar } from "react-icons/ai";
import { BsFillTagFill } from "react-icons/bs";
import { FaNotesMedical } from "react-icons/fa";
import { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";





const AddTrip = ({collapsed}) => {
  // console.log('startDate',startDate)
  const [TripformData, setTripformData] = useState({
    sDate: "",
    eDate: "",
    Tfrom: "",
    Tend: "",
    Cvehicle: "",
    Ttpye: "",
    Note: "",
    Tag: "",
  });

  // console.log(TripformData)
  const [errors, setErrors] = useState({});
  
// datepicker onchang
const startdatehandlechange = (date)=>{ 
  setTripformData({...TripformData,sDate:date})

}
// datepicker onchang
const enddatehandlechange = (date)=>{
  setTripformData({...TripformData,eDate:date})
}
  const AddTriphandleChange = (e) => {
    const { name, value } = e.target; 
    setTripformData({ ...TripformData, [name]: value });
  };

  const handleSubmitTrip = async(e) => {    
    e.preventDefault();
    const newErrors = validateFormAddTrip(TripformData);
    setErrors(newErrors);

    
      const isValid = Object.keys(newErrors).length === 0;
      if (isValid) {       
        
        const addtripformData = {
          sDate: TripformData.sDate,
          eDate: TripformData.eDate,
          Tfrom: TripformData.Tfrom,
          Tend: TripformData.Tend,
          Cvehicle: TripformData.Cvehicle,
          Ttpye: TripformData.Ttpye,
          Note: TripformData.Note,
          Tag: TripformData.Tag,
        };
        
        try {
          const response = await fetch('http://localhost:5000/addTripModule/addTripData', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(addtripformData),
          });       
         
        
          if (response.ok) {
            const data = await response.json();
            console.log('addTrip save successfully:', data);

          
          } else {
            const errorData = await response.json();
            console.error('Failed to save addTrip data :', errorData);
          }
        } catch (error) {
          console.error('Error during save addTrip:', error);
        }       

        setTripformData({          
          Tfrom: "",
          Tend: "",
          Cvehicle: "",
          Ttpye: "",
          Note: "",
          Tag: "",
        });
      
      }
      

      return isValid;
   
  };

  return (
    <>    
      <div className={`app sidebarstyle ${collapsed ? 'maxwidth_content':'main_box'}`}>        
          <div className="mainwrapper">
            <div className="container">
              <div className="head45">
                <h2>Add Trip</h2>
              </div>
              <div className="newTrip">
                <div className="contents1">
                  <h4>Trip Information</h4>
                </div>
                <div className="row mb-5">
                  <div className="col-lg-6">
                    <div className="form">
                      <form  className="mb-5" onSubmit={handleSubmitTrip}>
                        <div className="row double">
                          <div className="col-lg-6 form_group">
                            <label htmlFor="">Trip Start Date</label>
                            <InputGroup key="startDate" className="mb-3">
                              <InputGroup.Text id="basic-addon2">
                                <SlCalender />
                              </InputGroup.Text>                              
                              <DatePicker
                                selected={TripformData.sDate}
                                onChange={startdatehandlechange}
                                
                              />
                            </InputGroup>
                          </div>
                          <div className="col-lg-6 form_group">
                            <label htmlFor="">Trip End Date</label>
                            <InputGroup key="endDate" className="mb-3">
                              <InputGroup.Text id="basic-addon1">
                                <SlCalender />
                              </InputGroup.Text>                            
                              <DatePicker
                                selected={TripformData.eDate}
                                onChange={enddatehandlechange}
                               
                              />
                            </InputGroup>
                          </div>
                        </div>
                        <div className="name_group form_group">
                          <label htmlFor="">From:</label>
                          <InputGroup controlId="validationCustom01" className="mb-3 ">
                            <InputGroup.Text id="basic-addon1">
                              <BiSolidMap />
                            </InputGroup.Text>
                            <Form.Control                              
                              placeholder="Search for start Adress"
                              aria-label="Username"
                              aria-describedby="basic-addon1"
                              name="Tfrom"
                              value={TripformData.Tfrom}
                              onChange={AddTriphandleChange}
                            />                                                                                     
                          </InputGroup> 
                          {errors.Tfrom && <p className="style01">{errors.Tfrom}</p>}                          
                        </div>
                        <div className="name_group form_group">
                          <label htmlFor="">End:</label>
                          <InputGroup controlId="validationCustom01" className="mb-3">
                            <InputGroup.Text id="basic-addon1">
                              <BiSolidMap />
                            </InputGroup.Text>
                            <Form.Control                              
                              placeholder="Search for End Adress"
                              aria-label="Username"
                              aria-describedby="basic-addon1"
                              name="Tend"
                              value={TripformData.Tend}
                              onChange={AddTriphandleChange}
                            /> 
                          </InputGroup>                         
                            {errors.Tend && <p className="style01">{errors.Tend}</p>}                           
                        </div>
                        <div className="name_group form_group">
                          <label htmlFor="">Choose Vehicle:</label>
                          <InputGroup controlId="validationCustom01" className="mb-3">
                            <InputGroup.Text id="basic-addon1">
                              <AiFillCar />
                            </InputGroup.Text>
                            <Form.Control                             
                              placeholder="Select Vehicle"
                              aria-label="Username"
                              aria-describedby="basic-addon1"
                              name="Cvehicle"
                              value={TripformData.Cvehicle}
                              onChange={AddTriphandleChange}
                            /> 
                          </InputGroup>                          
                             {errors.Cvehicle && <p className="style01">{errors.Cvehicle}</p>}                           
                        </div>
                        <div className="name_group form_group">
                          <label htmlFor="">Trip Type:</label>
                          <InputGroup controlId="validationCustom01" className="mb-3">
                            <InputGroup.Text id="basic-addon1">
                              <AiFillStar />
                            </InputGroup.Text>
                            <Form.Control                             
                              placeholder="Select a trip type"
                              aria-label="Username"
                              aria-describedby="basic-addon1"
                              name="Ttpye"
                              value={TripformData.Ttpye}
                              onChange={AddTriphandleChange}
                            />  
                          </InputGroup>                          
                            {errors.Ttpye && <p className="style01">{errors.Ttpye}</p>}                          
                        </div>
                        <div className="name_group form_group">
                          <label htmlFor="">Note:</label>
                          <InputGroup controlId="validationCustom01" className="mb-3">
                            <InputGroup.Text id="basic-addon1">
                              <FaNotesMedical />
                            </InputGroup.Text>
                            <Form.Control                               
                              placeholder="Note"
                              aria-label="Username"
                              aria-describedby="basic-addon1"
                              name="Note"
                              value={TripformData.Note}
                              onChange={AddTriphandleChange}
                            /> 
                          </InputGroup>                            
                           {errors.Note && <p className="style01">{errors.Note}</p>}
                        </div>
                        <div className="name_group form_group">
                          <label htmlFor="">Tags:</label>
                          <InputGroup controlId="validationCustom01" className="mb-3">
                            <InputGroup.Text id="basic-addon1">
                              <BsFillTagFill />
                            </InputGroup.Text>
                            <Form.Control                             
                              placeholder="Tags"
                              aria-label="Username"
                              aria-describedby="basic-addon1"
                              name="Tag"
                              value={TripformData.Tag}
                              onChange={AddTriphandleChange}
                            /> 
                          </InputGroup>                            
                            {errors.Tag && <p className="style01">{errors.Tag}</p>}
                        </div>
                        <div className="check">
                          <label htmlFor="#" className="checkbox">
                            <Form.Check                              
                              aria-label="option 1"
                              className="cheks1"
                            />{" "}
                            <span>Round Trip</span>
                          </label>
                        </div>
                        <div>
                          <button className="btn" type="submit">
                            SAVE
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-6 maping">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.89797036338!2d77.04417242604603!3d28.527554409017824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1698836043693!5m2!1sen!2sin"
                      width={600}
                      height={450}
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      className="iframe01"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        
      </div>
    </>
  );
};

export default AddTrip;
