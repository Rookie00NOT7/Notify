import React,{ Component } from 'react';
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button,
} from 'reactstrap';
import {BrowserRouter as Router,Route,
  Redirect} from 'react-router-dom';

import Axios from 'axios';

class Login extends Component {
    constructor(props){
      super(props);
      this.state = {value: '',login:false};
  
      this.handleEmailChange = this.handleEmailChange.bind(this);
      this.handlePasswordChange = this.handlePasswordChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleEmailChange(e)  {
      this.setState({email: e.target.value});
   }
   handlePasswordChange(e) {
      this.setState({password: e.target.value});
   }
    async handleSubmit(e) {
      //logic

    e.preventDefault();
    this.setState({login:true})
    let res = await Axios.post(`http://192.168.99.100:5000/login`,{
      email: this.state.email,
      password: this.state.password
    })
    let errMessage = res.data.message
    let token = res.data
    if(token){
      await localStorage.setItem('token', JSON.stringify(token))
      console.log(token);
    }
    console.log(JSON.parse(localStorage.getItem('token')))
    if(errMessage){
      alert(errMessage)
    }
    
    // console.log("EMail: " + this.state.email);
    // console.log("Password: " + this.state.password);
    // console.log("id"+localStorage.getItem("id: "))

    
    }
     
    render() {
      if(this.state.login){
        return <Redirect to="/sendNotification"/>
      }
      return (
        <Container className="App">
          <h2>Sign In</h2>
          <Form className="form">
            <Col>
              <FormGroup>
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="myemail@email.com"
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
                  id="password"
                  placeholder="********"
                  onChange={this.handlePasswordChange}
                />
              </FormGroup>
            </Col>
            <Button onClick={this.handleSubmit}>Submit</Button>
          </Form>
        </Container>
      );
    }
    
  }
  export default Login;