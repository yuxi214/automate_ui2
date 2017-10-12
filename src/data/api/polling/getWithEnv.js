import { Component, PropTypes } from 'react';
import fetch from 'isomorphic-fetch';

const getWithEnv = (AUTOMATE_CORE_URL) => {
  const url = `${AUTOMATE_CORE_URL}/env`;

  const request = async () => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
      });
      const text = await response.text();
      try {
        const parsedText = JSON.parse(text);
        return parsedText;
      } catch (err) {
        throw (err);
      }
    } catch (err) {
      throw (err);
    }
  };

  const deleteEnv = async () => {
    console.log('delete env placeholder');
  };

  const setEnv = async () => {
    console.log('set env placeholder');
  };

  class WithEnv extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data: null,
        error: false,
      };
      this.intervalHandle = undefined;
      this.lastTopic = undefined;
    }
    componentWillMount() {
      this.getData();
    }
    componentWillReceiveProps() {
      this.getData();
    }
    componentWillUnmount() {
      clearInterval(this.intervalHandle);
    }
    getData() {
      const { refresh } = this.props;
      clearInterval(this.intervalHandle);
      this.intervalHandle = setInterval(this.makeRequest, refresh);
      this.makeRequest();
    }
    makeRequest = () => {
      request().then((response) => {
        this.setState({
          data: response,
        });
      }).catch({
        error: true,
      });
    }
    render() {
      const { children, whileLoading } = this.props;
      if (!this.state.data) {
        return whileLoading ? whileLoading() : null;
      }
      return children ? children({
        variables: this.state.data,
        setEnv,
        deleteEnv,
      }) : null;
    }
  }

  WithEnv.propTypes = {
    whileLoading: PropTypes.func,
    children: PropTypes.func,
    refresh: PropTypes.number,
  };

  return WithEnv;
};


export default getWithEnv;
