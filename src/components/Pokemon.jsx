import React from 'react';
import Type from './Type';

export default class Pokemon extends React.Component {

    constructor() {
        super();
        this.state = {
            id: null,
            name: null,
            types: 1,
            type1: null,
            type2: null,
            prev: null,
            next: null,
            height: null,
            weight: null,
            sprite: null,
        };
    }
    async componentDidMount() {
        const url = 'https://pokeapi.co/api/v2/pokemon/' + this.props.url;
        const res = await fetch(url);
        const pokemon = await res.json();

        this.setState({
            id: pokemon.id,
            name: pokemon.name,
            types: pokemon.types.length,
            type1: pokemon.types[0].type.name,
            type2: null,
            next: 'https://pokeapi.co/api/v2/pokemon/' + (pokemon.id + 1),
            height: pokemon.height,
            weight: pokemon.weight,
            sprite: pokemon.sprites.front_default
        });

        if (pokemon.types.length === 2) {
            this.setState({
                type2: pokemon.types[1].type.name,
            })
        }
    }

    async pokeChange(dire) {
        const url = 'https://pokeapi.co/api/v2/pokemon/' + (this.state.id + dire);
        const res = await fetch(url);
        const pokemon = await res.json();

        this.setState({
            id: pokemon.id,
            name: pokemon.name,
            types: pokemon.types.length,
            type1: pokemon.types[0].type.name,
            type2: null,
            prev: 'https://pokeapi.co/api/v2/pokemon/' + (pokemon.id - 1),
            next: 'https://pokeapi.co/api/v2/pokemon/' + (pokemon.id + 1),
            height: pokemon.height,
            weight: pokemon.weight,
            sprite: pokemon.sprites.front_default
        });

        if (pokemon.types.length === 2) {
            this.setState({
                type2: pokemon.types[1].type.name,
            })
        }
    }

    render() {
        function firstUpper(name) {
            if (name) {
                name = name.split('');
                name[0] = name[0].toUpperCase();
                return name.join('');
            }
        }
        function toBetterImg(id) {
            if (id < 10) {
                id = '00' + id;
            } else if (id < 100) {
                id = '0' + id;
            }
            return `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`;
        }
        function toMetric(val) {
            return (val / 10).toFixed(2);
        }


        return (
            <div className="container">
                <div className="row img-div">
                    <img className="m-auto col-12 img-responsive mw" src={toBetterImg(this.state.id)} alt="Pokemon"></img>
                    {/* <img className="m-auto col-12 img-responsive mw" src={this.state.sprite}></img> */}
                </div>
                <div className="row mt-2">
                    <div className="col text-center font-weight-bold">{firstUpper(this.state.name)}</div>
                    <div className="col text-center font-weight-bold">id: {this.state.id}</div>
                </div>
                <div className="row justify-content-center abs mt-1">
                    <Type className="col-5 font-weight-bold" type={this.state.type1} />
                    <Type className="col-5 col-offset-2 font-weight-bold" type={this.state.type2} />
                </div>
                <div className="row justify-content-center mt-1">
                    <div className="col text-center font-weight-bold">Altura: {toMetric(this.state.height)+"m"}</div>
                    <div className="col text-center font-weight-bold">Peso: {toMetric(this.state.weight)+"Kg"}</div>
                </div>
                <div className="row justify-content-center mt-3 ">
                    <button className="btn btn-light text-danger mx-1 col-5 font-weight-bold" onClick={() => this.pokeChange(-1)}>Prev</button>
                    <button className="btn btn-light text-danger mx-1 col-5 font-weight-bold" onClick={() => this.pokeChange(1)}>Next</button>
                </div>
                {/* <img src={"https://assets.pokemon.com/assets/cms2/img/pokedex/detail/0" + this.state.id +".png"}></img> */}
            </div>
        );
    }
}