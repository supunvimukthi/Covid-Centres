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
import React, { useEffect, useState } from "react";
// react plugin used to create charts
import { Line, Pie } from "react-chartjs-2";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";
import {
  format,
  formatDistance,
  formatRelative,
  isThisSecond,
  subDays,
} from 'date-fns';

// core components
import {
  dashboard24HoursPerformanceChart,
  dashboardEmailStatisticsChart,
  dashboardNASDAQChart,
} from "variables/charts.js";
import { FaBed,FaBuilding } from "react-icons/fa";
import { Button } from "bootstrap";


async function getData() {
  // console.log(data)
  return fetch('http://ec2-54-77-11-148.eu-west-1.compute.amazonaws.com:5100/v1/covid/centres', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-tokens': JSON.parse(localStorage.getItem('token')), 
    }
  })
    .then(data => data.json()).catch((e)=>console.log(e))
 }

function Dashboard() {
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const [centres,setCentres] = useState([]);
  const [updated,setUpdated] = useState();
  const [pass,setPass] = useState("password");
  
  useEffect( async()=>{
    var log = await getData();
    console.log(log)
    setCentres(log['results'])
    setUpdated(new Date())
    console.log(centres)
    // var data=JSON.parse(localStorage.getItem('data'))
    // setLocation(data['location']+' - '+data['province'])
    // setName(data['name'])
  },[])

  return (
    <>
      <div className="content">
        <Row>
          <Col lg="6" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <FaBed color="black"></FaBed>
                      {/* <i className="nc-icon nc-globe text-warning" > */}
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Available Beds</p>
                      <CardTitle tag="p">{centres.map(x=>x['beds']!='not updated'?x['beds']:0).reduce((a, b) => a + b, 0)}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="fas fa-sync-alt" /> Updated {updated?updated.toTimeString():''} 
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="6" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <FaBuilding></FaBuilding>
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Covid Centres</p>
                      <CardTitle tag="p">{centres.length}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="far fa-calendar" /> Updated {updated?updated.toTimeString():''} 
                </div>
              </CardFooter>
            </Card>
          </Col>
          {/* <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-vector text-danger" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Errors</p>
                      <CardTitle tag="p">23</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="far fa-clock" /> In the last hour
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-favourite-28 text-primary" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Followers</p>
                      <CardTitle tag="p">+45K</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="fas fa-sync-alt" /> Update now
                </div>
              </CardFooter>
            </Card>
          </Col> */}
        </Row>
        <Row>
        <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Available Beds in Covid Centres</CardTitle>
                <p className="card-category">
                  This table shows the latest available bed count in each covid centre in Sri Lanka
                </p>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Name</th>
                      <th>Location</th>
                      <th>Available Beds</th>
                      <th>Updated at</th>
                      <th>Notes</th>
                      <th >username</th>
                      <th >password</th>
                    </tr>
                  </thead>
                  <tbody>
                   {centres.map(x=>
                    <tr key={x['username']}>
                    <td>{x['name']}</td>
                    <td>{x['location']} - {x['province']}</td>
                    <td>{x['beds']}</td>
                    <td>{x['updated']?formatDistance(new Date(x['updated']),new Date(), { addSuffix: true }):''}</td>
                    <td>{x['desc']}</td>
                    <td >{x['username']}</td>
                    <td ><input  type={pass} id={x['username']} type="password" value={x['password']}></input><button><span onClick={()=>{
                      var elm=document.getElementById(x['username'])
                      if(elm.type=="password"){
                        elm.type="text"
                      }else{
                        elm.type="password"
                      }
                      // console.log(elm.type/)
                    }} toggle="#password-field" class="fa fa-fw fa-eye field-icon toggle-password"></span></button></td>
                  </tr>
                  ) }
                   
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {/* <Row>
          <Col md="4">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">Email Statistics</CardTitle>
                <p className="card-category">Last Campaign Performance</p>
              </CardHeader>
              <CardBody style={{ height: "266px" }}>
                <Pie
                  data={dashboardEmailStatisticsChart.data}
                  options={dashboardEmailStatisticsChart.options}
                />
              </CardBody>
              <CardFooter>
                <div className="legend">
                  <i className="fa fa-circle text-primary" /> Opened{" "}
                  <i className="fa fa-circle text-warning" /> Read{" "}
                  <i className="fa fa-circle text-danger" /> Deleted{" "}
                  <i className="fa fa-circle text-gray" /> Unopened
                </div>
                <hr />
                <div className="stats">
                  <i className="fa fa-calendar" /> Number of emails sent
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col md="8">
            <Card className="card-chart">
              <CardHeader>
                <CardTitle tag="h5">NASDAQ: AAPL</CardTitle>
                <p className="card-category">Line Chart with Points</p>
              </CardHeader>
              <CardBody>
                <Line
                  data={dashboardNASDAQChart.data}
                  options={dashboardNASDAQChart.options}
                  width={400}
                  height={100}
                />
              </CardBody>
              <CardFooter>
                <div className="chart-legend">
                  <i className="fa fa-circle text-info" /> Tesla Model S{" "}
                  <i className="fa fa-circle text-warning" /> BMW 5 Series
                </div>
                <hr />
                <div className="card-stats">
                  <i className="fa fa-check" /> Data information certified
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row> */}
      </div>
    </>
  );
}

export default Dashboard;
