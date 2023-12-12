import React, { useEffect, useState } from "react";
import "../../style.css/AfterLogin/YourExpenses.css"
import { Link } from "react-router-dom";
import { HiPlus } from "react-icons/hi";


const YourExpenses = ({collapsed}) => {
  const [expense, setExpense] = useState([]);
  console.log(expense)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/ExpensesGetApiModule/GetExpensesData'); // Adjust the URL based on your server configuration
        if (response.ok) {
          const jsonData = await response.json();
          setExpense(jsonData);
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
            <h2>All Expenses</h2>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="Dash_block div_add">
                <div className="contents1 d-flex justify-content-between align-items-start">
                  <h4> Expenses list </h4>
                  <Link className="btn small_btn">
                    Yearly Expenses
                  </Link>
                  <select className="form_controls monthsSelet" name="month" id="months" >
                    <option value="date">2023-November</option>
                    <option value="date">2023-Octover</option>
                    <option value="date">2023-September</option>
                  </select>
                  <Link to={"/Addexpenses"} className="btn small_btn">
                    <HiPlus /> Add Expenses
                  </Link>
                </div>
                <div className="head_center expense">
                <div className="table_content">
                    <table>
                        <thead>
                            <tr>
                                <th>Vehicle Type</th>
                                <th>Fuel Price Date</th>
                                <th>State</th>
                                <th>Fuel Type</th>
                                <th>Fuel Price</th>
                                <th>Trip</th>
                                <th>Distance(Km)</th>                                
                                <th>Vehicle Average <br /> (Per Liter)</th>                                
                                <th>Vehicle Registration</th>                                
                                <th>Notes</th>                                
                            </tr>
                        </thead>          

                        <tbody>
                         { expense.map((item,index)=>{                          
                          return (
                            <tr key={index}>
                            <td>{item.vType}</td>
                            <td>{item.fpDate}</td>
                            <td>{item.State}</td>
                            <td>{item.fType}</td>
                            <td>{item.fprice}</td>
                            <td>{item.Trip}</td>
                            <td>{item.Distance}</td>
                            <td>{item.vAverage}</td>
                            <td>{item.vRegistration}</td>
                            <td>{item.Notes}</td>
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

export default YourExpenses;
