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
/*eslint-disable*/
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import React, { useEffect, useState } from "react";
// react plugin for creating notifications over the dashboard
import NotificationAlert from "react-notification-alert";
// reactstrap components
import {
  UncontrolledAlert,
  Alert,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";


async function submitData(data) {
  console.log(data)
  return fetch('http://ec2-54-77-11-148.eu-west-1.compute.amazonaws.com:5100/v1/covid/centre', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-tokens': JSON.parse(localStorage.getItem('token')), 
    },
    body:JSON.stringify({
      'name':data['name'],
      'district':data['district'],
      'province': data['province'],
      'contact': data['contact'],
      'username':data['username'],
      'password':data['password']
    })
  })
    .then(data => data.json()).catch((e)=>notify('bc',String(e),3))
 }

function Notifications() {
  const notificationAlert = React.useRef();
  const notify = (place,text,color) => {
    // var color = Math.floor(Math.random() * 5 + 1);
    var type;
    switch (color) {
      case 1:
        type = "primary";
        break;
      case 2:
        type = "success";
        break;
      case 3:
        type = "danger";
        break;
      case 4:
        type = "warning";
        break;
      case 5:
        type = "info";
        break;
      default:
        break;
    }
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>
            {text}
          </div>
        </div>
      ),
      type: type,
      icon: "nc-icon nc-bell-55",
      autoDismiss: 7,
    };
    notificationAlert.current.notificationAlert(options);
  };
  const [name, setName] = useState();
  const [province, setProvince] = useState("Northern");
  const [district, setDistrict] = useState();
  const [contact, setContact] = useState("");
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const dist_prov = {
    "Western":["Gampaha","Colombo","Kaluthara"],
    "Northern": ["Jaffna","Kilinochchi","Mannar","Mulativ","Vavuniya"],
    "North Western":["Puttalam","Kurunegala"],
    "North Central":["Anuradhapura","Polonnaruwa"],
    "Central":["Matale","Kandy","Nuwara Eliya"],
    "Sabaragamuwa":["Kegalle","Ratnapura"],
    "Eastern":["Trincomalee","Batticaloa","Ampara"],
    "Uva":["Badulla","Monaragala"],
    "Southern":["Galle","Matara","Hambanthota"],
  }

  const prov_dist = {"Gampaha":"Western","Colombo":"Western","Kaluthara":"Western","Jaffna":"Northern","Kilinochchi":"Northern","Mannar":"Northern","Mulativ":"Northern","Vavuniya":"Northern","Puttalam":"North Western","Kurunegala":"North Western","Anuradhapura":"North Central","Polonnaruwa":"North Central","Matale":"Central","Kandy":"Central","Nuwara Eliya":"Central","Kegalle":"Sabaragamuwa","Ratnapura":"Sabaragamuwa","Trincomalee":"Eastern","Batticaloa":"Eastern","Ampara":"Eastern","Badulla":"Uva","Monaragala":"Uva","Galle":"Southern","Matara":"Southern","Hambanthota":"Southern"}
  const dists=["Gampaha", "Colombo", "Kaluthara", "Jaffna", "Kilinochchi", "Mannar", "Mulativ", "Vavuniya", "Puttalam", "Kurunegala", "Anuradhapura", "Polonnaruwa", "Matale", "Kandy", "Nuwara Eliya", "Kegalle", "Ratnapura", "Trincomalee", "Batticaloa", "Ampara", "Badulla", "Monaragala", "Galle", "Matara", "Hambanthota"]
  
  const handleSubmit = async e => {
    e.preventDefault();
    console.log(username,province)
    if(!name || !district || !province || !username || !password ){
      notify('bc','Empty Fields are not allowed (except contact)',3)
      return;
    }
    const token = await submitData({
      name,
      province,
      district,
      contact,
      username,
      password
    });

    if('error' in token){
      notify('bc',token['error'],3)
    }else{
      setName('')
      setContact(0)
      setUsername('')
      setPassword('')

      notify('bc',token['message'],2)
    }
    


    
  }

  return (
    <>
      <div className="content">
        <NotificationAlert ref={notificationAlert} />
        <Row>
          <Col md="12">
            <Card className="demo-icons">
              <CardHeader>
                <CardTitle tag="h5">New Covid Centre</CardTitle>
                {/* <p className="card-category">
                  Handcrafted by our friends from{" "}
                  <a href="https://nucleoapp.com/?ref=1712">NucleoApp</a>
                </p> */}
              </CardHeader>
              <CardBody className="all-icons">
                <div class="row">

                  <div class="col-md-12">
                    <div class="form-group"><label for="exampleForm.ControlInput1" class="form-label">Name<b>*</b></label>
                      <input value={name} onChange={e => setName(e.target.value)} placeholder="Name of the Covid centre" type="text" id="exampleForm.ControlInput1" class="form-control" /></div>
                    <div class="form-group"><label for="exampleForm.ControlSelect1" class="form-label">Select Province<b>*</b></label>
                      <select value={province} onChange={e => setProvince(e.target.value)} id="exampleForm.ControlSelect1" class="form-control">
                        <option>Northern</option>
                        <option>North Western</option>
                        <option>Western</option>
                        <option>North Central</option>
                        <option>Central</option>
                        <option>Sabaragamuwa</option>
                        <option>Eastern</option>
                        <option>Uva</option>
                        <option>Southern</option>
                      </select></div>
                    <div class="form-group"><label for="exampleForm.ControlSelect1" class="form-label">Select District<b>*</b></label>
                      <select value={district} onChange={e => setDistrict(e.target.value)} id="exampleForm.ControlSelect1" class="form-control">
                        {!province?dists.map(x=><option>{x}</option>):dist_prov[province].map(x=><option>{x}</option>)}
    
                      </select></div>
                      <div class="form-group"><label for="exampleForm.ControlInput1" class="form-label">Contact Number</label>
                      <input value={contact} onChange={e => setContact(e.target.value)} placeholder="Contact Number for the covid centre" type="text" id="exampleForm.ControlInput1" class="form-control" /></div>  
                    <div class="form-group"><label for="exampleForm.ControlInput1" class="form-label">Username<b>*</b></label>
                      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username for the covid centre" type="text" id="exampleForm.ControlInput1" class="form-control" /></div>           
                    <div class="form-group"><label for="exampleForm.ControlInput1" class="form-label">Password<b>*</b></label>
                      <input value={password} onChange={e => setPassword(e.target.value)} placeholder="password for the covid centre" type="text" id="exampleForm.ControlInput1" class="form-control" /></div>
                    <div class="form-group">
                      <button onClick={handleSubmit} type="button" class="btn btn-primary">Submit</button>
                    </div>
                  </div>
                </div>

              </CardBody>
            </Card>
          </Col>
        </Row>
        {/* <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">Notifications</CardTitle>
                <p className="card-category">
                  Handcrafted by our former colleague{" "}
                  <a
                    target="_blank"
                    href="https://www.instagram.com/manu.nazare/"
                  >
                    Nazare Emanuel-Ioan (Manu)
                  </a>
                  . Please checkout the{" "}
                  <a
                    href="https://github.com/creativetimofficial/react-notification-alert"
                    target="_blank"
                  >
                    full documentation.
                  </a>
                </p>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md="6">
                    <Card className="card-plain">
                      <CardHeader>
                        <CardTitle tag="h5">Notifications Style</CardTitle>
                      </CardHeader>
                      <CardBody>
                        <Alert color="info">
                          <span>This is a plain notification</span>
                        </Alert>
                        <UncontrolledAlert color="info" fade={false}>
                          <span>This is a notification with close button.</span>
                        </UncontrolledAlert>
                        <UncontrolledAlert
                          className="alert-with-icon"
                          color="info"
                          fade={false}
                        >
                          <span
                            data-notify="icon"
                            className="nc-icon nc-bell-55"
                          />
                          <span data-notify="message">
                            This is a notification with close button and icon.
                          </span>
                        </UncontrolledAlert>
                        <UncontrolledAlert
                          className="alert-with-icon"
                          color="info"
                          fade={false}
                        >
                          <span
                            data-notify="icon"
                            className="nc-icon nc-chart-pie-36"
                          />
                          <span data-notify="message">
                            This is a notification with close button and icon
                            and have many lines. You can see that the icon and
                            the close button are always vertically aligned. This
                            is a beautiful notification. So you don't have to
                            worry about the style.
                          </span>
                        </UncontrolledAlert>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col md="6">
                    <Card className="card-plain">
                      <CardHeader>
                        <CardTitle tag="h5">Notification states</CardTitle>
                      </CardHeader>
                      <CardBody>
                        <UncontrolledAlert color="primary" fade={false}>
                          <span>
                            <b>Primary - </b>
                            This is a regular notification made with
                            color="primary"
                          </span>
                        </UncontrolledAlert>
                        <UncontrolledAlert color="info" fade={false}>
                          <span>
                            <b>Info - </b>
                            This is a regular notification made with
                            color="info"
                          </span>
                        </UncontrolledAlert>
                        <UncontrolledAlert color="success" fade={false}>
                          <span>
                            <b>Success - </b>
                            This is a regular notification made with
                            color="success"
                          </span>
                        </UncontrolledAlert>
                        <UncontrolledAlert color="warning" fade={false}>
                          <span>
                            <b>Warning - </b>
                            This is a regular notification made with
                            color="warning"
                          </span>
                        </UncontrolledAlert>
                        <UncontrolledAlert color="danger" fade={false}>
                          <span>
                            <b>Danger - </b>
                            This is a regular notification made with
                            color="danger"
                          </span>
                        </UncontrolledAlert>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <CardBody>
                <div className="places-buttons">
                  <Row>
                    <Col className="ml-auto mr-auto text-center" md="6">
                      <CardTitle tag="h4">Notifications Places</CardTitle>
                      <p className="category">Click to view notifications</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="ml-auto mr-auto" lg="8">
                      <Row>
                        <Col md="4">
                          <Button
                            block
                            color="primary"
                            onClick={() => notify("tl")}
                          >
                            Top Left
                          </Button>
                        </Col>
                        <Col md="4">
                          <Button
                            block
                            color="primary"
                            onClick={() => notify("tc")}
                          >
                            Top Center
                          </Button>
                        </Col>
                        <Col md="4">
                          <Button
                            block
                            color="primary"
                            onClick={() => notify("tr")}
                          >
                            Top Right
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="ml-auto mr-auto" lg="8">
                      <Row>
                        <Col md="4">
                          <Button
                            block
                            color="primary"
                            onClick={() => notify("bl")}
                          >
                            Bottom Left
                          </Button>
                        </Col>
                        <Col md="4">
                          <Button
                            block
                            color="primary"
                            onClick={() => notify("bc")}
                          >
                            Bottom Center
                          </Button>
                        </Col>
                        <Col md="4">
                          <Button
                            block
                            color="primary"
                            onClick={() => notify("br")}
                          >
                            Bottom Right
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row> */}
      </div>
    </>
  );
}

export default Notifications;
