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
      this.props.fetchData(this.searchInput.value, false);
      this.setState(() => ({error: undefined}));
    }
    this.searchInput.value = '';
  }
  
  render() {
    return (
      <div>
        <form onSubmit={this.handleSearch.bind(this)}>
          <input ref={input => this.searchInput = input} type="text" placeholder="Enter your location"/>
          <button>Get Weather Data</button>
        </form>
        {this.state.error && <div>{this.state.error}</div>}
        <div className="help">
          <img src="./icon.png" alt=""/>
          Not the location you meant? Try searching with the country-code (London,UK or London,GB).
        </div>
      </div>
    );
  }
}

export default Searchbox;