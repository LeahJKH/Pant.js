import * as fs from "node:fs";
import { filePath } from "./makePanteObject.mjs";
let data = fs.readFileSync(filePath);
let pantePersonArray = JSON.parse(data);
let count = 0;
let winnerBracket = [];
/**
 * Randomiserer hvor folk er i et array.
 * @param array
 * @returns
 */
const shuffleArray = (array) => {
  let shuffledArray = array.map((element) => {
    return element;
  });
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const randIndex = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[randIndex]] = [
      shuffledArray[randIndex],
      shuffledArray[i],
    ];
  }
  return shuffledArray;
};

/**
 * Viser "vinnerene" og adjuster deres vinnersjanse til neste gang.
 * @param array arrayet med vinnerene
 */
const displayWinners = (array) => {
  console.log(count);
  winnerBracket.forEach((winner) => {
    winner.weightAdjust += pantePersonArray.length / 2 - 1;
  });
  displayUsers(winnerBracket);
  array.forEach((user) => {
    user.weightAdjust -= 1;
  });
  pantePersonArray = array.concat(winnerBracket);
  pantePersonArray.forEach((user) => {
    user.coinFlipChance = 50;
  });
  saveArray(pantePersonArray);
};
/**
 * velger to random pantere fra arrayet, delvis basert på vanskelighets"vekt"
 * Skjekker for hver bruker om deres "weight" er høyrere enn et random tall. Kjører til den treffer to stk som er det.
 * Balanserer alle brukere på en "weight" mellom 60-70. Vil alltid velge blandt de med høyest tall. Virker som er rettferdig nok. Velger skjeldent samme person flere ganger.
 * @param array
 */
const pickPanter = (array, number) => {
  count++;
  const randomizedArray = shuffleArray(array);
  randomizedArray.forEach((user) => {
    const weightAdjust = user.coinFlipChance / user.weightAdjust;
    const standardWeight = user.coinFlipChance * weightAdjust;
    if (standardWeight > number) {
      if (user.coinFlipChance > 10) {
        user.coinFlipChance -= 1;
      }
      winnerBracket.push(user);
      randomizedArray.splice(randomizedArray.indexOf(user), 1);
    } else {
      if (user.coinFlipChance < 90) {
        user.coinFlipChance += 1;
      }
    }
  });
  if (winnerBracket.length < 2 || winnerBracket.length > 2) {
    pantePersonArray = randomizedArray.concat(winnerBracket);
    winnerBracket = [];
    pickPanter(pantePersonArray, randomNumber());
  } else {
    return displayWinners(randomizedArray);
  }
};
/**
 * lager et random tall mellom 1 og 100
 * @returns
 */
const randomNumber = () => {
  const number = Math.ceil(Math.random() * 100);
  return number;
};
/**
 * Lagrer arrayet med oppdaterte stats til localStorage
 * @param array
 */
const saveArray = (array) => {
  fs.writeFileSync(filePath, JSON.stringify(array), null, 2);
};

const displayUsers = (array) => {
  array.forEach((user) => {
    console.log(user);
  });
};

pickPanter(pantePersonArray, randomNumber());
