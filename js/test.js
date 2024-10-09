const choiceFrequencies = [0, 0, 0, 0, 0, 0, 0, 0]; 
const past_choices_storing = []
const FreqMap = new Map();
for (let i = 0; i <= 7; i++) {
    for (let j = 0; j <= 7; j++) {
        const key = [i, j];
        FreqMap.set(JSON.stringify(key), 0);
    }
  }
function multiplyMapValues(map, scalar) {
      for (const [key, value] of map) {
        map.set(key, value * scalar);
      }
    }


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const sequence = [];
const length = 1000;

for (let i = 0; i < length; i++) {
  const randomInt = getRandomInt(0, 7);
  sequence.push(randomInt);
}



const outcomes = [];
for (const choice of sequence) {
  // Store all past choices
   past_choices_storing.push(choice)
    // first two responses always lead to reward
  if  (past_choices_storing.length === 1 ) {
      outcome = 1  
      } else {
          last_three_sequence = past_choices_storing.slice(-2);

          const current_freq = FreqMap.get(JSON.stringify(last_three_sequence))
          const valuesFreq = Array.from(FreqMap.values());
          const copy_valuesFreq = valuesFreq.slice()
          copy_valuesFreq.sort((a, b) => a - b);
          const index = copy_valuesFreq.indexOf(current_freq);
          if (index <= 15) {
            outcome = 1
          } else {
            outcome = 0
          }
          
          for (let i = 0; i <= 7; i++) {
            for (let j = 0; j <= 7; j++) {
                const key = [i, j];
                FreqMap.set(JSON.stringify(key), FreqMap.get(JSON.stringify(key))+(1/63));
            }
          }
          FreqMap.set(JSON.stringify(last_three_sequence), FreqMap.get(JSON.stringify(last_three_sequence))+1-(1/63)); // Set the new value
          multiplyMapValues(FreqMap, 0.984)
      }
  outcomes.push(outcome)
}

let sum = 0;

for (let i = 0; i < outcomes.length; i++) {
  sum += outcomes[i];
}


//missing piece
const current_freq = FreqMap.get(JSON.stringify(last_three_sequence))
const valuesFreq = Array.from(FreqMap.values());
const copy_valuesFreq = valuesFreq.slice()
copy_valuesFreq.sort((a, b) => a - b);
const index = copy_valuesFreq.indexOf(current_freq);
//error above this
if (index <= 15) {
    response.outcome = 1
    } else {
    response.outcome = 0
    }

for (let i = 0; i <= 7; i++) {
    for (let j = 0; j <= 7; j++) {
        const key = [i, j];
        FreqMap.set(JSON.stringify(key), FreqMap.get(JSON.stringify(key))+(1/63));
    }
}
FreqMap.set(JSON.stringify(last_three_sequence), FreqMap.get(JSON.stringify(last_three_sequence))+1-(1/63)); // Set the new value
multiplyMapValues(FreqMap, 0.984)