import { peopleArray } from "./module.js";

/* Flyttet den over her så ikke terminalen skulle bli sur og lure wtf er elements hver gang jeg kjørte. */
const Elements = {
  peopleCheckList: document.querySelector("#People-checklist"),
  peopleRandom: document.querySelector("#Pant-randomizer"),
  firstPerson: document.querySelector("#first-Person"),
  secondPerson: document.querySelector("#second-Person"),
  submitPeople: document.querySelector("#Submit-People"),
};

document.addEventListener("DOMContentLoaded", (e) => {
  let OfficePeople = [];
  let randomPeople;
  let personCheck = "";
  let trustedPerson = "";
  const firstPerson = document.getElementById("firstPerson");
  const secondPerson = document.getElementById("secondPerson");

  function GetChecklist() {
    for (let i = 0; i < peopleArray.length; i++) {
      Elements.peopleCheckList.innerHTML += `<div class="nameBox"><input type="checkbox" name="peoplePresent" /><label for="peoplePresent">${peopleArray[i]}</label></div>`;
    }
  }

  Elements.submitPeople.addEventListener("click", function () {
    const checkboxes = document.querySelectorAll('input[name="peoplePresent"]');
    checkboxes.forEach((checkbox, index) => {
      if (checkbox.checked) {
        OfficePeople.push(peopleArray[index]);
      }
    });
    console.log(OfficePeople);
    randomizer1();
  });

  function randomizer1() {
    randomPeople = Math.floor(Math.random() * OfficePeople.length);
    personCheck = OfficePeople.splice(randomPeople, 1)[0];
    secondPerson.textContent = personCheck;
    randomizer2();
  }

  function randomizer2() {
    randomPeople = Math.floor(Math.random() * OfficePeople.length);
    trustedPerson = OfficePeople.splice(randomPeople, 1)[0];
    firstPerson.textContent = trustedPerson;
    console.log(OfficePeople);

    cleanup();
  }

  function cleanup() {
    OfficePeople = [];
  }

  GetChecklist();
});
//note to kai:
//make a randomizer that pulls people from the array, that also checks if the people are present or not)
