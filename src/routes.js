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
import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import TableList from "views/Tables.js";


var routes = [
  {
    path: "/update",
    name: "Update Beds",
    icon: "nc-icon nc-share-66",
    component: Icons,
    layout: "/admin",
  },
  {
    path: "/dashboard",
    name: "Covid Centres",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",
  },
 
  {
    path: "/add",
    name: "Add Covid Centre",
    icon: "nc-icon nc-simple-add",
    component: Notifications,
    layout: "/admin",
  },
  {
    path: "/updatebeds",
    name: "Update Beds",
    icon: "nc-icon nc-share-66",
    component: TableList,
    layout: "/admin",
  },
];
export default routes;
