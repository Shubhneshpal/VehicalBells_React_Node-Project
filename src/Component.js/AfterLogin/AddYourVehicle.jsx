
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import "../../style.css/AfterLogin/AddVehicle.css"
import { addVehiclePageValidation } from "../../utilti/validation";


const AddYourVehicle = ({collapsed}) => {
  const [aVehicle, setaVehivle] = useState({
    vType:'',
    MCompany:'',
    fType:'',
    Modal:'',
    VRegistration:'',
    Avrage:'',
    OReading:''
  })

  const [errors, setErrors] = useState({});
 

  const handleOnchange = (e)=>{
    const {name,value} = e.target;
    setaVehivle(
      {...aVehicle,[name]:value}
    )
  }

  const handleAddVehiclSubmit = async(e)=>{
    e.preventDefault();

    const newErrors = addVehiclePageValidation(aVehicle);
    setErrors(newErrors);

   
      const isValid = Object.keys(newErrors).length === 0;
      if (isValid) {
        
        const formData = {
          vType:aVehicle.vType,
          MCompany:aVehicle.MCompany,
          fType:aVehicle.fType,
          Modal:aVehicle.Modal,
          VRegistration:aVehicle.VRegistration,
          Avrage:aVehicle.Avrage,
          OReading:aVehicle.OReading
        };
        
        try {
          const response = await fetch('http://localhost:5000/addVehicleModule/addVehicleData', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });        
        
        
          if (response.ok) {
            const data = await response.json();
            console.log('addVehicle data save successfully:', data);
          
          } else {
            const errorData = await response.json();
            console.error('Failed to register user:', errorData);
          }
        } catch (error) {
          console.error('Error during addVehicle save data:', error);
        }       

        setaVehivle({
          vType:'',
          MCompany:'',
          fType:'',
          Modal:'',
          VRegistration:'',
          Avrage:'',
          OReading:''
          })
      
      } else {
        console.log("Form validation failed");
      }

      return isValid;   
   
  }
  return (
    <>
   
      <div className={`app sidebarstyle ${collapsed ? 'maxwidth_content':'main_box'}`}>
        <div className="mainwrapper">
          <div className="head45">
            <h2>Add New Vehicle</h2>
          </div>
          <div className="newTrip">
            <div className="contents1">
              <h4>Vehicle Information</h4>
            </div>
            <div className="form">
              <form className="mb-5">
                <div className="name_group form_group">
                  <label htmlFor="">Vehicle Type</label>
                  <select onChange={handleOnchange} required={true} value={aVehicle.vType} className="form_controls50" name="vType" id="opti">
                    <option value="Motercycle">Motercycle</option>
                    <option value="Scooty">Scooty</option>
                    <option value="Electrick Scootar">Electrick Scootar</option>
                    <option value="Electrick Bike">Electrick Bike</option>
                    <option value="Car">Car</option>
                    <option value="Electrick car">Electrick Car</option>
                    <option value="Bus">Bus</option>
                    <option value="Truck">Truck</option>
                    <option value="Van">Van</option>
                  </select>
                  {errors.vType && <p className="style01">{errors.vType}</p>}
                </div>
                <div className="name_group form_group">
                  <label htmlFor="">Manufacturer Company</label>
                  <Form.Control onChange={handleOnchange} required={true} type="text" name="MCompany" value={aVehicle.MCompany} placeholder="Manufacturer Company" />
                  {errors.MCompany && <p className="style01">{errors.MCompany}</p>}
                </div>
                <div className="name_group form_group">
                  <label htmlFor="">Fuel Type</label>
                  <select onChange={handleOnchange} className="form_controls50" name="fType" value={aVehicle.fType} id="opti">
                    <option value="Petrol">Petrol</option>
                    <option value="Deisel">Deisel</option>                    
                    <option value="CNG">CNG</option>
                    <option value="Petrol/CNG">Petrol/CNG</option>
                    <option value="Deisel/CNG">Deisel/CNG</option>
                  </select>
                  {errors.fType && <p className="style01">{errors.fType}</p>}
                </div>
                <div className="name_group form_group">
                  <label htmlFor="">Model(Optional)</label>
                  <Form.Control onChange={handleOnchange} type="text" name="Modal" value={aVehicle.Modal} placeholder="Model" />
                  {errors.Modal && <p className="style01">{errors.Modal}</p>}
                </div>
                <div className="name_group form_group">
                  <label htmlFor="">Vehicle Registration</label>
                  <Form.Control onChange={handleOnchange} type="text" name="VRegistration" value={aVehicle.VRegistration} placeholder="Vehicle Registration" />
                  {errors.VRegistration && <p className="style01">{errors.VRegistration}</p>}
                </div>
                <div className="name_group form_group">
                  <label htmlFor="">Avrage (Optional/Manual/By Default)</label>
                  <Form.Control onChange={handleOnchange} type="text" name="Avrage" value={aVehicle.Avrage} placeholder="Average" />
                  {errors.Avrage && <p className="style01">{errors.Avrage}</p>}
                </div>
                <div className="name_group form_group ">
                  <label htmlFor="">Odometer Reading</label>
                  <Form.Control onChange={handleOnchange} type="text" name="OReading" value={aVehicle.OReading} placeholder="Odometer Reading" />
                  {errors.OReading && <p className="style01">{errors.OReading}</p>}
                </div>
                <div className="check">
                  <label htmlFor="#" className="checkbox">
                    <Form.Check  aria-label="option 1" className="cheks1" />{" "}
                    <span>Make This Vehicle Default</span>
                  </label>
                </div>
                <div>
                  <button onClick={handleAddVehiclSubmit} className="btn" type="submit">
                    Add Vehicle
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

export default AddYourVehicle;
