import React, { useEffect, useState } from "react";
import "../../style.css/AfterLogin/VehicleList.css"
import { Link } from "react-router-dom";
import { HiPlus } from "react-icons/hi";


const VehicleList = ({collapsed}) => {
  const [data, setData] = useState([]);
  console.log(data) 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/addVehicleGetModule/GetvehiclesData'); // Adjust the URL based on your server configuration
        if (response.ok) {
          const jsonData = await response.json();
          setData(jsonData);
        } else {
          console.error('Error fetching data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <>

      <div className={`app sidebarstyle ${collapsed ? 'maxwidth_content':'main_box'}`}>
        <div className="mainwrapper">
          <div className="head45 ">
            <h2>Add Trip</h2>
            
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="Dash_block div_add">
                <div className="contents1 d-flex justify-content-between align-items-start">
                  <h4> Vehicles list </h4>
                  <Link className="btn small_btn" to={"/addvehical"}>
                    <HiPlus /> Add Vehicle
                 </Link>
                </div>
                <div className="head_center">
                <div className="table_content">
                    <table>
                        <thead>
                            <tr>
                                <th>Vehicle Type</th>
                                <th>Manufacturer Company</th>
                                <th>Fule Type</th>
                                <th>Model(Optional)</th>
                                <th>Vehicle Registration</th>
                                <th>Avrage</th>
                                <th>Odometer Reading</th>                                
                            </tr>
                        </thead>
                        <tbody>
                         { data.map((item,index)=>{                          
                          return (
                            <tr key={index}>
                            <td>{item.vType}</td>
                            <td>{item.MCompany}</td>
                            <td>{item.fType}</td>
                            <td>{item.Modal}</td>
                            <td>{item.VRegistration}</td>
                            <td>{item.Avrage}</td>
                            <td>{item.OReading}</td>
                          </tr>                          
                          )                

                         })
                          }
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

export default VehicleList;
