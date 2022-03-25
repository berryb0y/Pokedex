// height - meters
// weight - pounds


let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon){
        pokemonList.push(pokemon);
    }



    function addListItem(pokemon){
        let pokemonList = document.querySelector('.pokemon-list');
        let listPokemon = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('btn-primary');
                button.classList.add('show-modal');
        listPokemon.appendChild(button);
        pokemonList.appendChild(listPokemon);
        button.addEventListener('click', function (){
            showDetails(pokemon);
        })
        

        // if (pokemon.type == "water") {
        //     pokemon.classList.add('water');
        // }; test

    }

    function getAll(){
        return pokemonList;
    }
    function loadList() {
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
    function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url).then(function (response) {
        return response.json();
      }).then(function (details) {
          // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
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

  // modal
function showModal(name, height, types, imageUrl) {
  let modalContainer = document.querySelector('#modal-container');
// 
          // clear all existing modal content
  modalContainer.innerHTML = '';

  let modal = document.createElement('div');
  modal.classList.add('modal');



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
  contentElement.innerText = height + types + imageUrl;
//                                            

// Image Test
  // let imageElement = document.createElement('img');
  // imageElement.querySelector('pokeimage')
  // imageElement.setAttribute ("src", imageUrl);



  modal.appendChild(closeButtonElement);
  modal.appendChild(pokemonName);
  modal.appendChild(contentElement);
  modalContainer.appendChild(modal);
  modalContainer.classList.add('is-visible');
}  
                      // esc key     

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



pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});











