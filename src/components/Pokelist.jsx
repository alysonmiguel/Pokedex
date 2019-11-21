import React from 'react';

export default class Pokelist extends React.Component {

    constructor() {
        super();
        this.state = {
            pokes: []
        };
    }
    async componentDidMount() {
        const url = "https://pokeapi.co/api/v2/pokemon";
        const res = await fetch(url);
        const pokemon = await res.json();


        this.setState({
            show: "https://pokeapi.co/api/v2/pokemon/150",
            pokes: [[pokemon.results[0].name, pokemon.results[0].url], [pokemon.results[1].name, pokemon.results[1].url], [pokemon.results[2].name, pokemon.results[2].url], [pokemon.results[3].name, pokemon.results[3].url], [pokemon.results[4].name, pokemon.results[4].url], [pokemon.results[5].name, pokemon.results[5].url], [pokemon.results[6].name, pokemon.results[6].url], [pokemon.results[7].name, pokemon.results[7].url], [pokemon.results[8].name, pokemon.results[8].url]]
        })
    }
    render() {
        return (
            <div>
                {this.state.pokes.map(e => {
                    return e[0] + " ";
                })}
            </div>
        )
    }
}