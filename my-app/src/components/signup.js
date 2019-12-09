import React,{ Component } from 'react';
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button,
} from 'reactstrap';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios'
import {BrowserRouter as Router,Route,
    Redirect} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

class Signup extends Component {
  constructor(props){
    super(props);
    this.state = {
    value: '',
    type:'',
    email:'',
    phoneNumber:'',
    userName:'',
    courses:'',
    password:'',
    login:false
  };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleCoursesChange = this.handleCoursesChange.bind(this);
    this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    
  }
  handleEmailChange(e)  {
    this.setState({email: e.target.value});
 }
 handlePasswordChange(e) {
    this.setState({password: e.target.value});
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
  handleLogin(e)
  {
    this.setState({login:true})  
  }
    async handleSubmit (e) {
      e.preventDefault();
      if(this.state.userName!==''&&this.state.email!==''&&this.state.phoneNumber!==''&&
        this.state.type!==''&&this.state.password!==''&&this.state.courses!=='')
        {
          const response=await axios.post('http://localhost:5000/api/v1/users/create',{
        "user":{
          "userName": this.state.userName,
          "email":this.state.email,
          "phoneNumber":this.state.phoneNumber,
          "type":this.state.type,
          "password":this.state.password,
          "courses":this.state.courses.toUpperCase().split(",")
        }
      })
        if(response.data.error)
        {
          alert("Email or phone Number already registered")
        }
        else
        {
          alert("Signed up Sucessfully")
          this.setState({login:true})  
          localStorage.setItem('id', response.data.data.user.id)
         
       }
        }
        else

        {
          alert("Please Fill required fields")
        }
      
     
      
    }
   
  render() {
      if(this.state.login)
      {
          console.log(this.state.login)
          return <Redirect to="/login"/>
      }
            
    return (
      <Container className="App">
           <AppBar position="static">
        <Toolbar>
         <Button 
         color="inherits"
         onClick={this.handleLogin}
         >
             Login
        </Button>
        </Toolbar>
        </AppBar>
        <div style={{marginTop:"30px"}}>
        <Typography variant="h6" >
            Sign up
        </Typography>
        <Form className="form">
          <Col>
            <FormGroup>
              <Label>User Name</Label>
              <Input
                type="text"
                name="name"
                placeholder="Enter your user name"
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
                placeholder="Please enter a valid email"
                onChange={this.handleEmailChange}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                type="password"
                name="password"
                placeholder="********"
                onChange={this.handlePasswordChange}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label >Phone Number</Label>
              <Input
                type="text"
                name="phone number"
                placeholder="+02XXXXXXXX"
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
                placeholder="Type your cources EX:CSEN501,DMET302"
                onChange={this.handleCoursesChange}
              />
            </FormGroup>
          </Col>
          <Button onClick={this.handleSubmit}>Submit</Button>
        </Form>
        </div>
      </Container>
    );
  }
  
}


export default Signup;
