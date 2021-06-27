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
  Button
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
import { FaBed,FaBuilding, FaSort, } from "react-icons/fa";
import SmartDataTable from 'react-smart-data-table'


async function getData() {

  return fetch(' http://203.94.76.62:5100/v1/covid/centres', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-tokens': JSON.parse(localStorage.getItem('token')), 
    }
  })
    .then(data => data.json()).catch((e)=>console.log(e))
 }

function Dashboard(props) {
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const [centres,setCentres] = useState([]);
  const [updated,setUpdated] = useState();
  const [fullCentres,setfullCentres] = useState();
  const [pass,setPass] = useState("password");
  
  useEffect( async()=>{
    var log = await getData();
    if (('error' in log) && log['error'] == 'Signature has expired') {
      localStorage.clear()
      window.location.pathname = 'login'
    }

    setCentres(log['results'])
    setfullCentres(log['results'])
    setUpdated(new Date())

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
                      <th>Name<Button style={{float:'right',marginRight:'20%'}} size="sm" ><span onClick={()=>{
                      fullCentres.sort((a,b)=>a['name'].localeCompare(b['name']))
                      
                      setCentres(JSON.parse(JSON.stringify(fullCentres))) 
                    }} toggle="#password-field" class="fa fa-fw fa-sort field-icon"></span></Button></th>
                      <th>Location<Button style={{float:'right',marginRight:'20%'}} size="sm" ><span onClick={()=>{
                      fullCentres.sort((a,b)=>a['location'].localeCompare(b['location']))
                      
                      setCentres(JSON.parse(JSON.stringify(fullCentres))) 
                    }} toggle="#password-field" class="fa fa-fw fa-sort field-icon"></span></Button></th>
                      <th>Available Beds</th>
                      <th>Updated at</th>
                      <th>Notes</th>
                      {props.user!='admin_dash'&&<th >username</th>}
                      {props.user!='admin_dash'&&<th >password</th>}
                      {props.user!='admin_dash'&&<th >remove</th>}
                    </tr>
                  </thead>
                  <tbody>
                  <tr key='search'>
                    <td><input placeholder='search by name' onChange={(e)=>{
            
                      setCentres(fullCentres.filter(x=>x['name'].toLowerCase().includes(e.target.value))) 
                    }}></input></td>
                    <td><input placeholder='search by location' onChange={(e)=>{
                      setCentres(fullCentres.filter(x=>x['location'].toLowerCase().includes(e.target.value))) 
                    }}></input></td>
                    <td><input type='number' placeholder='search by beds' onChange={(e)=>{
                      e.target.value==''?setCentres(fullCentres):
                     setCentres(fullCentres.filter(x=>x['beds']!='not updated').filter(x=>(Number(e.target.value)-10) < x['beds'] && x['beds']< (Number(e.target.value)+10))) 
                    }}></input></td>
                    <td></td>
                    <td></td>
                  </tr>
                   {centres.map(x=>
                    <tr key={x['username']}>
                    <td>{x['name']}</td>
                    <td>{x['location']} - {x['province']}</td>
                    <td>{x['beds']}</td>
                    <td>{x['updated']?formatDistance(new Date(x['updated']),new Date(), { addSuffix: true }):''}</td>
                    <td>{x['desc']}</td>
                    {props.user!='admin_dash'&&<td >{x['username']}</td>}
                    {props.user!='admin_dash'&&<td ><input  type={pass} id={x['username']} type="password" value={x['password']}></input><Button size="sm"><span onClick={()=>{
                      var elm=document.getElementById(x['username'])
                      if(elm.type=="password"){
                        elm.type="text"
                      }else{
                        elm.type="password"
                      }
 
                    }} toggle="#password-field" class="fa fa-fw fa-eye field-icon toggle-password"></span></Button></td>}
                    {props.user!='admin_dash'&&<td><Button size="sm"><span onClick={()=>{
                        fetch(' http://203.94.76.62:5100/v1/covid/centre/delete', {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                            'x-access-tokens': JSON.parse(localStorage.getItem('token')), 
                          },
                          body:JSON.stringify({"username":x['username']})
                        })
                          .then(async(data) => {
                            var log = await getData();
                            if (('error' in log) && log['error'] == 'Signature has expired') {
                              localStorage.clear()
                              window.location.pathname = 'login'
                            }
                         
                            setCentres(log['results'])
                            setfullCentres(log['results'])
                            setUpdated(new Date())
            
                          }).catch((e)=>console.log(e))
                    }} toggle="#password-field" class="fa fa-fw fa-trash field-icon"></span></Button></td>}
                  </tr> // http://203.94.76.62
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
