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
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import { Route, Switch, useLocation } from "react-router-dom";

import DemoNavbar from "components/Navbars/DemoNavbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";
import LoadingOverlay from 'react-loading-overlay';

import routes from "routes.js";

var ps;

function Dashboard(props) {
  var active =false

  function setActive(param) {
    active=param
   
  }
  const [backgroundColor, setBackgroundColor] = React.useState("black");
  const [activeColor, setActiveColor] = React.useState("info");
  const [route, setRoute] = React.useState([]);
  // const [active, setActive] = React.useState(false);
  const mainPanel = React.useRef();
  const location = useLocation();
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.body.classList.toggle("perfect-scrollbar-on");
      }
    };
  });
  React.useEffect(() => {

    if(props.user=='admin_dash'){

      setRoute(routes?routes.filter(x=>x.path=='/dashboard'):routes)

    }else if(props.user=='admin'){
      setRoute(routes?routes.filter(x=>x.path!='/update'):routes)
    }else{
      setRoute(routes?routes.filter(x=>x.path=='/update'):routes)

    }

    mainPanel.current.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [location]);
  const handleActiveClick = (color) => {
    setActiveColor(color);
  };
  const handleBgClick = (color) => {
    setBackgroundColor(color);
  };
  return (
    <LoadingOverlay
    active={active}
    spinner={true}
    text='Loading ...'
  >

    <div className="wrapper">
      <Sidebar
        {...props}
        routes={route}
        bgColor={backgroundColor}
        activeColor={activeColor}
      />
      <div className="main-panel" ref={mainPanel}>
        <DemoNavbar {...props} />
        <Switch>
          {route.map((prop, key) => {
            return (
              <Route
                path={prop.layout + prop.path}
                component={() => <prop.component user={props.user} setActive={setActive} />}
                key={key}
                
              />
            );
          })}
        </Switch>
        <Footer fluid/>
      </div>
      {/* <FixedPlugin
        bgColor={backgroundColor}
        activeColor={activeColor}
        handleActiveClick={handleActiveClick}
        handleBgClick={handleBgClick}
      /> */}
    </div></LoadingOverlay>
  );
}

export default Dashboard;
