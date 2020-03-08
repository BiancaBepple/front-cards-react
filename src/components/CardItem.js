import React from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { DeleteButton, Nome, Content, EditButton } from '../views/Home/styles';

function CardItem({ card, onDelete, onEdit }) {
  return (
    <li key={card.id}>
      <Nome>{card.title}</Nome>
      <Content>{card.content}</Content>
      <div>
        <EditButton onClick={onEdit} type="button" startIcon={<EditIcon />}>
          Editar
        </EditButton>
        <DeleteButton
          onClick={onDelete}
          type="button"
          startIcon={<DeleteIcon />}
        >
          Deletar
        </DeleteButton>
      </div>
    </li>
  );
}

CardItem.defaultProps = {
  card: 'Card not found',
};

CardItem.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    content: PropTypes.string,
  }),
  onDelete: PropTypes.func.isRequired,
};

export default CardItem;
