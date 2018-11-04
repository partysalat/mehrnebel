import React, { Component } from 'react';
import { connect } from 'react-redux';
import './index.styl';
import Header from '../common/header';
import List from './list';
import { loadBestList } from '../../redux/actions';

class Stats extends Component {
  componentWillMount() {
    this.props.loadBestList();
  }
  render() {
    return (
      <div>
        <Header />
        <List list={this.props.list} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    list: state.bestlist,
  };
}
const mapDispatchToProps = {
  loadBestList,
};
export default connect(mapStateToProps, mapDispatchToProps)(Stats);
