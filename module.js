let peopleArray = [
  "Stian",
  "Ghouthami",
  "Tord",
  "Eskil",
  "Moe",
  "Inna",
  "Erik",
  "Katerina",
  "Emilie",
  "Adrian",
  "Henry",
  "Tran",
  "Camilla",
  "Kristian",
  "Andreas",
  "Ilakia",
  "Espen",
  "Emir",
  "John",
  "Alexander S",
  "André K",
  "Adrian K",
  "Kristina",
  "Stein",
  "Sebastian",
  "Kristoffer",
  "Jesper",
  "Eirik",
  "Sindre",
  "Ingmar",
  "Stein Inge",
  "Trond Morten",
  "Robert",
  "Marius"
];

 const Elements = {
  peopleCheckList: document.querySelector("#People-checklist"),
  peopleRandom: document.querySelector("#Pant-randomizer"),
  firstPerson: document.querySelector("#first-Person"),
  secondPerson: document.querySelector("#second-Person"),
  submitPeople: document.querySelector("#Submit-People")
}; 

let filePath = "./users.json"
fs.writeFileSync(filePath, JSON.stringify(pantere))