import React from 'react';

function Drink( props ){

    return( 
        <div>
            <h2> {props.name} </h2>
            <p> {props.instructions}</p>
            <img src={props.image} />
        </div>);
}

export default Drink;