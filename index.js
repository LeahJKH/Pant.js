import { peopleArray } from "./module.js";
import { Elements } from "./module.js";

document.addEventListener("DOMContentLoaded", (e) => {
  function GetChecklist() {
    for (let i = 0; i < peopleArray.length; i++) {
      Elements.peopleCheckList.innerHTML += ` <input type="checkbox" name="peoplePresent" /><label for="peoplePresent">${peopleArray[i]}</label>`;
    }
  }

  function randomizer() {}
  GetChecklist();
});

//note to kai:

make a