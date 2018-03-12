import React, { Component } from 'react';

class Searchbox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: undefined
    };
  }

  handleSearch(e) {
    e.preventDefault();
    if (!this.searchInput.value) {
      const error = 'Please enter a location';
      this.setState(() => ({error}));
    } else {
      this.props.fetchData(this.searchInput.value);
      this.setState(() => ({error: undefined}));
    }
    this.searchInput.value = '';
  }
  
  render() {
    return (
      <form onSubmit={this.handleSearch.bind(this)}>
        <input ref={input => this.searchInput = input} type="text" placeholder="Enter your location"/>
        <button>Get Weather Data</button>
        {this.state.error && <span>{this.state.error}</span>}
      </form>
    );
  }
}

export default Searchbox;