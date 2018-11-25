import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Coverflow from 'react-coverflow';
import Button from '@material-ui/core/Button';
import { StyleRoot } from 'radium';
import { styles } from '../Header/Styles/Header'
import { withStyles } from '@material-ui/core/styles';

class Images extends Component {
  state = {
    active: 0,
    cluster: 0,
    task: {},
  };

  componentWillReceiveProps(nextProps) {
    this.setState({task: nextProps.task, cluster: nextProps.cluster, active: nextProps.active});
  }

  handleClick = () => {
    const imageCount = this.state.task.images[0].length;
    const num = Math.floor(Math.random() * Math.floor(imageCount));

    this.setState({active: num});
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { task, cluster } = this.state;
    const { images } = task;

    const imageList = images && images[cluster] && images[cluster].map((imageId, i) =>
      <img key={i} src={'/img/' + imageId + '.jpg'} alt="Loading Image..." />
    );

    return (
      <div className={classes.root}>
        { images &&
          <div className={classes.maxwidth}>
            <Button
              color="secondary"
              className={classes.button}
              variant="contained"
              onClick={this.handleClick.bind(this)}>
                Choose Random Image
            </Button>
            <StyleRoot>
              <Coverflow
                height={860}
                width={480}
                displayQuantityOfSide={2}
                navigation={true}
                infiniteScroll
                enableHeading={false}
                active={this.state.active}
                media={{
                  '@media (max-width: 900px)': {
                    width: '600px',
                    height: '300px'
                  },
                  '@media (min-width: 900px)': {
                    width: '960px',
                    height: '600px'
                  }
                }}
              >
                {imageList}
              </Coverflow>
            </StyleRoot>
          </div>
        }
      </div>
    );
  }
}

Images.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Images);