import { peopleArray } from "./module.js";
import { Elements } from "./module.js";

document.addEventListener("DOMContentLoaded", (e) => {
  const OfficePeople = [];
  let randomPeople;
  const firstPerson = document.getElementById('firstPerson');
  const secondPerson = document.getElementById('secondPerson');

  function GetChecklist() {
    for (let i = 0; i < peopleArray.length; i++) {
      Elements.peopleCheckList.innerHTML += `<input type="checkbox" name="peoplePresent" /><label for="peoplePresent">${peopleArray[i]}</label>`;
    }
  }

  Elements.submitPeople.addEventListener("click", function () {
    const checkboxes = document.querySelectorAll('input[name="peoplePresent"]');
    checkboxes.forEach((checkbox, index) => {
      if (checkbox.checked) {
        OfficePeople.push(peopleArray[index]);
      }
    });
console.log(OfficePeople)
    randomizer1();
    randomizer2();
  });

  function randomizer1() {
    randomPeople = Math.floor(Math.random() * OfficePeople.length);
    secondPerson.textContent = OfficePeople[randomPeople];
  }

  function randomizer2() {
    randomPeople = Math.floor(Math.random() * OfficePeople.length);
    firstPerson.textContent = OfficePeople[randomPeople];
  }

  GetChecklist();
});
//note to kai:
//make a randomizer that pulls people from the array, that also checks if the people are present or not)
