import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Buzzer.styl';
import CreateFogButton from './CreateFogButton/CreateFogButton';
import UserInfo from './UserInfo/UserInfo';
import Header from '../common/header';
import {
  createFog,
  createFogButtonReleased,
  createFogSimple,
  loadUser,
  initMutex,
  claimMutexToken,
  looseMutexToken,
} from '../../redux/actions';

import ClaimMutexButton from './ClaimMutexButton/ClaimMutexButton';


class Buzzer extends Component {
  componentWillMount() {
    this.props.loadUser();
    this.props.initMutex();
  }

  render() {
    return (
      <div>
        <Header />
        <UserInfo
          user={this.props.user}
          lastClaimer={this.props.lastClaimer}
          isClaimPending={this.props.isClaimPending}
        />
        <ClaimMutexButton
          onClick={this.props.isClaimed ? this.props.looseMutexToken : this.props.claimMutexToken}
          isChecked={this.props.isClaimed}
        />
        <CreateFogButton
          enabled={this.props.isClaimed}
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
    isClaimed: state.state.isClaimed,
    isClaimPending: state.state.isClaimPending,
    user: state.user,
    lastClaimer: state.lastClaimer,
  };
}
const mapDispatchToProps = {
  loadUser,
  createFog,
  createFogSimple,
  createFogEnd: createFogButtonReleased,
  initMutex,
  claimMutexToken,
  looseMutexToken,


};
export default connect(mapStateToProps, mapDispatchToProps)(Buzzer);
