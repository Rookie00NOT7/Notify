import React, { Component } from 'react';
import './viewAllNotif.css';
import axios from 'axios';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {
    Container,
    Button
  } from 'reactstrap';
import {BrowserRouter as Router,Route,
    Redirect} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

class viewAllNotif extends Component {
    constructor(props) {
        super(props);
        this.userData = JSON.parse(localStorage.getItem('token')).userData;
        this.authData = JSON.parse(localStorage.getItem('token')).authData;
        this.state = {
            notifications: [],
            send:false,
            profile:false
        };
        this.handleSend= this.handleSend.bind(this);
        this.handleProfile= this.handleProfile.bind(this);
    }
    handleSend(e)
  {
    this.setState({send:true});
  }

  handleProfile(e)
  {
    this.setState({profile:true});
  }

    async componentDidMount() {
        let logs = await axios.get(`http://localhost:5000/api/v1/notifications/viewNotification/${this.userData.userId}`,{headers : { Authorization: this.authData }})
        console.log(logs)
            this.setState({notifications: logs.data.map((notif, index) => {
                const {_id,to, subject, text, type,createdAt} = notif //destructuring
                return (
                   <tr key={_id}>
                     <td> {to.map((val,index)=>{return   <tr key={index}>{val}</tr>  })}</td>
                      <td>{subject}</td>
                      <td>{text}</td>
                      <td>{type}</td>
                      <td>{createdAt}</td>
                   </tr>
                )
             }
        )
            })
    }

    render() {
        if(this.state.send)
          return <Redirect to="/sendNotification"/>
        if(this.state.profile)
          return <Redirect to="/profile"/>
        return (
            <Container className="App">
            <AppBar position="static">
        <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
            </IconButton>
        <Button color="inherits" onClick={this.handleProfile}> Profile </Button>
        <Button color="inherits" onClick={this.handleSend}>Send </Button>
        </Toolbar>
        </AppBar>
        <div style={{marginTop:"30px"}}>
                <h1 id='title'>Your Notifications</h1>
                <table id='notifs'>
               <tbody>
                  <th>TO</th>
                  <th>SUBJECT</th>
                  <th>TEXT</th>
                  <th>TYPE</th>
                  <th>SENT AT</th>
                  {this.state.notifications}
               </tbody>
            </table>
            </div>
            </Container>
        )
    }
}

export default viewAllNotif;
