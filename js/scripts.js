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
        console.log(pokemon);
      });
    }
    
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
















// OLD POKEMON IF ELSE STATEMENT

// if (pokemon.height > 1.5){
//     document.write(pokemon.name + " " + pokemon.height + "m " + " This is a big pokemon!! <br/>")
// }
// else if (pokemon.height > 0.5 && pokemon.height < 1.5){
//         document.write(pokemon.name + " " + pokemon.height + "m <br/>")
// }
// else {
//     document.write(pokemon.name + " " + pokemon.height + "m <br/>")};














// let pokemonList1 = {
//     name: "Bulbasaur",
//     number: "001",
//     height: "0.7",
//     weight: "15.2", 
//     type: ["grass", "poison"]
// };

// Object.keys(pokemonList1.forEach(function(property) {
//     document.write(pokemonList1[property]);
// });

// function printArrayDetails(list){
//     for (let i = 0; i < list.length; i++){
//         if (list[i].height > 1.5){
//         document.write(list[i].name + " " + list[i].height + "m " + " This is a big pokemon!! <br/>")
//         }else if (list[i].height > 0.5 && list[i].height < 1.5){
//         document.write(list[i].name + " " + list[i].height + "m <br/>")
//          }else {document.write(list[i].name + " " + list[i].height + "m <br/>")};
//     }
// }   
// printArrayDetails(pokemonList);


