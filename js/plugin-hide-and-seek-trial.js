var jsPsychHideAndSeekContextsTrial = (function (jspsych) {
    'use strict';
    
    const info = {
      name: 'hide-and-seek-trial',
      description: '',
      parameters: {
        choice_duration: {
          type: jspsych.ParameterType.INT,
          pretty_name: 'Trial duration',
          default: null,
          description: 'How long to show trial before it ends.'
        },
        feedback_duration: {
          type: jspsych.ParameterType.INT,
          pretty_name: 'Trial duration',
          default: 1500,
          description: 'How long to show feedback before it ends.'
        },
        opponent: {
            type: jspsych.ParameterType.STRING,
            pretty_name: 'Opponent',
            default: undefined,
            decription: 'Who is your opponent?'
        },
        variability: {
          type: jspsych.ParameterType.STRING,
          pretty_name: 'which context?',
          default: undefined,
          description: 'Stable, Volatile or Variable?'
        },
      }
    }
  
    /**
    * jspsych-hide-and-seek-trial
    * plugin for running one trial a hide and seek game with 8 hiding spots
    **/
    // functions
    function shuffle(array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    }

    function shuffle_exclusive(arr) {
      var indices = [];
      var min = Math.min(...arr);
      var max = Math.max(...arr);
  
      for (var i = 0; i < arr.length; i++) {
          if (arr[i] === min) {
              indices.push(i);
          }
      }
  
      var new_indices = [];
      for (var j = 0; j < indices.length; j++) {
          var randomIndex = Math.floor(Math.random() * indices.length);
          var randomElement = indices.splice(randomIndex, 1)[0];
          new_indices.push(randomElement);
      }
  
      // Clear the original array
      arr.fill(min);
  
      // Set max at the random indices
      arr[new_indices[0]] = max;
      arr[new_indices[1]] = max;
      arr[new_indices[2]] = max;
    }

    function multiplyMapValues(map, scalar) {
      for (const [key, value] of map) {
          map.set(key, value * scalar);
      }
    }

    function boxMullerTransform() {
      const u1 = Math.random();
      const u2 = Math.random();
      
      const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
      const z1 = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(2.0 * Math.PI * u2);
      
      return { z0, z1 };
    }

    function getNormallyDistributedRandomNumber(mean, stddev) {
      const { z0, _ } = boxMullerTransform();
      
      return z0 * stddev + mean;
    }

    function cumulativeSum(array) {
      let sum = 0; // initialize the sum variable
      return array.map(element => { // map each element to a new value
        sum += Number(element[0]); // access the first element of the sub-array and convert it to a number
        return sum; // return the updated sum
      });
    }

    function isLowerThan1000(num) { 
      return num < cols; 
      }

    // for VARIABLE context
    // Initialize the choice frequencies
    const choiceFrequencies = [0, 0, 0, 0, 0, 0, 0, 0]; 
    const past_choices_storing = []
    const outcomes = []
    const FreqMap = new Map(); // for variable reward schedule
    for (let i = 0; i <= 7; i++) {
        for (let j = 0; j <= 7; j++) {
            const key = [i, j];
            var v = Math.random() * (1.1 - 0.9) + 0.9;
            FreqMap.set(JSON.stringify(key), v);
        }
    }

    // for STABLE context
    const probs_reward_stable = [0.3,0.3,0.3,0.3,0.3,0.7,0.7,0.7]; // for stable reward schedule
    var current_probs_stable = jsPsych.randomization.repeat(probs_reward_stable, 1);


    // for VOLATILE context
    // the following code is to generate trial indices every +/- 15 trials, so reward probabilities can shuffle in the volatile context on these trial indices
    // to generate random numbers drawn from a normal distribution:
    // comes from: https://mika-s.github.io/javascript/random/normal-distributed/2019/05/15/generating-normally-distributed-random-numbers-in-javascript.html
    const cols = 2400;
    const shuffle_after_trial = []
    for (var tr = 0; tr < cols; tr++) {
      var normal_number = Math.round(getNormallyDistributedRandomNumber(15,3))
      shuffle_after_trial.push([normal_number])
      }
 
    var shuffle_at_trial = cumulativeSum(shuffle_after_trial)
    var shuffle_at_trial_col = shuffle_at_trial.filter(isLowerThan1000);
    // shuffle_at_trial_col is the resulting vector with randomized trial indices (every +/- 15 trials), N(15,3)
    // so at these trial indices, reward probabilities can be shuffled in volatile context
    const all_reward_schedule = [] // for volatile reward schedule
    const probs_reward_volatile = [0.1,0.1,0.1,0.1,0.1,0.9,0.9,0.9];
    shuffle(probs_reward_volatile);
    for (var j = 0; j < cols; j++) {
      const result = shuffle_at_trial_col.includes(j);
      if (result === true) {
        shuffle_exclusive(probs_reward_volatile);
      }
      all_reward_schedule.push([...probs_reward_volatile]); // Push a copy of first_array
    }
    // all_reward_schedule is for each trial an array containing the current reward probabilities for each option

      
    class HideAndSeekContextsTrialPlugin {
      constructor(jsPsych) {
        this.jsPsych = jsPsych;
      }
      trial(display_element, trial) {
  
        // ---------------------------------- //
        // Draw environment                   //
        // ---------------------------------- //
  
        // Define HTML.
        var new_html = '';
      
        // Add task container.
        new_html += '<div class="garden-wrap">';
  
        // Open garden container.
        new_html += `<div class="garden-container">`;
  
        // Add landscape.
        new_html += '<div class="sky"></div>';
        new_html += '<div class="grass"></div>';
        new_html += '<div class="cloud" pattern="1"></div>';
        new_html += '<div class="cloud" pattern="2"></div>';
        new_html += '<div class="cloud" pattern="3"></div>';

  
        // Draw Hiding Spots
        var elements = [
          { className: 'tree', choice: '0' },
          { className: 'tent', choice: '1' },
          { className: 'barn', choice: '2' },
          { className: 'bush', choice: '3' },
          { className: 'pine', choice: '4' },
          { className: 'rock', choice: '5' },
          { className: 'well', choice: '6' },
          { className: 'loft', choice: '7' },
        ];
        
        elements.forEach(function(element) {
          new_html += '<div class="' + element.className + '" id="jspsych-has-' + element.className + '" choice="' + element.choice + '"></div>';
        });
  
        // Draw feedback
        elements.forEach(function(element) {
          new_html += `<div class="feedbacktime${trial.opponent}" outcome="0" choice="${element.choice}" id="${element.className}-wrong"></div>`;
          new_html += `<div class="feedbacktime${trial.opponent}" outcome="1" choice="${element.choice}" id="${element.className}-correct"></div>`;
        });
        // End garden.
        new_html += '</div>';
  
        // Display HTML.
        display_element.innerHTML = new_html;

       
        // ---------------------------------- //
        // jsPsych Functions                  //
        // ---------------------------------- //
         
        // start time
        var start_time = performance.now(); 
        // Track if a response has been recorded so we only record first response
        var responseRecorded = false;
  
        // Attach event listeners to buttons
        elements.forEach(function(element) {
          display_element.querySelector('#jspsych-has-' + element.className).addEventListener('click', function(e) {
            if (!responseRecorded) {  // Check if a response has not been recorded
              var choice = e.currentTarget.getAttribute('choice');
              after_response(choice);
              responseRecorded = true; 
            }
          });
        });
  
        // store response
        var response = {
            rt: null,
            choice: null,
            outcome: null,
            past_choices: null,
            past_outcomes: null,
            probability_for_each_option: null,
            outcome_for_each_option: null,
            context: null,
            player: null,
            vol_trials_shuffle: null,
            freq_map: null,
        };
        

        // function to handle responses by the subject
        function after_response(choice) {
            jsPsych.pluginAPI.clearAllTimeouts();
  
            // measure response time
            var end_time = performance.now();
            var rt = end_time - start_time;
  
            // store responses.
            response.rt = rt;
            response.choice = parseInt(choice);
          
            elements.forEach(function(element) {
              var selector = '#jspsych-has-' + element.className;
              display_element.querySelector(selector).setAttribute('response', 'disabled');
            });
            
            // Update the choice frequencies
            choiceFrequencies[response.choice]++;               
            // Store all past choices
            past_choices_storing.push(response.choice)
            response.past_choices = past_choices_storing.slice();


            response.player = trial.opponent
            // START variability schedule
            if  (trial.variability === 'variable') {
                response.context = 'variable context'
                response.past_choices = []
                response.probability_for_each_option= 'none'
                // first response always lead to reward
                if  (past_choices_storing.length === 1 ) {
                    response.outcome = (Math.random() < 0.5 ? 1 : 0)
                    const valuesFreq0 = Array.from(FreqMap.values());
                    response.freq_map = valuesFreq0
                    } else {
                        //check if the chosen option occured infrequently enough
                        const last_three_sequence = past_choices_storing.slice(-2);
                        const current_freq = FreqMap.get(JSON.stringify(last_three_sequence))
                        const valuesFreq = Array.from(FreqMap.values());
                        const copy_valuesFreq = valuesFreq.slice()
                        copy_valuesFreq.sort((a, b) => a - b);
                        const index = copy_valuesFreq.indexOf(current_freq);
                        if (index <= 37) {
                            response.outcome = 1
                            } else {
                            response.outcome = 0
                            }
                        //checking what the outcome for each option would be if they were chosen
                        var outcome_options_variable = []
                        var previous_response = past_choices_storing[past_choices_storing.length - 2];
                        for (let i = 0; i <= 7; i++) {
                          const check_key = [previous_response, i];
                          const check_freq = FreqMap.get(JSON.stringify(check_key));
                          const check_index = copy_valuesFreq.indexOf(check_freq);
                          if (check_index <= 37) {
                            outcome_options_variable[i] = 1;
                          } else {
                            outcome_options_variable[i] = 0;
                            }
                          }   
                        response.outcome_for_each_option = outcome_options_variable
                        //updating the frequencies of each option
                        for (let i = 0; i <= 7; i++) {
                            for (let j = 0; j <= 7; j++) {
                                const key = [i, j];
                                FreqMap.set(JSON.stringify(key), FreqMap.get(JSON.stringify(key))-(1/63));
                            }
                        }
                        FreqMap.set(JSON.stringify(last_three_sequence), FreqMap.get(JSON.stringify(last_three_sequence))+1+(1/63)); // Set the new value
                        multiplyMapValues(FreqMap, 0.984)
                        const valuesFreq1 = Array.from(FreqMap.values());
                        response.freq_map = valuesFreq1
                    }
                outcomes.push(response.outcome)
                response.past_outcomes = outcomes.slice()
                

                // Update screen.
                for (let i = 0; i < elements.length; i++) {
                  if (response.choice === i) {
                    const feedbackId = `#${elements[i].className}-${response.outcome === 0 ? 'wrong' : 'correct'}`;
                    display_element.querySelector(feedbackId).setAttribute('context', 'feedback');
                    }
                  } 
                } // END variability schedule
            
            // START stable schedule
            if (trial.variability === 'stable') {
              response.context = 'stable context'
              
              response.probability_for_each_option = current_probs_stable
              // Simulate outcomes.
              var outcome_options_stable = []; // based on probability, it calculates which options will lead to reward
              for (var k = 0; k < current_probs_stable.length; k++) {
                outcome_options_stable.push(Math.random() < current_probs_stable[k] ? 1 : 0);
              }

              response.outcome_for_each_option = outcome_options_stable

              // Update screen.
              for (let i = 0; i < elements.length; i++) {
                if (response.choice === i) {
                  response.outcome = outcome_options_stable[i];
                  const feedbackId = `#${elements[i].className}-${response.outcome === 0 ? 'wrong' : 'correct'}`;
                  display_element.querySelector(feedbackId).setAttribute('context', 'feedback');
                  outcomes.push(response.outcome)
                  response.past_outcomes = outcomes.slice()
                    }
                  }
                } // END stable schedule


            // START volatile schedule
            if (trial.variability === 'volatile') {
              response.context = 'volatile context'
              var currentTrialIndex = past_choices_storing.length-1;
              const current_probs_volatile = all_reward_schedule[currentTrialIndex]
              response.probability_for_each_option = current_probs_volatile
              // Simulate outcomes.
              var outcome_options_volatile = []; // based on probability, it calculates which options will lead to reward
              for (var k = 0; k < current_probs_volatile.length; k++) {
                outcome_options_volatile.push(Math.random() < current_probs_volatile[k] ? 1 : 0);
              }
              response.outcome_for_each_option = outcome_options_volatile
              response.vol_trials_shuffle = shuffle_at_trial_col
              // Update screen.
              for (let i = 0; i < elements.length; i++) {
                if (response.choice === i) {
                  response.outcome = outcome_options_volatile[i];
                  const feedbackId = `#${elements[i].className}-${response.outcome === 0 ? 'wrong' : 'correct'}`;
                  display_element.querySelector(feedbackId).setAttribute('context', 'feedback');
                  outcomes.push(response.outcome)
                  response.past_outcomes = outcomes.slice()
                    }
                  }
                } // END stable schedule


            jsPsych.pluginAPI.setTimeout(function() {
                end_trial();
            }, trial.feedback_duration);

        };
        
     
        // function to handle missed responses
        var missed_response = function() {
  
          // Kill all setTimeout handlers.
          jsPsych.pluginAPI.clearAllTimeouts();
          jsPsych.pluginAPI.cancelAllKeyboardResponses();
  
          // Display warning message.
          const msg = '<p style="font-size: 20px; line-height: 1.5em">You did not respond within the allotted time. Please pay more attention on the next trial.<br><br><b>Warning:</b> If you miss too many trials, we may end the exepriment early and reject your work.';
  
          display_element.innerHTML = msg;
  
          jsPsych.pluginAPI.setTimeout(function() {
            end_trial();
          }, 5000);
  
        };
  
  
        // function to end trial when it is time
        var end_trial = function() {
  
            // kill any remaining setTimeout handlers
            jsPsych.pluginAPI.clearAllTimeouts();
  
            // confirm image loading
            const loaded = Array.from(document.getElementsByTagName('img')).map(x => (x.complete) && (x.naturalWidth != 0));
            const all_loaded = loaded.every(x => x);
  
            // gather the data to store for the trial
            var trial_data = {
                context: response.context,
                player: response.player,
                rt: response.rt,
                all_loaded: all_loaded,
                choice: response.choice,
                past_choices: response.past_choices,
                outcome: response.outcome,
                past_outcomes: response.past_outcomes,
                probability_for_each_option: response.probability_for_each_option,
                outcome_for_each_option: response.outcome_for_each_option,
                freq_map: response.freq_map,
                vol_trials_shuffle: response.vol_trials_shuffle,
            };
  
            // clear the display
            display_element.innerHTML = '';
  
            // move on to the next trial
            jsPsych.finishTrial(trial_data);
        };
  
  
        // End trial if no response.
        if (trial.choice_duration !== null) {
          jsPsych.pluginAPI.setTimeout(function() {
            missed_response();
          }, trial.choice_duration);
        }
  
      };
    }
    HideAndSeekContextsTrialPlugin.info = info;
  
    return HideAndSeekContextsTrialPlugin;
  
  })(jsPsychModule);
  