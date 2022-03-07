// height - meters
// weight - pounds

// Below the pokemonList array in your “scripts.js” file, create a for loop that iterates over each item in pokemonList:
// Use document.write() inside the loop’s code to write the Pokémon name on your website’s DOM.
// Use what you’ve learned about adding strings in JavaScript to write the Pokémon’s height next to its name, for example, “Bulbasaur (height: 7)”.
let pokemonList = [
    {name: "Bulbasaur",
    number: "001",
    height: "0.7",
    weight: "15.2", 
    type: ["grass", "poison"]},
    
    {name: "Charmander",
    number: "004",
    height: "0.6",
    weight: "18.7",
    type: "fire"},
   
    {name: "Charizard",
    number: "006",
    height: "1.7",
    weight: "199.5",
    type: "water"},
   
    {name: "Squirtle",
    number: "007",
    height: "0.6",
    weight: "19.8",
    type: "water"}
];
let emptyObject = {};
for (let i = 0; i < pokemonList.length; i++){
    if (pokemonList[i].height > 1.5){
        document.write(pokemonList[i].name + " " + pokemonList[i].height + " m " + " This is a big pokemon!! <br/>")
    }else if (pokemonList[i].height > 0.5 && pokemonList[i].height < 1.5){
        document.write(pokemonList[i].name + " " + pokemonList[i].height + "m <br/>")
    }else {document.write(pokemonList[i].name + " " + pokemonList[i].height + "m <br/>")};
}

// for (let i = 0; i < pokemonList.length; i++){
    // if (pokemonList[i].height > 1.5){
        // document.write(pokemonList[i].name + " This is a big pokemon!! ")
    // }else if (pokemonList[i].height > 0.5 && pokemonList[i].height < 1.5){
        // document.write(pokemonList[i].name + " This is an average pokemon ")
    // }else {document.write(pokemonList[i].name + " This is a small pokemon ")};
// }

    
