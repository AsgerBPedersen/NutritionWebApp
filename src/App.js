import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    foods: [],
    searchValue: ""
  }

  generateUrl = params => {
    const newUrl = `https://api.edamam.com/api/food-database/parser?ingr=${params}&app_id=${process.env.REACT_APP_NUTDB_API_ID}&app_key=${process.env.REACT_APP_NUTDB_API_KEY}`;
    return newUrl
  }
  updateInputValue = e => {
    this.setState({ searchValue: e.target.value })
  }
  
  fetchFood = url => {
    fetch(url)
    .then(response => response.json())
    .then(data => this.storeFood(data))
    .catch(error => console.log(error));
  }

  storeFood = data => {
    const food = data.hints.map(hint => {
      const { foodId, label, nutrients } = hint.food;
      return { foodId, label, nutrients };
    });
    this.setState({foods: food});
  }

  onClick = () => {
    const url = this.generateUrl(this.state.searchValue);
    this.fetchFood(url);
  }

  render() {
    return (
      <div>
        <input value={this.state.searchValue} onChange={e => this.updateInputValue(e)}></input>
        <button onClick={this.onClick}>search</button>
        <ul>
          {this.state.foods.map( (food, index) => (
            <li key={index.toString()}>{food.label}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
