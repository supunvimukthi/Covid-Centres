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
import NotificationAlert from "react-notification-alert";
// reactstrap components
import { Card, CardHeader, CardBody, CardTitle, Row, Col, Table } from "reactstrap";
import {
  format,
  formatDistance,
  formatRelative,
  isThisSecond,
  subDays,
} from 'date-fns';
import LoadingOverlay from 'react-loading-overlay';




function Icons(props) {

  const notificationAlert = React.useRef();
  const notify = (place, text, color) => {
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

  async function getCentresData() {

    return fetch(' http://203.94.76.62:5100/v1/covid/centres', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-tokens': JSON.parse(localStorage.getItem('token')),
      }
    })
      .then(data => data.json()).catch((e) => console.log(e))
  }

  async function submitData(data) {

    return fetch(' http://203.94.76.62:5100/v1/covid/centre/bed', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-tokens': JSON.parse(localStorage.getItem('token')),
      },
      body: JSON.stringify({
        'beds': Number(data['beds']),
        'time': new Date().getTime(),
        'desc': data['note'],
        'username': centre['username']

      })
    })
      .then(data => data.json()).catch((e) => notify('bc', String(e), 3))
  }

  async function getData(username) {

    return fetch(' http://203.94.76.62:5100/v1/covid/centre/beds', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-tokens': JSON.parse(localStorage.getItem('token')),
      },
      body: JSON.stringify({
        'username': username

      })
    })
      .then(data => data.json()).catch((e) => notify('bc', String(e), 3))
  }


  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [beds, setBeds] = useState();
  const [note, setNote] = useState("");
  const [logs, setLogs] = useState([]);
  const [centre, setCentre] = useState();
  const [centres, setCentres] = useState([]);

  const handleSubmit = async e => {
    e.preventDefault();

    const token = await submitData({
      beds,
      note
    });
    if (('error' in token) && token['error'] == 'Signature has expired') {
      localStorage.clear()
      window.location.pathname = 'login'
    }
    if ('error' in token) {
      notify('bc', token['error'], 3)
    } else {
      notify('bc', token['results'], 2)
    }

    props.setActive(true)
    var log = await getData(centre['username']);
    if (('error' in log) && log['error'] == 'Signature has expired') {
      localStorage.clear()
      window.location.pathname = 'login'
    }
    props.setActive(false)
    setLogs(log['results'].reverse())
    setBeds(0)
    setNote("")

  }

  useEffect(async () => {
    props.setActive(true)
    getCentresData().then((cents) => {
      if (('error' in cents) && cents['error'] == 'Signature has expired') {
        localStorage.clear()
        window.location.pathname = 'login'
      }

      setCentres(cents['results'])
      setCentre(cents['results'][1])

      getData(cents['results'][1]['username']).then(log => {
        
        props.setActive(false)

        setLogs(log['results'].reverse())
      })

    })




  }, [])

  return (
    <>

      <div className="content">
        <NotificationAlert ref={notificationAlert} />


          <Row>
            <Col md="12">
              <Card className="demo-icons">
                <CardHeader>
                  <CardTitle tag="h5">Update available beds for {centre ? centre['name'] : ''} in {(centre ? centre['location'] : '') + ' - ' + (centre ? centre['province'] : '')}</CardTitle>
                  {/* <p className="card-category">
                  Handcrafted by our friends from{" "}
                  <a href="https://nucleoapp.com/?ref=1712">NucleoApp</a>
                </p> */}
                </CardHeader>
                <CardBody className="all-icons">
                  <div class="row">

                    <div class="col-md-12">
                      <div class="form-group"><label for="exampleForm.ControlSelect1" class="form-label">Select Covid Centre</label>
                        <select value={centre ? centre['name'] : ''} onChange={e => {
                          props.setActive(true)
                          setCentre(centres.find(x => x['name'] == e.target.value))
                          getData(centres.find(x => x['name'] == e.target.value)['username']).then(log => {
                            if (('error' in log) && log['error'] == 'Signature has expired') {
                              localStorage.clear()
                              window.location.pathname = 'login'
                            }
                            props.setActive(false)
                            setLogs(log['results'].reverse())
                          })

                        }} id="exampleForm.ControlSelect1" class="form-control">
                          {centres.map(x => <option>{x['name']}</option>)}
                        </select></div>
                      <div class="form-group"><label for="exampleForm.ControlInput1" class="form-label">Available Beds</label>
                        <input value={beds} onChange={e => setBeds(e.target.value)} placeholder="Number of beds available" type="number" id="exampleForm.ControlInput1" class="form-control" /></div>

                      <div class="form-group">
                        <label for="exampleForm.ControlTextarea1" class="form-label">Additional Note</label>
                        <textarea value={note} onChange={e => setNote(e.target.value)} rows="3" id="exampleForm.ControlTextarea1" class="form-control"></textarea>
                        <button onClick={handleSubmit} type="button" class="btn btn-primary">Submit</button>
                      </div>
                    </div>
                  </div>

                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Past Data Logs</CardTitle>
                  <p className="card-category">
                    This table shows data updates in the past
                </p>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Updated at</th>
                        <th >Number of beds</th>
                        <th >Note</th>
                      </tr>
                    </thead>
                    <tbody>

                      {logs.map(x =>
                        <tr>
                          <td>{formatRelative(new Date(x['time']), new Date())}</td>
                          <td >{x['beds']}</td>
                          <td >{x['desc']}</td>

                        </tr>
                      )}


                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>

      </div>
    </>
  );
}

export default Icons;
