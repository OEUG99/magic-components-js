async function QueryPokemonImage(name) {
	// Grabs all the pokemons information from pokeapi, parses it, to return the pokemon's image as a URL.
	if (typeof name !== "string") {
		throw new Error("input must be a string");
	}

	const formattedURL = "https://pokeapi.co/api/v2/pokemon/" + name;

	// trying to fetch from API if an error occurs, we immediately handle it.
	const resp = await fetch(formattedURL)

	if (resp.ok) {
		console.log(resp.statusText);
		const data = await resp.json();
		return await data.sprites.front_default;
	} else {
		// if the requested pokemon does not exist we will use this hardcoded URL as a fail safe.
		return "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
	}
}

async function displayPokemon(name) {
	// First we must find the index.html image container element.
	const img_container = document.getElementById("image-container")

	// then we wil update the img element inside with the correct url
	const img = document.querySelector("#pokemon-image");
	img.src = await QueryPokemonImage(name);
}

// Now when the DOM loads for the first time we must add an event listener
document.addEventListener("DOMContentLoaded", async () => {
	await displayPokemon("pikachu");
	console.log("initial render complete");
})

// Now we must make a listener and override default behavior for the search button.
document.addEventListener("submit", event => {
	// first we will find the search button.
	const searchInput = document.getElementById('search-input');

	// Grabbing requested pokemon and trying to display it.
	const requestedPokemon = searchInput.value.toLowerCase();
	console.log(requestedPokemon);

	// async requesting pokemon and rehydrating the page with new image.
	displayPokemon(requestedPokemon).catch(error => console.log(error));

	event.preventDefault();
})
