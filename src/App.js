import React from 'react';
import './App.css';
import Drink from './Drink';

class App extends React.Component{
  
  state = {
    drinks : [],
    errorMsg : ""
  }
  
  displayDrinks = ( drinks ) => {

    const newDrinks = drinks.map( (drink) => {
      return {
        name: drink.strDrink,
        instructions: drink.strInstructions,
        image: drink.strDrinkThumb
      }
    });

    this.setState({
      drinks: newDrinks
    });
  }

  fetchCocktails = ( event ) => {
    event.preventDefault();

    const drinkName =  event.target.drink_name.value;
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkName}`;
    const settings = {
      method: 'GET'
    }

    fetch( url, settings )
      .then( response => {
        if( response.ok ){
          return response.json();
        }

        throw Error( "Something went wrong" );
      })
      .then( responseJSON => {
        this.displayDrinks( responseJSON.drinks );
      })
      .catch( error => {
        this.setState({
          errorMsg : error.message,
          drinks : []
        })
      });
  }

  render(){
    return(
      <div>
        <form onSubmit={this.fetchCocktails}>
          <label htmlFor="drink_name">
            Write your favorite drink:
          </label>
          <input type="text" id="drink_name" />
          <button type="submit">
            Get the drinks!
          </button>
        </form>
        <div>
          {this.state.drinks.map( ( drink, index ) => {
            return ( <Drink key={index} name={drink.name} image={drink.image} instructions={drink.instructions} />);
          })}
        </div>
        <div>
          {this.state.errorMsg}
        </div>
      </div>
    )
  }
}

export default App;
