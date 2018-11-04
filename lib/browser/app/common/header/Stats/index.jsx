import * as React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './index.styl';

const STATS_ROUTE = '/stats';
const BUZZER_ROUTE = '/buzzer';

function Stats(props) {
  const isStatsRoute = props.location.pathname === STATS_ROUTE;
  const icon = isStatsRoute ? 'fa-cloud' : 'fa-list-ol';
  return (
    <Link
      to={isStatsRoute ? BUZZER_ROUTE : STATS_ROUTE}
      className={`fa ${icon} stats-button`}
    />
  );
}

export default withRouter(props => <Stats {...props} />);
