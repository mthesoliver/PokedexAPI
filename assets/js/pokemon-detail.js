const pokemonDetailCard = document.getElementById('pokemonDetail');
const listSection = document.getElementById('listSection');

function showDetails() {
    const listItem = document.querySelectorAll('li.pokemon');

    listItem.forEach(element => {
        element.addEventListener("click", (ev) => {
                
            listSection.classList.add('transition');
            setTimeout(() => {
                pokemonDetailCard.classList.remove('hide');
                listSection.classList.add('hide');
                pokemonDetailCard.classList.add('transition-enter');
            }, 450)

            createDetail(element.id);
        })
    });
    
}

function hideDetail() {
    listSection.classList.remove('transition');
    pokemonDetailCard.classList.add('transition-out')
    pokemonDetailCard.classList.remove('transition-enter');
    setTimeout(() => {
        pokemonDetailCard.classList.add('hide')
        listSection.classList.remove('hide')
        listSection.classList.add('transition-outer')
        pokemonDetailCard.classList.remove('transition-out')
    }, 500)
}


function createDetail(ev) {
    const url = `https://pokeapi.co/api/v2/pokemon/${ev}`
    fetch(url)
    .then((response) => response.json())
    .then((jsonBoby) => {
        const pokemon = jsonBoby;
        return pokemon
    })
    .then(convertPokeApiDetailToPokemon)
    .then(createCardDetail)
}

function createCardDetail(pokemon){
    const detail = `
    <div class="header-detail ${pokemon.mainType}">

    <span class="go-back" onclick="hideDetail()">&lt; Voltar</span>
    <span class="number">#${pokemon.number}</span>
    <h1>${pokemon.name}</h1>
    <ol class="types">
        ${convertPokemonTypesToLi(pokemon).join('')}
    </ol>
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.number}.svg">
</div>
<div class="details-info">
    <ul class="details-list">
    <h2>Sobre</h2>
        <li class="detail-item"><strong>Vida:</strong> ${pokemon.hp}</li>
        <li class="detail-item"><strong>Altura:</strong> ${pokemon.height}</li>
        <li class="detail-item"><strong>Peso:</strong> ${pokemon.weight}</li>
        <li class="detail-item"><strong>XP Base:</strong> ${pokemon.xpBase}</li>
        <li class="detail-item"><strong>Ataque:</strong> ${pokemon.attack}</li>
        <li class="detail-item"><strong>Defesa:</strong> ${pokemon.defense}</li>
        <li class="detail-item"><strong>Velocidade:</strong> ${pokemon.speed}</li>
    </ul>
    <ul class="details-list">
    <h2>Habilidades</h2>
        ${convertAbilitiesToLi(pokemon).join("")}
    </ul>
</div>

`
    return pokemonDetailCard.innerHTML = detail;
}

function convertAbilitiesToLi(pokemonAbility) {
    return pokemonAbility.abilities.map((ability) => ` <li class="detail-item"><strong>Habilidade:</strong> ${ability}</li>`)
}