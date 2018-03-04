import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Buzzer.styl';
import CreateFogButton from './CreateFogButton/CreateFogButton';
import UserInfo from './UserInfo/UserInfo';
import LogoutButton from './LogoutButton/LogoutButton';
import { createFog, createFogButtonReleased, createFogSimple, loadUser } from '../../redux/actions';


class Buzzer extends Component {
  componentWillMount() {
    this.props.loadUser();
  }

  render() {
    return (
      <div>
        <LogoutButton />
        <UserInfo user={this.props.user} />
        <CreateFogButton
          createFog={this.props.createFog}
          createFogSimple={this.props.createFogSimple}
          createFogEnd={this.props.createFogEnd}
        />
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
    createFogSimple: () => dispatch(createFogSimple()),
    createFogEnd: () => dispatch(createFogButtonReleased()),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Buzzer);
