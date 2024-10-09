//------------------------------------//
// Define parameters.
//------------------------------------//

// Define timings.
const choice_duration = null;
const feedback_duration = 500;

//------------------------------------//
// Define images to preload.
//------------------------------------//

preload_images = [
  "./img/Instructions1.png",
  "./img/Instructions2.png",
  "./img/Instructions3.png",
  "./img/Instructions4.png",
  "./img/Instructions5.png",
  "./img/Instructions6.png",
  "./img/Instructions7.png",
  "./img/Instructions8.png",
  "./img/Instructions9.png",
  "./img/Instructions9bb.png",
  "./img/Instructions10.png",
  "./img/Instructions10a.png",
  "./img/Instructions10b.png",
  "./img/Instructions11.png",
  "./img/Instructions12.png",
  "./img/Consent.png",
  "./img/instructions_poes.png",
  "./img/instructions_vos.png",
  "./img/instructions_konijn.png",
  "./img/tree2.png",
  "./img/barn2.png",
  "./img/bush.png",
  "./img/tent2.png",
  "./img/pine.png",
  "./img/boulder.png",
  "./img/well2.png",
  "./img/loft3.png",
  "./img/cloud01.svg",
  "./img/cloud02.svg",
  "./img/cloud03.svg",
  "./img/poes.png",
  "./img/vos.png",
  "./img/konijn.png",
  "./img/poes2.png",
  "./img/vos2.png",
  "./img/konijn2.png",
  "./img/panda.png",
  "./img/panda2.png",


];

function sum(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}


var email=true
// Define image preloading.
var preload = {
  type: jsPsychPreload,
  images: preload_images,
  message: 'Loading images. This may take a moment depending on your internet connection.',
  error_message: '<p>The experiment failed to load. Please try restarting your browser.</p><p>If this error persists after 2-3 tries, please contact the experimenter.</p>',
  continue_after_error: false,
  show_progress_bar: true,
  max_load_time: 30000
}

//------------------------------------//
// Define 
//------------------------------------//

// Enter full screen model
var enter_fullscreen = {
  type: jsPsychFullscreen,
  fullscreen_mode: true
  }

// Informed consent
var consent = {
  type: jsPsychInstructions,
  pages: [
    '<img id="consent-image" src="./img/Consent.png" style="width: 50%; height: auto; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">',
  ],
  show_clickable_nav: true,
  button_label_previous: "Prev",
  button_label_next: "Agreed, next",
  
}


// test browser: only chrome allowed (and not on mobile device)
var browser_test = {
  type: jsPsychBrowserCheck,
  inclusion_function: function (data) {
      return data.browser == 'chrome' && data.mobile === false
  },
  exclusion_message: function (data) {
      if (data.mobile) {document.querySelector('body').innerHTML = '<p style="color:black">You must use a desktop/laptop computer to participate in this experiment.</p>'}
      else if (data.browser !== 'chrome') {document.querySelector('body').innerHTML = '<p style="color:black">You must use Chrome as your browser to complete this experiment.</p>'}
  }
  }

// participats information
var demInfo_1 = {
    type: jsPsychSurveyMultiChoice,
    questions: [
      {prompt: "What is your gender?", name: 'gender', options: ["male", "female", "non-binary", "other", "prefer not to say"], required:true},
      {prompt: "Are you right-handed or left-handed?", name: 'handedness', options: ['left-handed', 'right-handed'], required:true},
      {prompt: "What is your English-speaking level?", name: 'englishlevel', options: ['native', 'fluent', 'basic'], required:true}
    ],
    data: {	trial_part: 'Demo_Info'},
    on_finish: function(data) {
      jsPsych.data.addProperties({
        gender: data.response.gender,
        handedness:data.response.handedness,
        englishlevel:data.response.englishlevel,

      })
    }
  };

var age_trial = {
    type: jsPsychSurveyText,
    questions: function(){
      if (email==true){
        return [
          {prompt: "How old are you?", name:'Age', required: true, placeholder: "Age:"},
          {prompt: 'Email', name:'Email',required: true, placeholder: "Email:"}, 
        ];
        }
      else{
        return [
          {prompt: "How old are you?", name:'Age', required: true, placeholder: "Age:"}];
      }
  },
  data: {trial_part:'Defining subject ID'},
  on_finish: function(data) {
      if(email==true){
      jsPsych.data.addProperties({
        Age: data.response.Age,
        Email:data.response.Email,
      })
    }
    else{
      jsPsych.data.addProperties({
        Age: data.response.Age,
        //Email:data.response.Email,
      })
    }
    }
  };

//------------------------------------//
// Get particitpants ID
//------------------------------------//
var subjectID = jsPsych.randomization.randomID()
var sonaID = jsPsych.data.getURLVariable('SONA_PID')
jsPsych.data.addProperties({subjectID: subjectID, sonaID: sonaID}); // ,sonaID: soanID

//------------------------------------//
// Define instructions block.
//------------------------------------//

// Define image scaling CSS.
const style = "width:auto; height:auto; max-width:100%; max-height:80vh;";

// Define instructions sequence.
var instructions = {
  type: jsPsychInstructions,
  pages: [
    `<img src='./img/Instructions1.png' style="${style}"<./img>`,
    `<img src='./img/Instructions2.png' style="${style}"<./img>`,
    `<img src='./img/Instructions3.png' style="${style}"<./img>`,
    `<img src='./img/Instructions4.png' style="${style}"<./img>`,
    `<img src='./img/Instructions5.png' style="${style}"<./img>`,
    `<img src='./img/Instructions6.png' style="${style}"<./img>`,
    `<img src='./img/Instructions7.png' style="${style}"<./img>`,
    `<img src='./img/Instructions8.png' style="${style}"<./img>`,
    `<img src='./img/Instructions9.png' style="${style}"<./img>`,
    `<img src='./img/Instructions9bb.png' style="${style}"<./img>`,
    `<img src='./img/Instructions10.png' style="${style}"<./img>`,
    `<img src='./img/Instructions11.png' style="${style}"<./img>`,
    `<img src='./img/Instructions12.png' style="${style}"<./img>`,
  ],
  show_clickable_nav: true,
  button_label_previous: "Prev",
  button_label_next: "Next"
}

var whatsnext = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `You have finished the practice round.
  <br>If you want to read the instructions again, press the "Instructions" button.
  <br>If you are ready for the experiment, press "Take me to the experiment".`,
  choices: ['Instructions', 'Take me to the experiment'],
  
};

// Define  extra instructions sequence.
var instructions_a = {
  type: jsPsychInstructions,
  pages: [
    `<img src='./img/Instructions1.png' style="${style}"<./img>`,
    `<img src='./img/Instructions2.png' style="${style}"<./img>`,
    `<img src='./img/Instructions3.png' style="${style}"<./img>`,
    `<img src='./img/Instructions4.png' style="${style}"<./img>`,
    `<img src='./img/Instructions5.png' style="${style}"<./img>`,
    `<img src='./img/Instructions6.png' style="${style}"<./img>`,
    `<img src='./img/Instructions7.png' style="${style}"<./img>`,
    `<img src='./img/Instructions8.png' style="${style}"<./img>`,
    `<img src='./img/Instructions9.png' style="${style}"<./img>`,
    `<img src='./img/Instructions9bb.png' style="${style}"<./img>`,
    `<img src='./img/Instructions10.png' style="${style}"<./img>`,
    `<img src='./img/Instructions10a.png' style="${style}"<./img>`,
    `<img src='./img/Instructions10b.png' style="${style}"<./img>`,
  ],
  show_clickable_nav: true,
  button_label_previous: "Prev",
  button_label_next: "Next",
  conditional_function: function(){
    var data = jsPsych.data.get().last(1).values()[0];
    return data.response === 0;
  },
}

var instructions_aa = {
  timeline: [
    instructions_a,
   ],
  conditional_function: function(){
    var data = jsPsych.data.get().last(1).values()[0];
    if(data.response === 1){
      return false;
    } else {
      return true;
    }
  }
}

// Define instructions sequence.
var instructions_b = {
  type: jsPsychInstructions,
  pages: [
    `<img src='./img/Instructions10b.png' style="${style}"<./img>`,
  ],
  show_clickable_nav: true,
  button_label_previous: "Prev",
  button_label_next: "Next",
}

var instructions_bb = {
  timeline: [
    instructions_b,
   ],
  conditional_function: function(){
    var data = jsPsych.data.get().last(1).values()[0];
    if(data.response === 0){
      return false;
    } else {
      return true;
    }
  }
}

//------------------------------------//
// Define Hide and Seek task
//------------------------------------//

// Define rotate function: if reverse is true, array is rotated to the left, if reverse is false, to the right
function arrayRotate(arr, reverse) {
  if (reverse) arr.unshift(arr.pop());
  else arr.push(arr.shift());
  return arr;
}
function shuffle(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

// practice round with panda
// Iteratively define trials.
var total_trials_practice = 10
var trials_practice = [];
for (i = 0; i < total_trials_practice; i++) {
  // Define trial.
  const trial_practice = {
    type: jsPsychHideAndSeekContextsTrialpractice,
    choice_duration: choice_duration,
    feedback_duration: feedback_duration,
    opponent: 'panda',
    variability: 'stable',
    on_finish: function(data) {

      // Define accuracy.
      data.total_correct = sum(data.past_outcomes);
      data.total_trials = total_trials;
      data.target = "target";
      data.pastoutcomes = JSON.stringify(data.past_outcomes);
      data.pastchoices = JSON.stringify(data.past_choices);
      data.all_probabilities = JSON.stringify(data.probability_for_each_option);
      data.all_outcomes = JSON.stringify(data.outcome_for_each_option);
  }
}
  // Push trial.
  trials_practice.push(trial_practice);
}

// Add an instruction trial with image and text
var feedback_practice = {
  type: jsPsychHtmlButtonResponse,
  stimulus: function () {
    var lastTrialData = jsPsych.data.getLastTrialData();
    var totalCorrect = lastTrialData.values()[0].total_correct;
    
    // Define the HTML content with an image and text
    var htmlContent =  `<img src='./img/panda2.png' style="${style}"<./img>`;
    htmlContent += '<p>In this practice block, you found ' + totalCorrect + ' pandas out of '+ total_trials_practice +' tries.</p>';
    
    return htmlContent;
  },
  choices: ['next'],
  trial_duration: 30000  // Adjust the duration as needed
};


  


// real experiment (6blocks)
var players = ['poes', 'konijn', 'vos'];
var contexts = ['stable', 'volatile', 'variable'];
shuffle(players)
shuffle(contexts)

var english_terms = []
for (let i = 0; i < 3; i++) {
  if (players[i] === 'poes') {
    english_terms[i] = 'cats';
  } else if (players[i] === 'vos') {
    english_terms[i] = 'foxes';
  } else if (players[i] === 'konijn') {
    english_terms[i] = 'bunnies';
  }
}

var total_trials = 200;    


// First game
var instructions_firstgame = {
  type: jsPsychInstructions,
  pages: [
    `<img src='./img/instructions_${players[0]}.png' style="${style}"<./img>` + '<br>'+
    'you are in block 1/12'
  ],
  show_clickable_nav: true,
  button_label_next: "Start"
}

// Iteratively define trials.
var trials_firstgame = [];
for (i = 0; i < total_trials; i++) {
  // Define trial.
  const trial_firstgame = {
    type: jsPsychHideAndSeekContextsTrial,
    choice_duration: choice_duration,
    feedback_duration: feedback_duration,
    opponent: players[0],
    variability: contexts[0],
    on_finish: function(data) {

      // Define accuracy.
      data.total_correct = sum(data.past_outcomes);
      data.total_trials = total_trials;
      data.target = "target";
      data.pastoutcomes = JSON.stringify(data.past_outcomes);
      data.pastchoices = JSON.stringify(data.past_choices);
      data.all_probabilities = JSON.stringify(data.probability_for_each_option);
      data.all_outcomes = JSON.stringify(data.outcome_for_each_option);
      data.frequencies = JSON.stringify(data.freq_map);
      data.volatile_shuffle_trial = JSON.stringify(data.vol_trials_shuffle);
      }
}
  // Push trial.
  trials_firstgame.push(trial_firstgame);
}

// Add an instruction trial with image and text
var feedback_firstgame = {
  type: jsPsychHtmlButtonResponse,
  stimulus: function () {
    var lastTrialData = jsPsych.data.getLastTrialData();
    var totalCorrect = lastTrialData.values()[0].total_correct;
    
    // Define the HTML content with an image and text
    var htmlContent =  `<img src='./img/${players[0]}2.png' style="${style}"<./img>`;
    htmlContent += '<p>In this block, you found ' + totalCorrect + ' '+ english_terms[0] +' out of '+ total_trials +' tries.</p>';
    
    return htmlContent;
  },
  choices: ['next'],
  trial_duration: 30000  // Adjust the duration as needed
};



// Second game
var instructions_secondgame = {
  type: jsPsychInstructions,
  pages: [
    `<img src='./img/instructions_${players[1]}.png' style="${style}"<./img>`+ '<br>'+
    'you are in block 2/12'
  ],
  show_clickable_nav: true,
  button_label_next: "Start"
}

// Iteratively define trials.
var trials_secondgame = [];
for (i = 0; i < total_trials; i++) {
  // Define trial.
  const trial_secondgame = {
    type: jsPsychHideAndSeekContextsTrial2,
    choice_duration: choice_duration,
    feedback_duration: feedback_duration,
    opponent: players[1],
    variability: contexts[1],
    on_finish: function(data) {

      // Define accuracy.
      data.total_correct = sum(data.past_outcomes);
      data.total_trials = total_trials;
      data.target = "target";
      data.pastoutcomes = JSON.stringify(data.past_outcomes);
      data.pastchoices = JSON.stringify(data.past_choices);
      data.all_probabilities = JSON.stringify(data.probability_for_each_option);
      data.all_outcomes = JSON.stringify(data.outcome_for_each_option);
      data.frequencies = JSON.stringify(data.freq_map);
      data.volatile_shuffle_trial = JSON.stringify(data.vol_trials_shuffle);
      }
  }
  // Push trial.
  trials_secondgame.push(trial_secondgame);
}

// Add an instruction trial with image and text
var feedback_secondgame = {
  type: jsPsychHtmlButtonResponse,
  stimulus: function () {
    var lastTrialData = jsPsych.data.getLastTrialData();
    var totalCorrect = lastTrialData.values()[0].total_correct;
    
    // Define the HTML content with an image and text
    var htmlContent =  `<img src='./img/${players[1]}2.png' style="${style}"<./img>`;
    htmlContent += '<p>In this block, you found ' + totalCorrect + ' '+ english_terms[1] +' out of '+ total_trials +' tries.</p>';
    
    return htmlContent;
  },
  choices: ['next'],
  trial_duration: 30000  // Adjust the duration as needed
};


// Third game
var instructions_thirdgame = {
  type: jsPsychInstructions,
  pages: [
    `<img src='./img/instructions_${players[2]}.png' style="${style}"<./img>`+ '<br>'+
    'you are in block 3/12'
  ],
  show_clickable_nav: true,
  button_label_next: "Start"
}

// Iteratively define trials.
var trials_thirdgame = [];
for (i = 0; i < total_trials; i++) {
  // Define trial.
  const trial_thirdgame = {
    type: jsPsychHideAndSeekContextsTrial3,
    choice_duration: choice_duration,
    feedback_duration: feedback_duration,
    opponent: players[2],
    variability: contexts[2],
    on_finish: function(data) {

      // Define accuracy.
      data.total_correct = sum(data.past_outcomes);
      data.total_trials = total_trials;
      data.target = "target";
      data.pastoutcomes = JSON.stringify(data.past_outcomes);
      data.pastchoices = JSON.stringify(data.past_choices);
      data.all_probabilities = JSON.stringify(data.probability_for_each_option);
      data.all_outcomes = JSON.stringify(data.outcome_for_each_option);
      data.frequencies = JSON.stringify(data.freq_map);
      data.volatile_shuffle_trial = JSON.stringify(data.vol_trials_shuffle);
      }
  }
  // Push trial.
  trials_thirdgame.push(trial_thirdgame);
}

// Add an instruction trial with image and text
var feedback_thirdgame = {
  type: jsPsychHtmlButtonResponse,
  stimulus: function () {
    var lastTrialData = jsPsych.data.getLastTrialData();
    var totalCorrect = lastTrialData.values()[0].total_correct;
    
    // Define the HTML content with an image and text
    var htmlContent =  `<img src='./img/${players[2]}2.png' style="${style}"<./img>`;
    htmlContent += '<p>In this block, you found ' + totalCorrect + ' '+ english_terms[2] +' out of '+ total_trials +' tries.</p>';
    
    return htmlContent;
  },
  choices: ['next'],
  trial_duration: 30000  // Adjust the duration as needed
};


// Fourth game
var instructions_fourthgame = {
  type: jsPsychInstructions,
  pages: [
    `<img src='./img/instructions_${players[0]}.png' style="${style}"<./img>`+ '<br>'+
    'you are in block 4/12'
  ],
  show_clickable_nav: true,
  button_label_next: "Start"
}
// Iteratively define trials.
var trials_fourthgame = [];
for (i = 0; i < total_trials; i++) {
  // Define trial.
  const trial_fourthgame = {
    type: jsPsychHideAndSeekContextsTrial4,
    choice_duration: choice_duration,
    feedback_duration: feedback_duration,
    opponent: players[0],
    variability: contexts[0],
    on_finish: function(data) {

      // Define accuracy.
      data.total_correct = sum(data.past_outcomes);
      data.total_trials = total_trials;
      data.target = "target";
      data.pastoutcomes = JSON.stringify(data.past_outcomes);
      data.pastchoices = JSON.stringify(data.past_choices);
      data.all_probabilities = JSON.stringify(data.probability_for_each_option);
      data.all_outcomes = JSON.stringify(data.outcome_for_each_option);
      data.frequencies = JSON.stringify(data.freq_map);
      data.volatile_shuffle_trial = JSON.stringify(data.vol_trials_shuffle);
      }
  }
  // Push trial.
  trials_fourthgame.push(trial_fourthgame);
}

// Add an instruction trial with image and text
var feedback_fourthgame = {
  type: jsPsychHtmlButtonResponse,
  stimulus: function () {
    var lastTrialData = jsPsych.data.getLastTrialData();
    var totalCorrect = lastTrialData.values()[0].total_correct;
    
    // Define the HTML content with an image and text
    var htmlContent =  `<img src='./img/${players[0]}2.png' style="${style}"<./img>`;
    htmlContent += '<p>In this block, you found ' + totalCorrect + ' '+ english_terms[0] +' out of '+ total_trials +' tries.</p>';
    
    return htmlContent;
  },
  choices: ['next'],
  trial_duration: 30000  // Adjust the duration as needed
};

// Fifth game
var instructions_fifthgame = {
  type: jsPsychInstructions,
  pages: [
    `<img src='./img/instructions_${players[1]}.png' style="${style}"<./img>`+ '<br>'+
    'you are in block 5/12'
  ],
  show_clickable_nav: true,
  button_label_next: "Start"
}
// Iteratively define trials.
var trials_fifthgame = [];
for (i = 0; i < total_trials; i++) {
  // Define trial.
  const trial_fifthgame = {
    type: jsPsychHideAndSeekContextsTrial5,
    choice_duration: choice_duration,
    feedback_duration: feedback_duration,
    opponent: players[1],
    variability: contexts[1],
    on_finish: function(data) {

      // Define accuracy.
      data.total_correct = sum(data.past_outcomes);
      data.total_trials = total_trials;
      data.target = "target";
      data.pastoutcomes = JSON.stringify(data.past_outcomes);
      data.pastchoices = JSON.stringify(data.past_choices);
      data.all_probabilities = JSON.stringify(data.probability_for_each_option);
      data.all_outcomes = JSON.stringify(data.outcome_for_each_option);
      data.frequencies = JSON.stringify(data.freq_map);
      data.volatile_shuffle_trial = JSON.stringify(data.vol_trials_shuffle);
      }
  }
  // Push trial.
  trials_fifthgame.push(trial_fifthgame);
}

// Add an instruction trial with image and text
var feedback_fifthgame = {
  type: jsPsychHtmlButtonResponse,
  stimulus: function () {
    var lastTrialData = jsPsych.data.getLastTrialData();
    var totalCorrect = lastTrialData.values()[0].total_correct;
    
    // Define the HTML content with an image and text
    var htmlContent =  `<img src='./img/${players[1]}2.png' style="${style}"<./img>`;
    htmlContent += '<p>In this block, you found ' + totalCorrect + ' '+ english_terms[1] +' out of '+ total_trials +' tries.</p>';
    
    return htmlContent;
  },
  choices: ['next'],
  trial_duration: 30000  // Adjust the duration as needed
};

// Sixth game
var instructions_sixthgame = {
  type: jsPsychInstructions,
  pages: [
    `<img src='./img/instructions_${players[2]}.png' style="${style}"<./img>`+ '<br>'+
    'you are in block 6/12'
  ],
  show_clickable_nav: true,
  button_label_next: "Start"
}

// Iteratively define trials.
var trials_sixthgame = [];
for (i = 0; i < total_trials; i++) {
  // Define trial.
  const trial_sixthgame = {
    type: jsPsychHideAndSeekContextsTrial6,
    choice_duration: choice_duration,
    feedback_duration: feedback_duration,
    opponent: players[2],
    variability: contexts[2], 
    on_finish: function(data) {

      // Define accuracy.
      data.total_correct = sum(data.past_outcomes);
      data.total_trials = total_trials;
      data.target = "target";
      data.pastoutcomes = JSON.stringify(data.past_outcomes);
      data.pastchoices = JSON.stringify(data.past_choices);
      data.all_probabilities = JSON.stringify(data.probability_for_each_option);
      data.all_outcomes = JSON.stringify(data.outcome_for_each_option);
      data.frequencies = JSON.stringify(data.freq_map);
      data.volatile_shuffle_trial = JSON.stringify(data.vol_trials_shuffle);
      }
}
  
  // Push trial.
  trials_sixthgame.push(trial_sixthgame);
}

// Add an instruction trial with image and text
var feedback_sixthgame = {
  type: jsPsychHtmlButtonResponse,
  stimulus: function () {
    var lastTrialData = jsPsych.data.getLastTrialData();
    var totalCorrect = lastTrialData.values()[0].total_correct;
    
    // Define the HTML content with an image and text
    var htmlContent =  `<img src='./img/${players[2]}2.png' style="${style}"<./img>`;
    htmlContent += '<p>In this block, you found ' + totalCorrect + ' '+ english_terms[2] +' out of '+ total_trials +' tries.</p>';
    
    return htmlContent;
  },
  choices: ['next'],
  trial_duration: 30000  // Adjust the duration as needed
};




// Seventh game
var instructions_seventhgame = {
  type: jsPsychInstructions,
  pages: [
    `<img src='./img/instructions_${players[0]}.png' style="${style}"<./img>`+ '<br>'+
    'you are in block 7/12'
  ],
  show_clickable_nav: true,
  button_label_next: "Start"
}

// Iteratively define trials.
var trials_seventhgame = [];
for (i = 0; i < total_trials; i++) {
  // Define trial.
  const trial_seventhgame = {
    type: jsPsychHideAndSeekContextsTrial7,
    choice_duration: choice_duration,
    feedback_duration: feedback_duration,
    opponent: players[0],
    variability: contexts[0],
    on_finish: function(data) {

      // Define accuracy.
      data.total_correct = sum(data.past_outcomes);
      data.total_trials = total_trials;
      data.target = "target";
      data.pastoutcomes = JSON.stringify(data.past_outcomes);
      data.pastchoices = JSON.stringify(data.past_choices);
      data.all_probabilities = JSON.stringify(data.probability_for_each_option);
      data.all_outcomes = JSON.stringify(data.outcome_for_each_option);
      data.frequencies = JSON.stringify(data.freq_map);
      data.volatile_shuffle_trial = JSON.stringify(data.vol_trials_shuffle);
      }
}
  // Push trial.
  trials_seventhgame.push(trial_seventhgame);
}

// Add an instruction trial with image and text
var feedback_seventhgame = {
  type: jsPsychHtmlButtonResponse,
  stimulus: function () {
    var lastTrialData = jsPsych.data.getLastTrialData();
    var totalCorrect = lastTrialData.values()[0].total_correct;
    
    // Define the HTML content with an image and text
    var htmlContent =  `<img src='./img/${players[0]}2.png' style="${style}"<./img>`;
    htmlContent += '<p>In this block, you found ' + totalCorrect + ' '+ english_terms[0] +' out of '+ total_trials +' tries.</p>';
    
    return htmlContent;
  },
  choices: ['next'],
  trial_duration: 30000  // Adjust the duration as needed
};


// Eigth game
var instructions_eigthgame = {
  type: jsPsychInstructions,
  pages: [
    `<img src='./img/instructions_${players[1]}.png' style="${style}"<./img>`+ '<br>'+
    'you are in block 8/12'
  ],
  show_clickable_nav: true,
  button_label_next: "Start"
}

// Iteratively define trials.
var trials_eigthgame = [];
for (i = 0; i < total_trials; i++) {
  // Define trial.
  const trial_eigthgame = {
    type: jsPsychHideAndSeekContextsTrial8,
    choice_duration: choice_duration,
    feedback_duration: feedback_duration,
    opponent: players[1],
    variability: contexts[1],
    on_finish: function(data) {

      // Define accuracy.
      data.total_correct = sum(data.past_outcomes);
      data.total_trials = total_trials;
      data.target = "target";
      data.pastoutcomes = JSON.stringify(data.past_outcomes);
      data.pastchoices = JSON.stringify(data.past_choices);
      data.all_probabilities = JSON.stringify(data.probability_for_each_option);
      data.all_outcomes = JSON.stringify(data.outcome_for_each_option);
      data.frequencies = JSON.stringify(data.freq_map);
      data.volatile_shuffle_trial = JSON.stringify(data.vol_trials_shuffle);
      }
  }
  // Push trial.
  trials_eigthgame.push(trial_eigthgame);
}

// Add an instruction trial with image and text
var feedback_eigthgame = {
  type: jsPsychHtmlButtonResponse,
  stimulus: function () {
    var lastTrialData = jsPsych.data.getLastTrialData();
    var totalCorrect = lastTrialData.values()[0].total_correct;
    
    // Define the HTML content with an image and text
    var htmlContent =  `<img src='./img/${players[1]}2.png' style="${style}"<./img>`;
    htmlContent += '<p>In this block, you found ' + totalCorrect + ' '+ english_terms[1] +' out of '+ total_trials +' tries.</p>';
    
    return htmlContent;
  },
  choices: ['next'],
  trial_duration: 30000  // Adjust the duration as needed
};

// Ninth game
var instructions_ninthgame = {
  type: jsPsychInstructions,
  pages: [
    `<img src='./img/instructions_${players[2]}.png' style="${style}"<./img>`+ '<br>'+
    'you are in block 9/12'
  ],
  show_clickable_nav: true,
  button_label_next: "Start"
}

// Iteratively define trials.
var trials_ninthgame = [];
for (i = 0; i < total_trials; i++) {
  // Define trial.
  const trial_ninthgame = {
    type: jsPsychHideAndSeekContextsTrial9,
    choice_duration: choice_duration,
    feedback_duration: feedback_duration,
    opponent: players[2],
    variability: contexts[2],
    on_finish: function(data) {

      // Define accuracy.
      data.total_correct = sum(data.past_outcomes);
      data.total_trials = total_trials;
      data.target = "target";
      data.pastoutcomes = JSON.stringify(data.past_outcomes);
      data.pastchoices = JSON.stringify(data.past_choices);
      data.all_probabilities = JSON.stringify(data.probability_for_each_option);
      data.all_outcomes = JSON.stringify(data.outcome_for_each_option);
      data.frequencies = JSON.stringify(data.freq_map);
      data.volatile_shuffle_trial = JSON.stringify(data.vol_trials_shuffle);
      }
  }
  // Push trial.
  trials_ninthgame.push(trial_ninthgame);
}

// Add an instruction trial with image and text
var feedback_ninthgame = {
  type: jsPsychHtmlButtonResponse,
  stimulus: function () {
    var lastTrialData = jsPsych.data.getLastTrialData();
    var totalCorrect = lastTrialData.values()[0].total_correct;
    
    // Define the HTML content with an image and text
    var htmlContent =  `<img src='./img/${players[2]}2.png' style="${style}"<./img>`;
    htmlContent += '<p>In this block, you found ' + totalCorrect + ' '+ english_terms[2] +' out of '+ total_trials +' tries.</p>';
    
    return htmlContent;
  },
  choices: ['next'],
  trial_duration: 30000  // Adjust the duration as needed
};

// Tenth game
var instructions_tenthgame = {
  type: jsPsychInstructions,
  pages: [
    `<img src='./img/instructions_${players[0]}.png' style="${style}"<./img>`+ '<br>'+
    'you are in block 10/12'
    
  ],
  show_clickable_nav: true,
  button_label_next: "Start"
}
// Iteratively define trials.
var trials_tenthgame = [];
for (i = 0; i < total_trials; i++) {
  // Define trial.
  const trial_tenthgame = {
    type: jsPsychHideAndSeekContextsTrial10,
    choice_duration: choice_duration,
    feedback_duration: feedback_duration,
    opponent: players[0],
    variability: contexts[0],
    on_finish: function(data) {

      // Define accuracy.
      data.total_correct = sum(data.past_outcomes);
      data.total_trials = total_trials;
      data.target = "target";
      data.pastoutcomes = JSON.stringify(data.past_outcomes);
      data.pastchoices = JSON.stringify(data.past_choices);
      data.all_probabilities = JSON.stringify(data.probability_for_each_option);
      data.all_outcomes = JSON.stringify(data.outcome_for_each_option);
      data.frequencies = JSON.stringify(data.freq_map);
      data.volatile_shuffle_trial = JSON.stringify(data.vol_trials_shuffle);
      }
  }
  // Push trial.
  trials_tenthgame.push(trial_tenthgame);
}

// Add an instruction trial with image and text
var feedback_tenthgame = {
  type: jsPsychHtmlButtonResponse,
  stimulus: function () {
    var lastTrialData = jsPsych.data.getLastTrialData();
    var totalCorrect = lastTrialData.values()[0].total_correct;
    
    // Define the HTML content with an image and text
    var htmlContent =  `<img src='./img/${players[0]}2.png' style="${style}"<./img>`;
    htmlContent += '<p>In this block, you found ' + totalCorrect + ' '+ english_terms[0] +' out of '+ total_trials +' tries.</p>';
    
    return htmlContent;
  },
  choices: ['next'],
  trial_duration: 30000  // Adjust the duration as needed
};

// Eleventh game
var instructions_eleventhgame = {
  type: jsPsychInstructions,
  pages: [
    `<img src='./img/instructions_${players[1]}.png' style="${style}"<./img>`+ '<br>'+
    'you are in block 11/12'
  ],
  show_clickable_nav: true,
  button_label_next: "Start"
}
// Iteratively define trials.
var trials_eleventhgame = [];
for (i = 0; i < total_trials; i++) {
  // Define trial.
  const trial_eleventhgame = {
    type: jsPsychHideAndSeekContextsTrial11,
    choice_duration: choice_duration,
    feedback_duration: feedback_duration,
    opponent: players[1],
    variability: contexts[1],
    on_finish: function(data) {

      // Define accuracy.
      data.total_correct = sum(data.past_outcomes);
      data.total_trials = total_trials;
      data.target = "target";
      data.pastoutcomes = JSON.stringify(data.past_outcomes);
      data.pastchoices = JSON.stringify(data.past_choices);
      data.all_probabilities = JSON.stringify(data.probability_for_each_option);
      data.all_outcomes = JSON.stringify(data.outcome_for_each_option);
      data.frequencies = JSON.stringify(data.freq_map);
      data.volatile_shuffle_trial = JSON.stringify(data.vol_trials_shuffle);
      }
  }
  // Push trial.
  trials_eleventhgame.push(trial_eleventhgame);
}

// Add an instruction trial with image and text
var feedback_eleventhgame = {
  type: jsPsychHtmlButtonResponse,
  stimulus: function () {
    var lastTrialData = jsPsych.data.getLastTrialData();
    var totalCorrect = lastTrialData.values()[0].total_correct;
    
    // Define the HTML content with an image and text
    var htmlContent =  `<img src='./img/${players[1]}2.png' style="${style}"<./img>`;
    htmlContent += '<p>In this block, you found ' + totalCorrect + ' '+ english_terms[1] +' out of '+ total_trials +' tries.</p>';
    
    return htmlContent;
  },
  choices: ['next'],
  trial_duration: 30000  // Adjust the duration as needed
};

// Twelfth game
var instructions_twelfthgame = {
  type: jsPsychInstructions,
  pages: [
    `<img src='./img/instructions_${players[2]}.png' style="${style}"<./img>`+ '<br>'+
    'you are in block 12/12'
  ],
  show_clickable_nav: true,
  button_label_next: "Start"
}

// Iteratively define trials.
var trials_twelfthgame = [];
for (i = 0; i < total_trials; i++) {
  // Define trial.
  const trial_twelfthgame = {
    type: jsPsychHideAndSeekContextsTrial12,
    choice_duration: choice_duration,
    feedback_duration: feedback_duration,
    opponent: players[2],
    variability: contexts[2], 
    on_finish: function(data) {

      // Define accuracy.
      data.total_correct = sum(data.past_outcomes);
      data.total_trials = total_trials;
      data.target = "target";
      data.pastoutcomes = JSON.stringify(data.past_outcomes);
      data.pastchoices = JSON.stringify(data.past_choices);
      data.all_probabilities = JSON.stringify(data.probability_for_each_option);
      data.all_outcomes = JSON.stringify(data.outcome_for_each_option);
      data.frequencies = JSON.stringify(data.freq_map);
      data.volatile_shuffle_trial = JSON.stringify(data.vol_trials_shuffle);
      }
}
  
  // Push trial.
  trials_twelfthgame.push(trial_twelfthgame);
}

// Add an instruction trial with image and text
var feedback_twelfthgame = {
  type: jsPsychHtmlButtonResponse,
  stimulus: function () {
    var lastTrialData = jsPsych.data.getLastTrialData();
    var totalCorrect = lastTrialData.values()[0].total_correct;
    
    // Define the HTML content with an image and text
    var htmlContent =  `<img src='./img/${players[2]}2.png' style="${style}"<./img>`;
    htmlContent += '<p>In this block, you found ' + totalCorrect + ' '+ english_terms[2] +' out of '+ total_trials +' tries.</p>';
    
    return htmlContent;
  },
  choices: ['next'],
  trial_duration: 30000  // Adjust the duration as needed
};




// debriefing
var debrief = {
  type: jsPsychSurveyText,
  questions: function(){
  
    return [
      {prompt: "Did you notice any differences between hiding strategies of animals? If so, please specify them here", 
      name:'hiding', required: true},
      {prompt: 'Did you yourself apply different searching strategies for different animals? If so, please specify them here', 
      name:'searching',required: true}, // May be I need to moit this
    ];
      
    
  },
  on_finish: function(data) {
     
    jsPsych.data.addProperties({
      hiding: data.response.hiding,
      searching:data.response.searching,
    })
    }
  };

////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////save the data////////////////////////////
var save_data = {
  type: jsPsychCallFunction,
  func: function(){
    data = jsPsych.data.get().filter({target: "target"});
    console.log(data)
    serverComm.save_data(data.values());
    }
  }


//////////////////////////////////Waiting 60 Seconds to save the screen////////////////////////////
var End_Experiment={ // 2 min break but let them press space if they do not need 2 min break and start new block
  type:jsPsychHtmlButtonResponse,
  stimulus: function (){
    var html="<h1>This is the end of the experiment. Thank you for participating!</h1><p></p><p></p>"+ '<br>'+
             "<h2>Please wait for 60 seconds while your data is being saved.</h2>"  + '<br>' +
             "Make sure to keep this window open until you're redirected." + '<br>' +
             "You will be redirected automatically in 60 seconds.";
    var countDownDate_1 = new Date().getTime()+ (1000*60*1);
    // Update the count down every 1 second
    var x_1 = setInterval(function() {
    // Get today's date and time
    var now_1 = new Date().getTime();
    // Find the distance between now and the count down date
    var distance_1 = countDownDate_1 - now_1;
    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance_1 / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance_1 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance_1 % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance_1 % (1000 * 60)) / 1000);
    // Output the result in an element with id="demo"
    document.getElementById("demo_9").innerHTML = minutes + "m " + seconds + "s ";
  }, 1000);
  return html;
  },
  choices: ["WAIT"],
  trial_duration: 60000,
  response_ends_trial:	false,
  margin_vertical:'0px'	,
  margin_horizontal:'8px',
  prompt: `<p id="demo_9"> Data Saving </p>`,
  post_trial_gap:2000,
  data: {trial_part: 'Break_9',
        trial_variable:jsPsych.data.get().uniqueNames(),
        //Finish_time:finish_session_1,
         },
         on_finish: function(data)
         {
           var reaction_time='null';
           if (data.rt!='null'){
             reaction_time=data.rt;
           }
           data.reaction_time_break_9=reaction_time;
           //data.Finish_time=finish_session_1;
         }
 };
