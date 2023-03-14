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
    relativeId,
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
    this.relativeId = relativeId;
    this.name = name;
    this.gender = gender;
    this.height = +height;
    this.mass = mass;
    this.hair = hair;
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
    charValue,
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

// CREATE AND APPEND LI-ELEMENT
let createAndAppendLi = (character, pos, element) => {
  element.innerHTML = "";
  Object.entries(character).forEach(([key, value]) => {
    if (!["name", "pictureUrl", "relativeId"].includes(key)) {
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

// COMPARE TWO CHARACTERS
let compare = (charOne, posOne, charTwo, posTwo) => {
  Object.entries(charOne).forEach(([key, value]) => {
    if ([charTwo].includes(key)) {
      console.log(key, charTwo);
    }
  });
};

//COMPARE BUTTON
compareBtn.addEventListener("click", async () => {
  if ("0" === (charOne.value || charTwo.value)) {
    console.log("can't compare one or none");
  } else {
  }
});

//SELECTION EVENTLISTENER
// 1
charOne.addEventListener("change", async () => {
  ulOne.classList = "hidden";
  let picture = getPicture(charOne.value, pictures);
  showNameImg(picture, nameOne, imgOne);
  let one = await createCharacter(charOne.value, pictures);
  createAndAppendLi(one, 1, ulOne);
});
// 2
charTwo.addEventListener("change", async () => {
  ulTwo.classList = "hidden";
  let picture = getPicture(charTwo.value, pictures);
  showNameImg(picture, nameTwo, imgTwo);
  let two = await createCharacter(charTwo.value, pictures);
  createAndAppendLi(two, 2, ulTwo);
});
