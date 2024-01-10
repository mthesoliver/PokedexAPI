const pokeApi = {};

pokeApi.getPokemons = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonsDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails) => pokemonsDetails)
    
    .catch((error) => console.log(error));
};
pokeApi.getPokemonsDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon)
}

function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon();
    pokemon.name = pokeDetail.name;
    pokemon.number = pokeDetail.id;
    pokemon.height = pokeDetail.height;
    pokemon.weight = pokeDetail.weight;
    pokemon.xpBase = pokeDetail.base_experience;
    pokemon.hp = pokeDetail.stats[0].base_stat;
    pokemon.attack = pokeDetail.stats[1].base_stat;
    pokemon.defense = pokeDetail.stats[2].base_stat;
    pokemon.speed = pokeDetail.stats[5].base_stat;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;

    const abilities = pokeDetail.abilities.map((ability) => ability.ability.name);
    const [ability] = abilities;

    pokemon.abilities = abilities;

    pokemon.types = types;
    pokemon.mainType = type;


    pokemon.sprite = pokeDetail.sprites.other.dream_world.front_default;

    return pokemon;
}