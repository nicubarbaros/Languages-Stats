import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

var styles = {
  content: {
    textAling: 'center',
    fontSize: '35px'
  }
};

class Loader extends PureComponent {
  constructor(props){

    super(props);
    this.originalText = props.text;
    this.state = {
      text: this.originalText,
    };

    this.clearInterval = this.clearInterval.bind(this);
  }

  componentDidMount() {
    var stopper = this.originalText + '...';
    this.interval = setInterval(function() {
      if(this.state.text === stopper) {
        this.setState(function () {
          return {
            text: this.originalText
          }
        });
      } else {
        this.setState(function (prevState) {
          return {
            text: prevState.text + '.'
          }
        });
      }
    }.bind(this), this.props.speed)
  }

  componentWillUnmount() {
    this.clearInterval();
  }

  clearInterval() {
    window.clearInterval(this.interval);
  }

  render () {
    return(
      <div style={styles.content}>
        {this.state.text}
      </div>
    )
  }
}

Loader.propTypes = {
  text: PropTypes.string,
  speed: PropTypes.number
};

Loader.defaultProps = {
  text: 'Loading',
  speed: 300
};

export default Loader;