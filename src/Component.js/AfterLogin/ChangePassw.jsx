import React, { useState } from 'react'
import { changePassword} from '../../utilti/validation';
import loginLogo from "../../img/logo.webp";

const ChangePassw = () => {
    const [ChangePass, setChangePass] = useState({
        password: "",
        NewPass: "",
        ConPass: "",        
      });
      const [errors, setErrors] = useState({});
      const [isFormValid, setIsFormValid] = useState(false);

      const handleChange = (e) => {
        const { name, value } = e.target;
        setChangePass({ ...ChangePass, [name]: value });
      };
    
      const handleSubmitRigister = (e) => {
        e.preventDefault();
        const newErrors = changePassword (ChangePass);
        setErrors(newErrors);
    
        // Use the updated value of isFormValid from setIsFormValid callback
        setIsFormValid((prevIsFormValid) => {
          const isValid = Object.keys(newErrors).length === 0;
          if (isValid) {
            console.log("Form submitted");
    
            setChangePass({
                password: "",
                NewPass: "",
                ConPass: "",
            });
          } else {
            console.log("Form validation failed");
          }
          return isValid;
        });
      }; 
  return (
    <>
        <div className="login_wrap">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 right_card alignt-item-center pr-0">
              <div className="solution_area01">
                <figure>
                  <img src={loginLogo} alt="card-img" width={190} height={90} />
                </figure>
                <ul>
                  <li>Calculate your Petrol, Diesel,CNG expenses.</li>
                  <li>Check your Nearest Petrol Pump</li>
                  <li>Check all Tolls rates in your route</li>
                  <li>Check your vehicle Tank Storage</li>
                  <li>Check all the ATM's in the Route</li>
                  <li>Team Management</li>
                  <li>Download Your Track Reports as you want</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-5 left_card">
              <div className="googleLogin">
                <div className="loginHead">
                  <h2>Change Password</h2>
                </div>
                <p>You Will Receive Instructions For Change Password.</p>
                <form action="#" onSubmit={handleSubmitRigister}>
                  <div className="input_group mb-4">
                    <div>
                      <div className="mb-4 fName inpupadd">
                        <input
                          onChange={handleChange}
                          type="text"
                          placeholder="Enter Your Old Password"
                          name="password"
                          value={ChangePass.password}
                        />
                        {errors.password && (
                          <p className="style01">{errors.password}</p>
                        )}
                      </div>
                      <div className="inpupadd lName">
                        <input
                          onChange={handleChange}
                          type="text"
                          placeholder="Enter Your New Password"
                          name="NewPass"
                          value={ChangePass.NewPass}
                        />
                        {errors.NewPass && (
                          <p className="style01">{errors.NewPass}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="inpupadd input_group mb-4">
                    <input
                      onChange={handleChange}
                      type="text"
                      placeholder="Confirm Password"
                      name="ConPass"
                      value={ChangePass.ConPass}
                    />
                    {errors.ConPass && <p className="style01">{errors.ConPass}</p>}
                  </div>
                 
                  <button className="btn" type="submit">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChangePassw
