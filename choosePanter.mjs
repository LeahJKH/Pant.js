import * as fs from "node:fs";
const panterData = "./PantePersonDataObject.json";
const overTidData = "./dataArrayObject.json";

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
const displayWinners = (arrayOne, arrayTwo) => {
  console.log(count);
  winnerBracket.forEach((winner) => {
    if (winner.weightAdjust < 90)
      winner.weightAdjust += (winnerBracket.length + arrayOne.length) / 2 - 1;
  });
  displayUsers(winnerBracket);
  arrayOne.forEach((user) => {
    if (user.weightAdjust > winnerBracket.length + arrayOne.length)
      user.weightAdjust -= 1;
  });
  let pantePersonArray = arrayOne.concat(winnerBracket);
  pantePersonArray.forEach((user) => {
    user.coinFlipChance = 50;
  });
  saveArray(pantePersonArray, arrayTwo);
};
/**
 * velger to random pantere fra arrayet, delvis basert på vanskelighets"vekt"
 * Skjekker for hver bruker om deres "weight" er høyrere enn et random tall. Kjører til den treffer to stk som er det.
 * Balanserer alle brukere på en "weight" mellom 60-70. Vil alltid velge blandt de med høyest tall. Virker som er rettferdig nok. Velger skjeldent samme person flere ganger.
 * @param array
 */
const pickPanter = (arrayOne, arrayTwo, number) => {
  count++;
  winnerBracket = [];
  const randomizedArray = shuffleArray(arrayOne);
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
    let pantePersonArray = randomizedArray.concat(winnerBracket);
    pickPanter(pantePersonArray, arrayTwo, randomNumber());
  } else {
    return displayWinners(randomizedArray, arrayTwo);
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
const saveArray = (arrayOne, arrayTwo) => {
  fs.writeFileSync(panterData, JSON.stringify(arrayOne), null, 2);
  const finalCount = { count };
  arrayOne.push(finalCount);
  arrayTwo.push(arrayOne);
  fs.writeFileSync(overTidData, JSON.stringify(arrayTwo), null, 2);
};

const displayUsers = (array) => {
  array.forEach((user) => {
    user.win++;
  });
};

const storeParse = (data1, data2) => {
  let parsedData1 = JSON.parse(data1);
  let parsedData2 = JSON.parse(data2);
  const dataArray = [parsedData1, parsedData2];
  return dataArray;
};

const fetchData = () => {
  let panteData = fs.readFileSync(panterData);
  let dataOverTime = fs.readFileSync(overTidData);
  let dataArray = storeParse(panteData, dataOverTime);
  return dataArray;
};

const runPage = () => {
  count = 0;
  let [parsedData1, parsedData2] = fetchData();
  console.log(parsedData1);
  pickPanter(parsedData1, parsedData2, randomNumber());
};

const returnPromise = async (ms) => {
  const returnedPromise = await new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
  return returnedPromise;
};

for (let i = 0; i < 100; i++) {
  await returnPromise(100);
  runPage();
}
