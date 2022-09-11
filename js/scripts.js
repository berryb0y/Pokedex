/**
link for pokemonList
https://www.pokemon.com/us/pokedex/
**/
let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=200';
    //array list of pokemon
    function add(pokemon){
        pokemonList.push(pokemon);
    }

    // adds functionality to pokemon buttons
    function addListItem(pokemon){
        let pokemonList = document.querySelector('.pokemon-list');
        let listPokemon = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('btn-primary', 'show-modal', 'group-list-item');
        button.setAttribute('data-toggle', 'modal');
        listPokemon.appendChild(button);
        pokemonList.appendChild(listPokemon);
        button.addEventListener('click', function (){
            showDetails(pokemon);
        })
        

    }
    // function to return all items of pokemonList from outside IIFE
    function getAll(){
        return pokemonList;
    }
    async function loadList() {
        return fetch(apiUrl).then(function (response) {
          return response.json();
        }).then(function (json) {
          json.results.forEach(function (item) {
            let pokemon = {
              name: item.name,
              detailsUrl: item.url
            };
            add(pokemon);
            console.log(pokemon);
          });
        }).catch(function (e) {
          console.error(e);
        })
      }
      async function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
          return response.json();
        }).then(function (details) {
            // Now we add the details to the item
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.types = details.types.map((item) => item.type.name);
        }).catch(function (e) {
          console.error(e);
        });
      }

      // logs pokemon stats
      function showDetails(pokemon){
        loadDetails(pokemon).then(function(){
          showModal(pokemon.name, pokemon.height, pokemon.types, pokemon.imageUrl);

          console.log(pokemon);


        });
      }

  
      function showModal(name, height, types, imageUrl) {
        let modalContainer = document.querySelector('#modal-container');

                
        modalContainer.innerHTML = ''; // clear all existing modal content

        let modal = document.createElement('div');
        modal.classList.add('modal');
        // modal.classList.add('modal-circle')



        //hide modal
      function hideModal(){
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.classList.remove('is-visible');
      }
                        // X button
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'X';
        closeButtonElement.addEventListener('click', hideModal);
        closeButtonElement.setAttribute('aria-label', 'close');

        modalContainer.addEventListener('click', (e) => {
      //only closes if clicking on the overlay
          let target = e.target;
          if (target === modalContainer) {
            hideModal();
          }
        });
        // add new modal content
        let pokemonName = document.createElement('h1');
        pokemonName.innerText = name;

        let contentElement = document.createElement('p');
        contentElement.innerHTML = "Height: " + height + '<br>' + " Types: " + types;

        let imageElement = document.createElement("img");
        imageElement.setAttribute("src", imageUrl);
        imageElement.classList.add('pokeimg')



        modal.appendChild(closeButtonElement);
        modal.appendChild(pokemonName);
        modal.appendChild(imageElement);
        modal.appendChild(contentElement);
        modalContainer.appendChild(modal);
        modalContainer.classList.add('is-visible');
      }  
      
      // esc key functionality to de-select pokemon modal     
      window.addEventListener('keydown', (e) => {
        function hideModal(){
          let modalContainer = document.querySelector('#modal-container');
          modalContainer.classList.remove('is-visible');
        }
        let modalContainer = document.querySelector('#modal-container');
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
          hideModal();  
        }
      });
            return {
              add: add,
              getAll: getAll,
              addListItem: addListItem,
              loadList: loadList,
              loadDetails: loadDetails,
              showDetails: showDetails
            };
})();


//function to load pokemon list
pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});











