/*!

=========================================================
* Paper Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { NavLink } from "react-router-dom";
import { Nav,Button } from "reactstrap";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import { FaBed,FaSignOutAlt } from "react-icons/fa";
import logo from "logo.svg";

var ps;


function Sidebar(props) {
  const logOut=()=>{
    localStorage.clear()
    window.location.pathname='login'
  }

  const sidebar = React.useRef();
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(sidebar.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
    };
  });
  return (
    <div
      className="sidebar"
      data-color={props.bgColor}
      data-active-color={props.activeColor}
    >
      <div className="logo">
        <a
          href=""
          className="simple-text logo-mini"
        >
          <div className="logo-img">
            <img style={{color:'white'}} src="https://www.pat.nhs.uk/Coronavirus/images/Covid%2019%20Icon.png" alt="react-logo" />
          </div>
        </a>
        <a
          href=""
          className="simple-text logo-normal"
        >
          Covid Centres
        </a>
      </div>
      <div className="sidebar-wrapper" ref={sidebar}>
        <Nav>
          {props.routes.map((prop, key) => {
            return (
              <li
                className={
                  activeRoute(prop.path) + (prop.pro ? " active-pro" : "")
                }
                key={key}
              >
                <NavLink
                  to={prop.layout + prop.path}
                  className="nav-link"
                  activeClassName="active"
                >
                  <i className={prop.icon} />
                  <p>{prop.name}</p>
                </NavLink>
              </li>
            );
          })}

        </Nav>
        <li style={{position: 'absolute',
    bottom: '20px',
    width: '100%',
    textAlign: 'center'}} className={"active-pro"}><Button className={"active-pro"} onClick={logOut}><FaSignOutAlt></FaSignOutAlt>     Log Out</Button></li>
      </div>
    </div>
  );
}

export default Sidebar;
