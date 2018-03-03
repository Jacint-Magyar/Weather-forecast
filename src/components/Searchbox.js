import React, { Component } from 'react';

class Searchbox extends Component {

  handleSearch(e) {
    e.preventDefault();
    this.props.fetchData(this.searchInput.value);
    this.searchInput.value = '';
  }
  
  render() {
    return (
      <form onSubmit={this.handleSearch.bind(this)}>
        <input ref={input => this.searchInput = input} type="text" placeholder="Enter your location"/>
        <button>Get Weather Data</button>
      </form>

    );
  }
}

export default Searchbox;