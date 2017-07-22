import React from 'react';
import faker from 'faker';
import ReactDom from 'react-dom';
import superagent from 'superagent'

const API_URL = 'http://pokeapi.co/api/v2'

// create a form container component every time you create a Form
// a form container is a component that holds the state for a forms inputs

class PokemonForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokeName: '',
    };
    this.handlePokeNameChange = this.handlePokeNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handlePokeNameChange(e) {
    this.setState({ pokeName: e.target.value });
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.pokemonSelect(this.state.pokeName)
  }

  render() {
    return (
      <form
        onSubmit={this.handleSubmits}>
        <input
          type="text"
          name="Pokemon Name"
          placeholder="Pokemon Name"
          value={this.state.pokeName}
          onChange={this.handlePokeNameChange}
        />

        <p>
          {this.state.pokeName}
        </p>
      </form>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemonLookup :[],
      pokemonSelected: null,
      pokemonNameError: '',

    }
  }

  componentDidUpdate(){
    console.log('__STATE___', this.state);
  }

  componentDidMount(){
    superagent.get(`${API_URL}/pokemon/`)
    .then(res =>{
      let pokemonLookup = res.body.results.reduce((lookup, n)=>{
        lookup[n.name] = n.url
        return lookup
      }, {})
      console.log(pokemonLookup);
      this.setState({pokemonLookup})
    })
    .catch(console.error)
  }
  pokemonSelect(name){
    if(!pokemonLookup[name]){
      this.setState({
        pokemonSelected:null,
        pokemonNameError:name,
      })
    } else {
      superagent.get(pokemonLookup[name])
        .then(res =>{
          console.log(res.body);
        })
        .catch(console.error)
    }
  }

  render() {
    return (
      <div>
        <h1> Form Demo </h1>
        <PokemonForm pokemonSelect={this.pokemonSelect}/>
        <p> pokemon name error: {this.state.pokemonNameError}</p>
      </div>
    );
  }
}

// create a place to put the app
const container = document.createElement('div');
document.body.appendChild(container);
ReactDom.render(<App />, container);
