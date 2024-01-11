import * as fs from "node:fs";
/* Skift ut denne med en fetch fra live f.eks hvis dette scriptet skal kjøres på en server. */
import { peopleArray } from "./module.mjs";
class PantePerson {
  name;
  weightAdjust;
  coinFlipChance;
  constructor(name, weight) {
    this.name = name;
    this.weightAdjust = weight;
    this.coinFlipChance = weight;
  }
}

const pantePersonData = peopleArray.map((person) => {
  return new PantePerson(person, 50);
});
const filePath = "./PantePersonDataObject.json";
fs.writeFileSync(filePath, JSON.stringify(pantePersonData), null, 2);
