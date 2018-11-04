import React, { Component } from 'react';
import './index.styl';
import Header from '../common/header';
import { loadBestList } from '../../redux/actions';
import connect from 'react-redux/es/connect/connect';

class Stats extends Component {
  componentWillMount() {
    this.props.loadBestList();
  }
  render() {
    return (
      <div>
        <Header />
        FOOO!
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}
const mapDispatchToProps = {
  loadBestList,
};
export default connect(mapStateToProps, mapDispatchToProps)(Stats);
