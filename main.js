//DOM REFERENCES
let containerOne = document.querySelector("#containerOne");
let containerTwo = document.querySelector("#containerTwo");
let charOne = document.querySelector("#charSelectOne");
let charTwo = document.querySelector("#charSelectTwo");
let nameOne = document.querySelector("#nameOne");
let nameTwo = document.querySelector("#nameTwo");
let imgOne = document.querySelector("#imgOne");
let imgTwo = document.querySelector("#imgTwo");
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
    this.mass = +mass;
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
  console.log(value);
  return value;
};

//COMPARE BUTTON
compareBtn.addEventListener("click", async () => {
  let pictureOne = getPicture(charOne.value, pictures);
  let fetchValOne = `people/${charOne.value}/`;
  let dataOne = await fetchData(fetchValOne);
  let { name, hair_color, height, mass, gender, skin_color, eye_color, films } =
    dataOne;
  let one = new Character(
    name,
    gender,
    height,
    mass,
    hair_color,
    skin_color,
    eye_color,
    films,
    pictureOne.url
  );
  console.log("raw data", dataOne);
  console.log("Character", one);
  let infoOne = document.querySelector("#infoOne");
  infoOne.innerHTML = `
      <li>input from id:${charOne.value}</li>
      <li>Haircolor: ${one.hairColor}</li>
      <li>Height: ${one.height}</li>
      <li>Weight: ${one.mass}</li>
      <li>Gender: ${one.gender}</li>
      <li>Skin: ${one.skinColor}</li>
      <li>Eyes: ${one.eyeColor}</li>
      <li>Movies: ${one.films.length}</li>
    `;
  infoOne.classList = "";
});

//PRINTING OUT DATA?
let printData = async (charValue, imgUrlArr) => {
  let data = await fetchData(charValue);
  console.log(data);
};

//SELECTION EVENTLISTENER
// 1
charOne.addEventListener("change", () => {
  let picture = getPicture(charOne.value, pictures);
  console.log(picture);
  showNameImg(picture, nameOne, imgOne);
});
// 2
charTwo.addEventListener("change", () => {
  let picture = getPicture(charTwo.value, pictures);
  console.log(picture);
  showNameImg(picture, nameTwo, imgTwo);
});
