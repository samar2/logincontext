import Logo from "../../assets/basma-logo.svg";

import React from "react"; /* 
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import UncontrolledAlert from "reactstrap/lib/UncontrolledAlert";
import { Redirect } from "react-router"; */
import { useContext, useState } from "react";
import SessionContext from "../../components/session/SessionContext";

export default function LoginAdmin() {
  const {
    actions: { login },
  } = useContext(SessionContext);

  const [state, setValue] = useState({
    email: "",
    password: "",
  });

  const { email, password } = state;

  function setState(nextState) {
    setValue((prevState) => ({
      ...prevState,
      ...nextState,
    }));
  }

  function handleChange(e) {
    let { name, value } = e.target;

    setState({ [name]: value });
  }

  async function handleSubmit(e) {
    e.nativeEvent.preventDefault();
    login(state);
  }

  return (
    <div className="login-form">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
/* class LoginAdmin extends React.Component {
  state = {
    password: "",
    email: "",
    errors: "",
    auth: 0,
    adminID: 0,
    token:''
  };

  login = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    });
    const result = await response.json();
    //console.log(result);
    if (result.access_token) {
      localStorage.setItem("adminToken", result.access_token);
      this.setState({token:result.access_token})

      localStorage.setItem("adminID", result.user_id);
      this.setState({ adminID: result.user_id });
      this.setState({ auth: 200 });

      console.log(result);
    } else {
      this.setState({ auth: 500 });

      this.setState({ errors: result.error });
    }
  };
  handleInput = (e) => {
    this.setState({ email: e.target.value });
    // console.log(this.state.email)
  };
  handlePassword = (e) => {
    this.setState({ password: e.target.value });
    // console.log(this.state.password)
  };

  render() {
    if (this.state.auth === 200) {
      
      return <Redirect to={{ pathname: `/admin/dashboard`,
            state:{
            token: this.state.token
      } }} />;
    }
    return (
      <div style={{ position: "relative" }}>
        <div
          style={{
            width: "30vw",
            margin: "100px 33% 100px auto ",
            border: "solid 1px black",
            padding: "50px 50px",
          }}
        >
          {this.state.errors && (
            <UncontrolledAlert color="warning">
              {this.state.errors}{" "}
            </UncontrolledAlert>
          )}
          <Form onSubmit={this.handleSubmit}>
            <div className="text-center pb-4">
              <img
                src={Logo}
                className="rounded"
                style={{ width: 150, height: 100, cursor: "pointer" }}
                alt="logo"
              />
            </div>

            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                name="email"
                onChange={this.handleInput}
                placeholder="Are You An Admin?"
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="email"
                onChange={this.handlePassword}
                placeholder="Password"
              />
            </FormGroup>

            <hr />
            <Button
              size="lg"
              style={{ marginLeft: "34%" }}
              className="border-0 bg-primary"
              block
              onClick={this.login}
            >
              LOGIN
            </Button>

            <div className="text-center pt-5">
              <h6>ADMIN</h6>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

export default LoginAdmin;
 */
