import React, { Component } from 'react';
import './Buzzer.styl';
import { connect } from 'react-redux';
import CreateFogButton from './CreateFogButton/CreateFogButton';
import UserInfo from './UserInfo/UserInfo';
import LogoutButton from './LogoutButton/LogoutButton';
import { createFog, loadUser } from '../../redux/actions';


class Buzzer extends Component {
  componentWillMount() {
    this.props.loadUser();
  }

  render() {
    return (
      <div>
        <LogoutButton />
        <UserInfo user={this.props.user} />
        <CreateFogButton createFog={this.props.createFog} />
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    isLoading: state.state.isLoadingUserInformation,
    user: state.user,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    loadUser: () => dispatch(loadUser()),
    createFog: () => dispatch(createFog()),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Buzzer);
