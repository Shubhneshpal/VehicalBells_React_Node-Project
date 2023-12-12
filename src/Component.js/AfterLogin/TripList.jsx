import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiPlus } from "react-icons/hi";


const TripList = ({collapsed}) => {
  const [Data, setData] = useState([]);
  console.log(Data)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/addTripGetModule/GetTripData'); // Adjust the URL based on your server configuration
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
            <h2>All Trips</h2>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="Dash_block div_add">
                <div className="contents1 d-flex justify-content-between align-items-start">
                  <h4> Trip list </h4>
                  <Link className="btn small_btn">
                    <HiPlus /> Add Trip
                  </Link>
                </div>
                <div className="head_center">
                <div className="table_content">
                    <table>
                        <thead>
                            <tr>
                                <th>Trip Start Date</th>
                                <th>Trip End Date</th>
                                <th>From</th>
                                <th>End</th>
                                <th>Choose Vehicle:</th>
                                <th>Trip Type:</th>
                                <th>Note</th>                                
                                <th>Tag</th>                                
                            </tr>
                        </thead>          

                        <tbody>
                         { Data.map((item,index)=>{                          
                          return (
                            <tr key={index}>
                            <td>{item.sDate}</td>
                            <td>{item.eDate}</td>
                            <td>{item.Tfrom}</td>
                            <td>{item.Tend}</td>
                            <td>{item.Cvehicle}</td>
                            <td>{item.Ttpye}</td>
                            <td>{item.Note}</td>
                            <td>{item.Tag}</td>
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

export default TripList;
