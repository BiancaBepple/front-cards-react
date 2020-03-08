import React from 'react';
import { connect } from 'react-redux';

import { Nav } from './styles';

function Header({ personTotal, person }) {
  return (
    <>
      <Nav />
    </>
  );
}

const mapStateToProps = state => ({
  personTotal: state.person.length,
  person: state.person,
});

export default connect(mapStateToProps)(Header);
