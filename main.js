//DOM REFERENCES
let containerOne = document.querySelector("#containerOne");
let containerTwo = document.querySelector("#containerTwo");
let charOne = document.querySelector("#charSelectOne");
let charTwo = document.querySelector("#charSelectTwo");
let lukeBtn = document.querySelector("#lukeBtn");

//PICTURE OBJECT
let pictures = [
  {
    id: 1,
    name: "Luke Skywalker",
    url: "https://static.wikia.nocookie.net/starwars/images/3/3d/LukeSkywalker.png",
  },
  {
    id: 12,
    name: "Wilhuff Tarkin",
    url: "https://static.wikia.nocookie.net/starwars/images/c/c1/Tarkininfobox.jpg",
  },
  {
    id: 22,
    name: "Boba Fett",
    url: "https://static.wikia.nocookie.net/starwars/images/5/5e/BobaFettMain2.png",
  },
  {
    id: 13,
    name: "Chewbacca",
    url: "https://static.wikia.nocookie.net/starwars/images/e/ec/ChewbaccaCSWE.jpg",
  },
  {
    id: 16,
    name: "Jabba 'the Hut' Desilijic Tiure",
    url: "https://static.wikia.nocookie.net/starwars/images/1/1f/JabbatheHutt-ToppsFinest2019.png",
  },
  {
    id: 27,
    name: "Ackbar",
    url: "https://static.wikia.nocookie.net/starwars/images/2/29/Admiral_Ackbar_RH.png",
  },
];

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

//PICTURE URL FUNCTION
let getPicture = (charValue, pictureArray) => {
  let value = {};
  pictureArray.forEach((e) => (e.id === charValue ? (value = e) : null));
  return value;
};

let test = getPicture(27, pictures);
let imgOne = document.querySelector("#imgOne");
console.log(test);
imgOne.src = test.url;

lukeBtn.addEventListener("click", async () => {
  let data = await fetchLuke();
  let { name, hair_color, height, mass, gender, skin_color, eye_color, films } =
    data;
  let one = new Character(
    name,
    gender,
    height,
    mass,
    hair_color,
    skin_color,
    eye_color,
    films
  );
  console.log(data);
  let infoOne = document.querySelector("#infoOne");
  infoOne.innerHTML = `
      <li>New input</li>
      <li>Haircolor: ${hair_color}</li>
      <li>Height: ${height}</li>
      <li>Weight: ${mass}</li>
      <li>Gender: ${gender}</li>
      <li>Skin: ${skin_color}</li>
      <li>Eyes: ${eye_color}</li>
      <li>Movies: ${films.length}</li>
    `;
});

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
