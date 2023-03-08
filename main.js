//DOM REFERENCES
let containerOne = document.querySelector("#containerOne")
let containerTwo = document.querySelector("#containerTwo")
let charOne = document.querySelector("#charSelectOne")

let fetchData = async (peopleVal) => {
    let data = await fetch(`https://swapi.dev/api/people/${peopleVal}/`);
    let json = data.json();
    return json;
};



let printData = async () => {
    let data = await fetchData(charOne.value);
    console.log(data)
    containerOne.innerHTML += `<p>${data.name}</p>`;
    console.log(data);
};

charOne.addEventListener("change", () => {
    console.log("charOne reporting")
    printData()
})

