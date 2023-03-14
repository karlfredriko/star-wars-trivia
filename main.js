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
    relativePos,
    name,
    gender,
    height,
    mass,
    hair,
    skin,
    eyes,
    films,
    pictureUrl
  ) {
    this.relativePos = relativePos;
    this.name = name;
    this.gender = gender;
    this.height = +height ? +height : "unknown";
    this.mass = isNumber(mass);
    this.hair = hair === "n/a" ? "none" : "none";
    this.skin = skin;
    this.eyes = eyes;
    this.films = films;
    this.pictureUrl = pictureUrl;
  }
}

//PICTURE OBJECT
let pictures = [
  {
    id: 1,
    name: "Luke Skywalker",
    url: "assets/luke_skywalker.png",
  },
  {
    id: 12,
    name: "Wilhuff Tarkin",
    url: "assets/Wilhuff_Tarkin.png",
  },
  {
    id: 22,
    name: "Boba Fett",
    url: "assets/Boba_Fett.png",
  },
  {
    id: 13,
    name: "Chewbacca",
    url: "assets/Chewbacca.png",
  },
  {
    id: 16,
    name: "Jabba Desilijic Tiure",
    url: "assets/Jabba__the_Hut__.png",
  },
  {
    id: 27,
    name: "Ackbar",
    url: "assets/general_ackbar.png",
  },
];

// FORMATTING NUMBERS
let isNumber = (input) => {
  let result = input;
  if (typeof input === "string" && input.includes(",")) {
    result = input.replace(",", "");
  }
  return +result ? +result : "unknown";
};

console.log(isNumber("1,43"));

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
let createCharacter = async (charValue, pictureArray, position) => {
  let picture = getPicture(charValue, pictureArray);
  let fetchVal = `people/${charValue}/`;
  let data = await fetchData(fetchVal);
  let { name, hair_color, height, mass, gender, skin_color, eye_color, films } =
    data;
  let newChar = new Character(
    position,
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

// PRINT INFORMATION ON DOM - !!UNUSED!!
let printInfo = (character, element, id) => {
  element.innerHTML = `
      <li>input from id:${id}</li>
      <li>Hair: ${character.hair}</li>
      <li>Height: ${character.height}</li>
      <li>Weight: ${character.mass}</li>
      <li>Gender: ${character.gender}</li>
      <li>Skin: ${character.skin}</li>
      <li>Eyes: ${character.eyes}</li>
      <li>Movies: ${character.films.length}</li>
    `;
  element.classList = "";
};

// CAPITALIZE FIRST LETTER
function capitalize(s) {
  return s[0].toUpperCase() + s.slice(1);
}

let testOne = new Character(
  1,
  "Wilhuff Tarkin",
  "male",
  180,
  "unknown",
  "auburn, grey",
  "fair",
  "blue",
  ["https://swapi.dev/api/films/1/", "https://swapi.dev/api/films/6/"],
  "assets/Wilhuff_Tarkin.png"
);
console.log(testOne);

let testTwo = new Character(
  2,
  "Chewbacca",
  "male",
  228,
  112,
  "brown",
  "unknown",
  "blue",
  [
    "https://swapi.dev/api/films/1/",
    "https://swapi.dev/api/films/2/",
    "https://swapi.dev/api/films/3/",
    "https://swapi.dev/api/films/6/",
  ],
  "assets/Chewbacca.png"
);
console.log(testTwo);

// CREATE AND APPEND LI-ELEMENT
let createAndAppendLi = (character, pos, element) => {
  element.innerHTML = "";
  Object.entries(character).forEach(([key, value]) => {
    if (!["name", "pictureUrl", "relativePos"].includes(key)) {
      let li = document.createElement("li");
      li.id = `${key}${pos}`;
      if (key === "films") {
        li.textContent = `${capitalize(`${key}`)}: ${value.length}`;
      } else if (typeof value === "string") {
        li.textContent = `${capitalize(`${key}`)}: ${capitalize(`${value}`)}`;
      } else {
        li.textContent = `${capitalize(`${key}`)}: ${value}`;
      }
      element.append(li);
      console.log(`${key}: ${value}`);
    }
  });
  element.classList = "";
};

// APPENDING TEST-CHARACTERS
let testImgOne = getPicture(12, pictures);
showNameImg(testImgOne, nameOne, imgOne);
createAndAppendLi(testOne, 1, ulOne);

let testImgTwo = getPicture(13, pictures);
showNameImg(testImgTwo, nameTwo, imgTwo);
createAndAppendLi(testTwo, 2, ulTwo);

// COMPARE TWO CHARACTERS
let compare = (charOne, charTwo) => {
  let greatestOne = makeGreatestArr(charOne);
  let greatestTwo = makeGreatestArr(charTwo);
  console.log(charOne.name, greatestOne, charTwo.name, greatestTwo);
};
// MAKE ARRAYS TO COMPARE WITH
let makeGreatestArr = (character) => {
  let arr = [character.height, character.mass, character.films.length];
  return arr;
};
let makeSameArr = (character) => {
  let arr = [character.gender, character.hair, character.skin];
  return arr;
};

//COMPARE BUTTON
compareBtn.addEventListener("click", async () => {
  // if ("0" === (charOne.value || charTwo.value)) {
  //   console.log("can't compare one or none");
  // } else {
  // }
  compare(testOne, testTwo);
});

//SELECTION EVENTLISTENER
// 1
charOne.addEventListener("change", async () => {
  ulOne.classList = "hidden";
  let picture = getPicture(charOne.value, pictures);
  showNameImg(picture, nameOne, imgOne);
  let one = await createCharacter(charOne.value, pictures, 1);
  createAndAppendLi(one, 1, ulOne);
  console.log(one);
});
// 2
charTwo.addEventListener("change", async () => {
  ulTwo.classList = "hidden";
  let picture = getPicture(charTwo.value, pictures);
  showNameImg(picture, nameTwo, imgTwo);
  let two = await createCharacter(charTwo.value, pictures, 2);
  createAndAppendLi(two, 2, ulTwo);
  console.log(two);
});
