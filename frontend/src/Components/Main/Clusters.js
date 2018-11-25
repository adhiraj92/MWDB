import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Images from './Images';


function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

class Clusters extends React.Component {
  state = {
    value: 0,
    task: {},
  };

  componentWillReceiveProps(nextProps) {
    this.setState({task: nextProps.task});
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { task, value } = this.state;

    const tabs = task.images && task.images.map((cluster, i) =>
      <Tab key={i} label={'Cluster ' + (i+1) + ' ( ' + cluster.length + ' images )'} />
    );

    return (
      <div className={classes.root}>
        <AppBar position="static" style={{ backgroundColor: '#A9A9A9' }} >
          <Tabs value={value} onChange={this.handleChange}>
            {tabs}
          </Tabs>
        </AppBar>
        <TabContainer><Images task={this.state.task} cluster={value} active={0} /></TabContainer>
      </div>
    );
  }
}

Clusters.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Clusters);
