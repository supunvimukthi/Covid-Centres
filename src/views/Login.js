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

import React, { useState } from 'react';

// reactstrap components
import { Card, CardHeader, CardBody, CardTitle, Row, Col, Table } from "reactstrap";
import NotificationAlert from "react-notification-alert";
import PropTypes from 'prop-types';
import { FaThinkPeaks } from 'react-icons/fa';
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'






function Login({setToken, setUser}) {
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

  async function loginUser(credentials) {
    console.log(credentials)
    return fetch('http://ec2-54-77-11-148.eu-west-1.compute.amazonaws.com:5100/login', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic '+btoa(credentials['username']+':'+credentials['password']), 
      }
    })
      .then(data => data.json()).catch((e)=>notify('bc','Invalid Login : '+String(e),3))
   }
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    console.log(username,password)
    if(!username || !password ){
      notify('bc','Empty fields not allowed',3)
      return;
    }
    const token = await loginUser({
      username,
      password
    });
    if (token){
      console.log(token['data'][0]['username'])
      localStorage.setItem('data',JSON.stringify(token['data'][0]))
      setUser(token['data'][0]['username'])
      notify('bc','Successfully logged in as : '+username ,2)
      setToken(token['token']);
      
    }else{
      console.log('error')
      notify('bc','Invalid Login Credentials',3)
      // showToastMessage(5000,'Login Invalid. Please check your login information',ERROR)
    }
    
  }

  

  return (
    <>
      <div className="content" style={{margin:'10% 0'}}>
      <NotificationAlert ref={notificationAlert} />
        <Row style={{alignContent:'center'}}>
          <Col md={{ size: 4, order: 2, offset: 4 }} >
            <Card className="demo-icons">
              <CardHeader>
                <CardTitle tag="h5">Login</CardTitle>
                {/* <p className="card-category">
                  Handcrafted by our friends from{" "}
                  <a href="https://nucleoapp.com/?ref=1712">NucleoApp</a>
                </p> */}
              </CardHeader>
              <CardBody className="all-icons">
                <div class="row">

                  <div class="col-md-12">

                    <div class="form-group"><label for="exampleForm.ControlInput1" class="form-label">Username</label>
                      <input placeholder="Username" onChange={e => setUserName(e.target.value)} type="text" id="exampleForm.ControlInput1" class="form-control" /></div>
                    <div class="form-group"><label for="exampleForm.ControlInput1" class="form-label">Password</label>
                      <input placeholder="Password" onChange={e => setPassword(e.target.value)} type="password" id="exampleForm.ControlInput1" class="form-control" /></div>

                    <div class="form-group">
                      <button type="button" onClick={handleSubmit} class="btn btn-primary">Submit</button>
                    </div>
                  </div>
                </div>

              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}

export default Login;
