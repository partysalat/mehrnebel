import React, { Component } from 'react';
import './Buzzer.styl';
import { connect } from 'react-redux';
import CreateFogButton from './CreateFogButton/CreateFogButton';
import getInstance from './../login/httpService';
import UserInfo from './UserInfo/UserInfo';
import LogoutButton from './LogoutButton/LogoutButton';
import { loadUser } from '../../redux/actions';


class Buzzer extends Component {
  static async createFog() {
    const client = await getInstance();
    return client.put('/api/create-fog');
  }

  constructor(props) {
    super(props);
    this.state = {};
    // this.initUser();
    props.loadUser();
  }
  createFogAndUpdateState = () => Buzzer.createFog()
    .then((user) => {
      this.setState(currentState => ({ ...currentState, user: user.data.data }));
    })

  render() {
    return (
      <div>
        <LogoutButton />
        <UserInfo user={this.props.user} />
        <CreateFogButton createFog={this.createFogAndUpdateState} />
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
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Buzzer);
