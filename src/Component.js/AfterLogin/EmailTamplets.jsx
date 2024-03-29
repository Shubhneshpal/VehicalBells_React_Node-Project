import React from "react";
import EmailTamTable from "./EmailTamTable";
import { HiPlus } from "react-icons/hi";
import { Link } from "react-router-dom";


const EmailTamplets = ({collapsed}) => {
  return (
    <>
 
      <div className={`app sidebarstyle ${collapsed ? 'maxwidth_content':'main_box'}`}>
        <div className="mainwrapper">
          <div className="Dash_block div_add">
            <div className="contents1 d-flex justify-content-between align-items-start">
              <h4> Email Templates </h4>
              <Link className="btn small_btn" to={"/createemail"}>
                <HiPlus /> Create Tamplate
              </Link>
            </div>
            <div className="table_content">
              <EmailTamTable />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailTamplets;
