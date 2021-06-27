

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

    return fetch(' http://203.94.76.62:5100/login', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic '+btoa(credentials['username']+':'+credentials['password']),
      }
    })
      .then(data => data.json()).catch((e)=>console.log('bc','Invalid Login : '+String(e),3))
   }
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    if(!username || !password ){
      notify('bc','Empty fields not allowed',3)
      return;
    }
    const token = await loginUser({
      username,
      password
    });
    if (token){
      if(token['data'].length>0){
        localStorage.setItem('data',JSON.stringify(token['data'][0]))
        setUser(token['data'][0]['username'])
      }else{
        setUser(username)
      }

      notify('bc','Successfully logged in as : '+username ,2)
      setToken(token['token']);
      
    }else{
      console.log('error')
      notify('bc','Invalid Login Credentials',3)
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
