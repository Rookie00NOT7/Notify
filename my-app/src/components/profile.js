import React,{ Component } from 'react';
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button,
} from 'reactstrap';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// import axios from 'axios'
import axios, * as others from 'axios';
import {BrowserRouter as Router,Route,
    Redirect} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';


class Profile extends Component {
  constructor(props){
    super(props);
    this.userData = JSON.parse(localStorage.getItem('token')).userData;
    this.authData = JSON.parse(localStorage.getItem('token')).authData;
    this.state = {
    value: '',
    type:'',
    email:'',
    phoneNumber:'',
    userName:'',
    courses:'',
    view:false,
    login:false,
    send:false
  };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleCoursesChange = this.handleCoursesChange.bind(this);
    this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete= this.handleDelete.bind(this);
    this.handleView= this.handleView.bind(this);
    this.handleSend= this.handleSend.bind(this);

  }

   async componentDidMount() {
    let response;
    try{
        response = await axios.get(`http://localhost:5000/api/v1/users/get/${this.userData.userId}`, {headers : { Authorization: this.authData }})
      }catch(ex){}
    this.setState({userName:response.data.data.data.userName}) 
    this.setState({email:response.data.data.data.email})
    this.setState({phoneNumber:response.data.data.data.phoneNumber})
    this.setState({type:response.data.data.data.type})
    this.setState({courses:response.data.data.data.courses})
  }

  handleEmailChange(e)  {
    this.setState({email: e.target.value});
 }
 handleUserNameChange(e)  {
    this.setState({userName: e.target.value});
  }
  handleTypeChange(e)  {
    this.setState({type: e.target.value});
  }
  handleCoursesChange(e)  {
    this.setState({courses: e.target.value});
  }
  handlePhoneNumberChange(e)
  {
    this.setState({phoneNumber: e.target.value});
  }
  handleView(e)
  {
    this.setState({view:true});
  }
  handleSend(e)
  {
    this.setState({send:true});
  }
    async handleSubmit (e) {
      e.preventDefault();
      if(this.state.userName!==''&&this.state.email!==''&&this.state.phoneNumber!==''&&
        this.state.type!==''&&this.state.courses!=='')
        {
          const response=await axios.post('http://localhost:5000/api/v1/users/edit/'+this.userData.userId,{
        "user":{
          "userName": this.state.userName,
          "email":this.state.email,
          "phoneNumber":this.state.phoneNumber,
          "type":this.state.type,
          "courses":this.state.courses.toString().toUpperCase().split(',')
        }
      }, {headers : { Authorization: this.authData }})
            if(response.data.error)
            {
                console.log(response.data.error)
            alert("Email or phone Number already registered")
            }
            else
            {
            alert("Done Sucessfully")         
            }
        }
        else

        {
          alert("Please Fill required fields")
        }
    }
    async handleDelete (e) {
        e.preventDefault();
            await axios.post('http://localhost:5000/api/v1/users/delete/'+this.userData.userId, {headers : { Authorization: this.authData }})
              alert("Deleted Sucessfully")         
          }


  render() {
    if(this.state.view)
        return <Redirect to="/view"/>
    if(this.state.send)
        return <Redirect to="/sendNotification"/>

    return (
    
      <Container className="App">
        <AppBar position="static">
        <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
            </IconButton>
  
         <Button color="inherits" onClick={this.handleSend}>Send </Button>
         <Button color="inherits" onClick={this.handleView}>View</Button>
        </Toolbar>
        </AppBar>
        <div style={{marginTop:"30px"}}>
        <Typography variant="h6" >
            Profile
            </Typography>
        <Form className="form">
          <Col>
            <FormGroup>
              <Label>User Name</Label>
              <Input
                type="text"
                name="name"
                placeholder={this.state.userName}
                value={this.state.userName}
                onChange={this.handleUserNameChange}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label >Email</Label>
              <Input
                type="email"
                name="email"
                placeholder={this.state.email}
                value={this.state.email}
                onChange={this.handleEmailChange}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label >Phone Number</Label>
              <Input
                type="text"
                name="phone number"
                placeholder={this.state.phoneNumber}
                value={this.state.phoneNumber}
                onChange={this.handlePhoneNumberChange}
              />
            </FormGroup>
          </Col>
          <Col>
          <FormControl variant="outlined" fullWidth>
          <Label >Type</Label>
          <Select onChange={this.handleTypeChange} value={this.state.type}>
            <MenuItem value={"Student"}>Student</MenuItem>
            <MenuItem value={"TA"}>TA</MenuItem>
            <MenuItem value={"Dr"}>Dr</MenuItem>
          </Select>
        </FormControl>
        </Col>
          <Col>
            <FormGroup>
              <Label >Courses</Label>
              <Input
                type="text"
                name="courses"
                placeholder={this.state.courses}
                onChange={this.handleCoursesChange}
                value={this.state.courses}
              />
            </FormGroup>
          </Col>
          <div style={{float:"left",paddingLeft:"450px"}}>
          <Button
            variant="contained"
            color="secondary"
            onClick={this.handleDelete}
          >
          Delete
         </Button>
         </div>
         <div style={{float:"right", paddingRight:"450px"}}>
         <Button
        variant="contained"
        color="primary"
        onClick={this.handleSubmit}
      >
        Save
        </Button>
        </div>
        </Form>
        </div>
      </Container>
    );
  }
  
}


export default Profile;
