import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as UserActions from '../../store/modules/user/actions';

import { Title, Card, SendButton, MyInput } from './styles';

import api from '../../services/apiScrapBook';

class Login extends Component {
  state = {
    login: '',
    password: '',
    newEmail: '',
    newName: '',
    newPassword: '',
  };

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  handleInputChange = event => {
    const { target } = event;
    if (target.name === 'login') {
      this.setState({ login: target.value });
    } else {
      this.setState({ password: target.value });
    }
  };

  handleInputChangeNewUser = event => {
    const { target } = event;
    if (target.name === 'newName') {
      this.setState({ newName: target.value });
    } else if (target.name === 'newEmail') {
      this.setState({ newEmail: target.value });
    } else {
      this.setState({ newPassword: target.value });
    }
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { login } = this.props;

    const response = await api
      .post('/login', {
        email: this.state.login,
        password: this.state.password,
      })
      .catch(function(error) {
        alert('Login inválido!');
      });
    if (response) {
      const { user, token } = response.data;
      user.token = token;
      login(user);
    }
  };

  handleSubmitNewUser = async event => {
    event.preventDefault();

    const { login } = this.props;
    const response = await api.post('/users', {
      name: this.state.newName,
      email: this.state.newEmail,
      password: this.state.newPassword,
    }).catch(function(error) {
      alert('Cadastro de usuário inválido!');
    });

    const response2 = await api.post('/login', {
      email: this.state.newEmail,
      password: this.state.newPassword,
    });
    if (response2) {
      const { user, token } = response2.data;
      user.token = token;
      login(user);
    }
  };

  render() {
    return (
      <>
        <Card>
          <center>
            <div className="forms">
              <ul>
                <Title>Login</Title>
                <form onSubmit={this.handleSubmit}>
                  <MyInput
                    label="Digite seu email:"
                    name="login"
                    type="text"
                    onChange={this.handleInputChange}
                  />
                  <MyInput
                    label="Digite sua senha:"
                    name="password"
                    type="password"
                    onChange={this.handleInputChange}
                  />
                  <SendButton type="submit">Entrar</SendButton>
                </form>
              </ul>

              <ul className="ul">
                <Title>Cadastro</Title>
                <form onSubmit={this.handleSubmitNewUser}>
                  <MyInput
                    label="Digite seu nome:"
                    name="newName"
                    type="text"
                    onChange={this.handleInputChangeNewUser}
                  />
                  <MyInput
                    label="Digite seu email:"
                    name="newEmail"
                    type="text"
                    onChange={this.handleInputChangeNewUser}
                  />
                  <MyInput
                    label="Digite sua senha:"
                    name="newPassword"
                    type="password"
                    onChange={this.handleInputChangeNewUser}
                  />
                  <SendButton type="submit">Cadastrar</SendButton>
                </form>
              </ul>
            </div>
          </center>
        </Card>
      </>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(UserActions, dispatch);

export default connect(null, mapDispatchToProps)(Login);
