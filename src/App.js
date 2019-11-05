import React from 'react';

import Form from './components/Form'

class App extends React.Component {

  state = {
    data: ''
  }

  componentDidMount() {
    this.callApi()
  }

  callApi = async () => {
    const callapi = await fetch(`https://secure-hamlet-19722.herokuapp.com/api/v1/characters`)
    const res = await callapi.json()
    this.setState({ data: res })
    console.log(this.state.data)
  }

  render() {
    return (
      <div>
        <Form data={this.state.data} />
      </div>
    );
  }
}

export default App;
