import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import LogoutIcon from '@material-ui/icons/ExitToApp';
import * as UserActions from '../../store/modules/user/actions';

import {
  Title,
  Card,
  SendButton,
  MyInput,
  PaperNome,
  EditModal,
  TitleModal,
  CloseButton,
  LogoutButton,
} from './styles';
import CardItem from '../../components/CardItem';

import api from '../../services/apiScrapBook';

class Home extends Component {
  state = {
    newGrowdev: '',
    growdevers: [],
    cards: [{}],
    title: '',
    content: '',
    show: false,
    Edditing: '',
  };

  async componentDidMount() {
    const { user } = this.props;
    if (user.length > 0) {
      const response = await api.get('/cards', {
        headers: { Authorization: `Bearer ${user[0].token}` },
      });
      this.setState({ cards: response.data });
    }
  }

  handleLogout = event => {
    localStorage.removeItem('persist:react-cards');
    window.location.reload();
  };

  handleInputChange = event => {
    const { target } = event;

    if (target.name === 'title') {
      this.setState({ title: target.value });
    } else {
      this.setState({ content: target.value });
    }
  };

  handleSubmit = async event => {
    event.preventDefault();

    const { user } = this.props;

    const response = await api.post(
      '/cards',
      {
        title: this.state.title,
        content: this.state.content,
      },
      { headers: { Authorization: `Bearer ${user[0].token}` } }
    );
    this.setState({
      cards: [
        ...this.state.cards,
        {
          id: response.data.id,
          title: this.state.title,
          content: this.state.content,
        },
      ],
    });
  };

  handleDelete = async id => {
    const { user } = this.props;
    const response = await api.delete(`/cards/${id}`, {
      headers: { Authorization: `Bearer ${user[0].token}` },
    });

    this.setState({
      cards: this.state.cards.filter(item => item.id !== id),
    });
  };

  handleCloseEditModal = () => {
    this.setState({ show: false });
  };

  handleOpenEditModal = id => {
    this.state.cards.map(item => {
      if (item.id === id) {
        this.setState({
          id: item.id,
          title: item.title,
          content: item.content,
        });
      }
    });
    this.setState({ show: true, Edditing: id });
  };

  handleEdit = async () => {
    const id = this.state.Edditing;
    const { user } = this.props;

    const response = await api.put(
      `/cards/${id}`,
      {
        title: this.state.title,
        content: this.state.content,
      },
      {
        headers: { Authorization: `Bearer ${user[0].token}` },
      }
    );
  };

  render() {
    return (
      <>
        <EditModal
          open={this.state.show}
          onClose={this.handleCloseEditModal}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <PaperNome>
            <TitleModal>Editar o Recado:</TitleModal>
            <form onSubmit={this.handleEdit}>
              <MyInput
                label="Digite o novo titulo:"
                type="text"
                name="title"
                onChange={this.handleInputChange}
                defaultValue={this.state.title}
              />
              <MyInput
                label="Digite o novo conteudo:"
                type="text"
                name="content"
                onChange={this.handleInputChange}
                defaultValue={this.state.content}
              />
              <SendButton type="submit">Enviar</SendButton>
              <CloseButton type="button" onClick={this.handleCloseEditModal}>
                Fechar
              </CloseButton>
            </form>
          </PaperNome>
        </EditModal>

        <Card>
          <ul>
            <LogoutButton
              onClick={this.handleLogout}
              startIcon={<LogoutIcon />}
            >
              Logout
            </LogoutButton>
            <Title>Lista de Recados</Title>
            <form onSubmit={this.handleSubmit}>
              <MyInput
                label="Digite um titulo:"
                type="text"
                name="title"
                onChange={this.handleInputChange}
                // defaultValue={this.state.newCard.title}
              />
              <MyInput
                label="Digite um conteudo:"
                type="text"
                name="content"
                onChange={this.handleInputChange}
                // defaultValue={this.state.newCard.content}
              />
              <SendButton type="submit">Enviar</SendButton>
            </form>
          </ul>

          <ul>
            {this.state.cards.map(item => (
              <PaperNome>
                <CardItem
                  key={item.id}
                  card={item}
                  onDelete={() => this.handleDelete(item.id)}
                  onEdit={() => this.handleOpenEditModal(item.id)}
                />
              </PaperNome>
            ))}
          </ul>
        </Card>
      </>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(UserActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
