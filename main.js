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
let infoBox = document.querySelector("#information");

//GLOBALS
let one = {};
let two = {};
let comparisonData = {};

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
    this.hair = hair === "n/a" ? "none" : hair;
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

// // APPENDING TEST-CHARACTERS
// let testImgOne = getPicture(12, pictures);
// showNameImg(testImgOne, nameOne, imgOne);
// createAndAppendLi(testOne, 1, ulOne);

// let testImgTwo = getPicture(13, pictures);
// showNameImg(testImgTwo, nameTwo, imgTwo);
// createAndAppendLi(testTwo, 2, ulTwo);

// COMPARE ARRAYS
let compareValues = (obj1, obj2) => {
  infoBox.classList = "";
  console.log(comparisonData);
  let { tallest, heaviest, filmComp, gender, hair, skin } = comparisonData;
  infoBox.innerHTML = `<h3>Hey Kids! Let's compare!</h3>
  <p>${tallest.name} is longest.<br>
  ${heaviest.name} is heaviest.<br>
  ${filmComp}<br>
  And how similar is ${obj1.name} and ${obj2.name}?<br>
  It would seem that their gender ${gender},<br>
  the color of their hair ${hair}.<br>
  And lastly, their skin color ${skin}.</p>`;
};

function createComparisonData(obj1, obj2) {
  comparisonData = {
    heaviest: getLargestNumber(obj1.mass, obj2.mass),
    lightest: getSmallestNumber(obj1.mass, obj2.mass),
    tallest: getLargestNumber(obj1.height, obj2.height),
    shortest: getSmallestNumber(obj1.height, obj2.height),
    filmComp: filmComparison(obj1.films.length, obj2.films.length),
    gender: isSame(obj1.gender, obj2.gender),
    hair: isSame(obj1.hair, obj2.hair),
    skin: isSame(obj1.skin, obj2.skin),
  };
  if (
    comparisonData.filmComp.includes(one.name) &&
    comparisonData.filmComp.includes(two.name)
  ) {
    document.getElementById(`films${one.relativePos}`).classList.add("green");
    document.getElementById(`films${two.relativePos}`).classList.add("green");
  } else if (!comparisonData.filmComp.includes(two.name)) {
    document.getElementById(`films${one.relativePos}`).classList.add("green");
    document.getElementById(`films${two.relativePos}`).classList.add("red");
  } else {
    document.getElementById(`films${one.relativePos}`).classList.add("red");
    document.getElementById(`films${two.relativePos}`).classList.add("green");
  }

  document
    .getElementById(`mass${comparisonData.heaviest.relativePos}`)
    .classList.add("green");
  document
    .getElementById(`mass${comparisonData.lightest.relativePos}`)
    .classList.add("red");
  document
    .getElementById(`height${comparisonData.tallest.relativePos}`)
    .classList.add("green");
  document
    .getElementById(`height${comparisonData.shortest.relativePos}`)
    .classList.add("red");
}

// height1
// mass1
// films1

// COMPARISON FUNCTIONS
function getLargestNumber(num1, num2) {
  if (typeof num1 === "string") {
    return two;
  } else if (typeof num2 === "string") {
    return one;
  }
  return num1 > num2 ? one : two;
}
function getSmallestNumber(num1, num2) {
  if (typeof num1 === "string") {
    return one;
  } else if (typeof num2 === "string") {
    return two;
  }
  return num1 < num2 ? one : two;
}
function filmComparison(num1, num2) {
  if (num1 === num2) {
    return `${one.name} and ${two.name} have been in the same amount of films!`;
  } else if (num1 > num2) {
    return `${one.name} have been in the most amount of films.`;
  } else {
    return `${two.name} have been in the most amount of films.`;
  }
}

function isSame(str1, str2) {
  return str1 == str2 ? "is the same" : "is not the same";
}
// CYCLE CLASSES
let clearClasses = (pos) => {
  pos.forEach((e) => {
    e.classList = "";
  });
};

//COMPARE BUTTON
compareBtn.addEventListener("click", () => {
  if ("0" === (charOne.value || charTwo.value)) {
    console.log("can't compare one or none");
  } else {
    infoBox.classList = "hidden";
    createComparisonData(one, two);
    compareValues(one, two);
  }
});

//SELECTION EVENTLISTENER
// 1
charOne.addEventListener("change", async () => {
  infoBox.classList = "hidden";
  let allLi = document.querySelectorAll("#infoTwo li");
  clearClasses(allLi);
  ulOne.classList = "hidden";
  let picture = getPicture(charOne.value, pictures);
  showNameImg(picture, nameOne, imgOne);
  one = await createCharacter(charOne.value, pictures, 1);
  createAndAppendLi(one, 1, ulOne);
  console.log(one);
  return one;
});
// 2
charTwo.addEventListener("change", async () => {
  infoBox.classList = "hidden";
  let allLi = document.querySelectorAll("#infoOne li");
  clearClasses(allLi);
  ulTwo.classList = "hidden";
  let picture = getPicture(charTwo.value, pictures);
  showNameImg(picture, nameTwo, imgTwo);
  two = await createCharacter(charTwo.value, pictures, 2);
  createAndAppendLi(two, 2, ulTwo);
  console.log(two);
  return two;
});
