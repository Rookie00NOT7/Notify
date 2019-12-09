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
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

class SendNotification extends Component {
    constructor(props){
      super(props);
      this.userData = JSON.parse(localStorage.getItem('token')).userData;
      this.authData = JSON.parse(localStorage.getItem('token')).authData;
      this.state = {
          type: "",
          courses :[],
          message:"",
          subject:"",
          to:[],
          method:"",
          courseSelected:"",
          methodDisplayed:"",
          profile:false
    };
      this.handleMessage = this.handleMessage.bind(this);
      this.handleSubject = this.handleSubject.bind(this);
      this.handleTypeChange = this.handleTypeChange.bind(this);
      this.handleMethod = this.handleMethod.bind(this);
      this.handleCourse = this.handleCourse.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleProfile = this.handleProfile.bind(this);
    }
   
    async handleTypeChange(e){
          let getCourses = await axios.get(`http://localhost:5000/api/v1/users/getCourses/${this.userData.userId}`,{headers: { Authorization: this.authData }})
          this.setState({
              courses: getCourses.data,
              method:document.get,
              type: e.target.value,
            })
      }

    async handleCourse(e){
        await this.setState({ courseSelected: e.target.value+""})
      }

    handleMethod(e){
      if(e.target.value == "Email")
       { this.setState({method: "email"})}
      else
      { this.setState({method: "sms"})}
      
      this.setState({methodDisplayed: e.target.value})
    }

    handleMessage(e){
      this.setState({message:e.target.value +""})

   }

    handleSubject(e){
     this.setState({subject:e.target.value+""})
    }
    handleProfile(e){
      this.setState({profile:true})
     }

   async handleSubmit(e) {
    e.preventDefault();

    let getReceivers = await axios.post(`http://localhost:5000/api/v1/users/viewUsers`,{
        "courses":this.state.courseSelected,
        "userType": this.state.type
    },{headers: { Authorization: this.authData }})
    this.setState({
        to: getReceivers.data
    })
    
    let sendNotif = await axios.post(`http://localhost:5000/api/v1/notifications/sendNotification/${this.userData.userId}`,{
        "to":this.state.to,
        "type":this.state.method,
        "subject":this.state.subject,
        "text":this.state.message
    },{headers: { Authorization: this.authData }})
    window.alert(sendNotif.data.data.message)
    }
     
    render() {
        let select ;
          if(this.userData.type == "Dr"){
           select =  <Select onChange={this.handleTypeChange} value={this.state.type}>
                        <MenuItem value={"Student"}>Student</MenuItem>
                        <MenuItem value={"TA"}>TA</MenuItem>
                    </Select>
          }
          else{
            if(this.userData.type == "TA"){
                select =  <Select onChange={this.handleTypeChange} value={this.state.type}>
                            <MenuItem value={"Student"}>Student</MenuItem>
                        </Select>
            }
        }
        let subjectCon
        if(this.state.method == "email"){
          subjectCon =<Col>
          <FormGroup>
            <Label >Please enter the subject of the message </Label><br></br>
            <Input  type="text" name="subject" placeholder="Subject goes here." onChange={this.handleSubject} value = {this.state.subject}>
            </Input>
          </FormGroup>
        </Col>
        }
        let coursesI = this.state.courses
        if(this.state.profile)
        return <Redirect to="/profile"/>

        return (
          
        <Container className="App">
          <AppBar position="static">
        <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
            </IconButton>
  
         <Button color="inherits" onClick={this.handleProfile}>Profile </Button>
        </Toolbar>
        </AppBar>
        <div style={{marginTop:"30px"}}>
          <h2>Send Notification</h2><br></br>
          <Form className="form">
            <Col>
            <FormControl variant="outlined" fullWidth>
                <Label >Please select the receipient type </Label><br></br>
                    {select}
        </FormControl>
            </Col>
            <Col>
              <FormGroup>
                <Label >Please select the notification method </Label><br></br>
                <Select onChange={this.handleMethod} value={this.state.methodDisplayed}>
                        <MenuItem value={"Email"}>Email</MenuItem>
                        <MenuItem value={"SMS"}>SMS</MenuItem>
                    </Select>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label >Please select the course </Label><br></br>
                <Select onChange={this.handleCourse} value={this.state.courseSelected}>
                    {coursesI.map((val, index) => { return <MenuItem key = {index}value = {val}>{val}</MenuItem>})}
                </Select>
              </FormGroup>
            </Col>
            {subjectCon}
            <Col>
              <FormGroup>
                <Label >Please enter the message you want to send </Label><br></br>
                <Input  type="text" name="message" placeholder="Message goes here." onChange={this.handleMessage} value = {this.state.message}>
                </Input>
              </FormGroup>
            </Col>
            <Button onClick={this.handleSubmit}>Send</Button>
          </Form>
          </div>
        </Container>
      );
    }
    
  }
  export default SendNotification;