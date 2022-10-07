function getPokemonFromAPI(name) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(res => res.json())
        .then(result => result)
        .catch(err => err)
}

$('#pokemon-input-search').on('keyup', (e) => {
    if (e.key === 'Enter') {
        renderDataPokemon(e.target.value.toLowerCase())
        e.target.value = ''
    }
})

$('.search-logo').on('click', () => {
    renderDataPokemon($('#pokemon-input-search').val())
    $('#pokemon-input-search').val('')
})

$('.list-group-item').each(() => { }).click((e) => {
    renderDataPokemon(e.target.textContent.toLowerCase())
})

async function renderDataPokemon(name) {
    try {
        const pokemon = await getPokemonFromAPI(name)
        let pokemonName = pokemon.name
        pokemonName = pokemonName[0].toUpperCase() + pokemonName.slice(1, pokemonName.length)
        let pokemonType = pokemon.types[0].type.name
        pokemonType = pokemonType[0].toUpperCase() + pokemonType.slice(1, pokemonType.length)

        $('#main-container').html('')
        $('#main-container').html(`
        <div class="pokemon-wrapper">
            <div class="pokemon-title text-center">
                <h5 class="card-title">${pokemonName}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${pokemonType}</h6>
            </div>
            <div class="pokemon-image">
                <img src="${pokemon.sprites.front_default}"
                    alt="pokemon-image" width="130">
            </div>
        </div>
        <div class="pokemon-wrapper">
            <div class="abilities">
                <p class="text-center">Abilities</p>
                <div class="ability-items d-flex justify-content-center flex-wrap">
                    
                </div >
            </div >
            <div class="side-info text-center">
                <p>HP: <span class="text-muted">${pokemon.stats[0].base_stat}</span></p>
                <p>EXP: <span class="text-muted">${pokemon.base_experience}</span></p>
            </div>
            <div class="side-info2 text-center">
                <p class="btn btn-light">
                    <span class="text-muted fw-bold">Height</span>
                    <span>${pokemon.height / 10}m</span>
                </p>
                <p class="btn btn-light">
                    <span class="text-muted fw-bold">Weight</span>
                    <span>${pokemon.weight / 10}kg</span>
                </p>
            </div>
        </div >
        `)
        const abilities = pokemon.abilities
        abilities.forEach((e) => {
            $('.ability-items').append(`<span class="badge bg-pokemon2">${e.ability.name}</span>`)
        })

    } catch (err) {
        $('#main-container').html(`
            <div class="error text-center w-100 text-danger">
                Pokemon Not Found!
            </div>
        `)
    }
}

