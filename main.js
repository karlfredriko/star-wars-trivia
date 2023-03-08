//DOM REFERENCES
let containerOne = document.querySelector("#containerOne");
let containerTwo = document.querySelector("#containerTwo");
let charOne = document.querySelector("#charSelectOne");
let lukeBtn = document.querySelector("#lukeBtn");

let fetchData = async (peopleVal) => {
  let data = await fetch(`https://swapi.dev/api/people/${peopleVal}/`);
  let json = data.json();
  return json;
};

let fetchLuke = async () => {
  let data = await fetch(`https://swapi.dev/api/people/1/`);
  let json = data.json();
  return json;
};

lukeBtn.addEventListener("click", async () => {
    let data = await fetchLuke();
    console.log(data)
    let infoOne = document.querySelector("#infoOne");
    infoOne.innerHTML = `
    
    `;
})

class Character {
  constructor(
    name,
    gender,
    height,
    mass,
    hairColor,
    skinColor,
    eyeColor,
    movies,
    pictureUrl
  ) {
    this.name = name;
    this.gender = gender;
    this.height = height;
    this.mass = mass;
    this.hairColor = hairColor;
    this.skinColor = skinColor;
    this.eyeColor = eyeColor;
    this.movies = movies;
    this.pictureUrl = pictureUrl;
  }
}

let printData = async () => {
  let data = await fetchData(charOne.value);
  console.log(data);
  containerOne.innerHTML += `<p>${data.name}</p>`;
  console.log(data);
};

charOne.addEventListener("change", () => {
  console.log("charOne reporting");
  printData();
});
