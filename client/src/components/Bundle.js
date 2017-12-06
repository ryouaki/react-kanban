import React from 'react';
import PropTypes from 'prop-types';

class Bundle extends React.Component {
  static propTypes = {
    load: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = { mod: null };
  }

  componentWillMount() {
    this.loadModule(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.loadModule(nextProps);
    }
  }

  loadModule(props) {
    this.setState({ mod: null });
    props.load().then((mod) => {
      this.setState({
        mod: mod.default ? mod.default : mod
      });
    });
  }

  render() {
    return this.state.mod ? this.props.children(this.state.mod) : null;
  }
}

export default Bundle;
