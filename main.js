//DOM REFERENCES
let containerOne = document.querySelector("#containerOne");
let containerTwo = document.querySelector("#containerTwo");
let charOne = document.querySelector("#charSelectOne");
let charTwo = document.querySelector("#charSelectTwo");
let nameOne = document.querySelector("#nameOne");
let nameTwo = document.querySelector("#nameTwo");
let imgOne = document.querySelector("#imgOne");
let imgTwo = document.querySelector("#imgTwo");
let ulOne = document.querySelector("#infoOne");
let ulTwo = document.querySelector("#infoTwo");
let compareBtn = document.querySelector("#compareBtn");

//CHARACTER PROTOTYPE
class Character {
  constructor(
    name,
    gender,
    height,
    mass,
    hairColor,
    skinColor,
    eyeColor,
    films,
    pictureUrl
  ) {
    this.name = name;
    this.gender = gender;
    this.height = +height;
    this.mass = mass;
    this.hairColor = hairColor;
    this.skinColor = skinColor;
    this.eyeColor = eyeColor;
    this.films = films;
    this.pictureUrl = pictureUrl;
  }
}

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

//API-FUNCTION
let fetchData = async (value) => {
  let data = await fetch(`https://swapi.dev/api/${value}`);
  let json = data.json();
  return json;
};

//SHOW NAME/IMG FUNCTION
let showNameImg = (arr, nameElem, imgElem) => {
  nameElem.innerText = arr.name;
  imgElem.src = arr.url;
  imgElem.alt = `This is a picture of ${arr.name}`;
};

//PICTURE URL FUNCTION
let getPicture = (charValue, pictureArray) => {
  let value = {};
  pictureArray.forEach((e) => (e.id === +charValue ? (value = e) : null));
  return value;
};

// CREATE CHARACTER
let createCharacter = async (charValue, pictureArray) => {
  let picture = getPicture(charValue, pictureArray);
  let fetchVal = `people/${charValue}/`;
  let data = await fetchData(fetchVal);
  let { name, hair_color, height, mass, gender, skin_color, eye_color, films } =
    data;
  let newChar = new Character(
    name,
    gender,
    height,
    mass,
    hair_color,
    skin_color,
    eye_color,
    films,
    picture.url
  );
  return newChar;
};

// PRINT INFORMATION ON DOM
let printInfo = (character, element, id) => {
  element.innerHTML = `
      <li>input from id:${id}</li>
      <li>Haircolor: ${character.hairColor}</li>
      <li>Height: ${character.height}</li>
      <li>Weight: ${character.mass}</li>
      <li>Gender: ${character.gender}</li>
      <li>Skin: ${character.skinColor}</li>
      <li>Eyes: ${character.eyeColor}</li>
      <li>Movies: ${character.films.length}</li>
    `;
  element.classList = "";
};

//COMPARE BUTTON
compareBtn.addEventListener("click", async () => {
  let one = await createCharacter(charOne.value, pictures);
  let two = await createCharacter(charTwo.value, pictures);
  console.log("character One", one);
  console.log("character Two", two);
  printInfo(one, ulOne, charOne.value);
  printInfo(two, ulTwo, charTwo.value);
});

//SELECTION EVENTLISTENER
// 1
charOne.addEventListener("change", () => {
  let picture = getPicture(charOne.value, pictures);
  showNameImg(picture, nameOne, imgOne);
});
// 2
charTwo.addEventListener("change", () => {
  let picture = getPicture(charTwo.value, pictures);
  showNameImg(picture, nameTwo, imgTwo);
});
