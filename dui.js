//In God We Trust
var bac; 
var dui;
var tolerance;
var enhanced;
var name1; //name input
const no1 = document.querySelector("#no");
const yes1 = document.querySelector("#yes");

const screens = [
    {
        name: "bar",
        "button text": ["enter"],
        "button functions": [calculate]
    },
    {
        name: "result",
        "button text": ["Reset"],
        "button functions": [home]
    },
    {
        name: "first",
        "button text": ["Yes", "No"],
        "button functions": [yes, no]
    },
    {
        name: "barstool",
        "button text": ["leave"],
        "button functions": [calculate]
    }
];

no1.onclick = no;
yes1.onclick = yes;
button2.onclick = enterBar;

function enterBar() {
    const box = document.querySelector('.box');
    const menuBoard = document.querySelector('.menuBoard');
    const barstool = document.querySelector('.barstool');
    name1 = document.getElementById('name').value;
    var gender = document.getElementById('gender').value;
    var height = parseFloat(document.getElementById('height').value);
    var weight = parseFloat(document.getElementById('weight').value);
    var hiBar = document.querySelector("#hiBar");
    var state = document.getElementById('state').value;
    const sentences = ["Hello, " + name1, "Drink Responsibly", "What can i get for you?"];

    if (isNaN(height) || isNaN(weight)) {
        alert("Please enter valid height and weight.");
        return;
    } 

    if (name1.trim() === "") {
        alert("Please enter your name.");
        return;
    }

    if (state.trim() === "") {
        alert("Please enter a valid State of residence.");
        return;
    }

    box.style.display = 'none';
    typeWriter(sentences, hiBar);
    barstool.style.display = 'block';
    menuBoard.style.display = 'block';

}

function typeWriter(sentences, element, index = 0) {
    const speed = 50; /* The speed/duration of the effect in milliseconds */
  
    function typeNextCharacter(sentence, i) {
      if (i < sentence.length) {
        if (sentence.charAt(i) === ' ') {
          element.innerHTML += '&nbsp;'; // Add a non-breaking space for regular space characters
        } else {
          element.innerHTML += sentence.charAt(i);
        }
        i++;
        setTimeout(() => {
          typeNextCharacter(sentence, i);
        }, speed);
      } else {
        setTimeout(() => {
          element.innerHTML = ""; // Clear the content of the element after 3 seconds
  
          if (index < sentences.length - 1) {
            index++;
            typeWriter(sentences, element, index); // Call the function again for the next sentence
          }
        }, 2000);
      }
    }
  
    typeNextCharacter(sentences[index], 0);
  }
  

function calculate() {
    const box = document.querySelector('.box');
    const result = document.querySelector('.result');
    const per = document.querySelector('.per');
    const prompt = document.querySelector('.prompt');
    var gender = document.getElementById('gender').value;
    var height = parseFloat(document.getElementById('height').value);
    var weight = parseFloat(document.getElementById('weight').value);
    //var alc = parseFloat(document.getElementById('alc').value);
    var state = document.getElementById('state').value;

   
    if (isNaN(height) || isNaN(weight)) {
        alert("Please enter valid height and weight.");
        return;
    } 

    if (name1.trim() === "") {
        alert("Please enter your name.");
        return;
    }

    if (state.trim() === "") {
        alert("Please enter a valid State of residence.");
        return;
    }



    box.style.display = 'none';
    per.style.display = 'block';
    prompt.style.display = 'block';

    fetch('./dui.json')
        .then(response => response.json())
        .then(data => {
            const drinks = data.commercial_drinks; 
            const drink1 = drinks.find(drink => drink.name === "Emperador Brandy");
            const states = data.states; 
            const state1 = states.find(st => st.State === state);
            // Now you can use the 'data' variable which holds the JSON data
            if (drink1) {
                const alcoholPercentage = drink1.alcohol_percentage;
                console.log("Emperador Brandy Alcohol Percentage:", alcoholPercentage);
              } else {
                console.log("Emperador Brandy not found in the data.");
              }

            if (state1) {
                dui = state1.DUI;
                tolerance = state1.zero_tolerance;
                enhanced = state1.enhanced;

                if (bac.toFixed(3) >= enhanced) {
                    result.style.backgroundColor = 'red';
                    prompt.innerText = "You will be locked up";
                    copCar(document.body, 10);
                } else if (bac.toFixed(3) >= dui) {
                    result.style.backgroundColor = 'red'; // Set to another color if desired
                    prompt.innerText = "DO not drive";
                    copCar(document.body, 10);
                } else if (bac.toFixed(3) >= tolerance){
                    result.style.backgroundColor = 'orange';
                    prompt.innerText = "not dui but do not drive";
                } else {
                    result.style.backgroundColor = 'green';
                    prompt.innerText = "You are free to go";
                }
            } else {
                console.log(state, "not found in the data.");
            }
    })
    .catch(error => console.error('Error fetching JSON:', error));
    
    if (gender === 'men') {
        bac = (alc * 0.789 / (weight * 1000 * 0.68)) * 100;
    } else if (gender === 'women') {
        bac = (alc * 0.789 / (weight * 1000 * 0.55)) * 100;
    } else {
        alert("Please select a valid gender (Men or Women).");
        return;
    }

    per.innerText =  bac.toFixed(3) + "%";
    blinkElement(per, 3);
    update(screens, 1);
}

function home() {
    const box = document.querySelector('.box');
    const result = document.querySelector('.result');
    const per = document.querySelector('.per');
    const prompt = document.querySelector('.prompt');
    box.style.display = 'block';
    result.style.backgroundColor = 'beige';
    per.style.display = 'none';
    prompt.style.display = 'none';
    update(screens, 0);
}

function firstUpdate(screen, index) {
    const buttonY = document.querySelector("#yes");
    const buttonN = document.querySelector("#no");
    buttonY.onclick = screen[index]["button functions"][0];
    buttonN.onclick = screen[index]["button functions"][1];
}

function update(screen, index) {
    const button2 = document.querySelector("#button2");
    button2.innerText = screen[index]["button text"][0];
    button2.onclick = screen[index]["button functions"][0];
}


function blinkElement(element, blinkCount) {
    let count = 0;
    const interval = setInterval(() => {
      element.style.visibility = element.style.visibility === 'hidden' ? 'visible' : 'hidden';
      count++;
  
      if (count === blinkCount * 2) {
        clearInterval(interval);
        element.style.visibility = 'visible'; // Ensure the element is visible after blinking stops
      }
    }, 300); // Change blinking speed here (milliseconds, e.g., 500ms for half a second)
  }

  function copCar(element, blinkCount) {
    let count = 0;
    const interval = setInterval(() => {
      element.style.backgroundColor = element.style.backgroundColor === 'rgb(68, 68, 68)' ? 'red' : 'rgb(68, 68, 68)';
      count++;
  
      if (count === blinkCount * 2) {
        clearInterval(interval);
        element.style.backgroundColor = 'rgb(68, 68, 68)'; // Ensure the element is visible after blinking stops
      }
    }, 200); // Change blinking speed here (milliseconds, e.g., 500ms for half a second)
  }

  function no(){
    alert("Get outta here");
    return;
  }

  function yes() {
    const firstPage = document.querySelector(".firstPage");
    const box = document.querySelector(".box");
    const button2 = document.querySelector("#button2");
    firstPage.style.display = 'none';
    box.style.display = 'block';
    button2.style.display = 'block';
  }

  function home1() {
    update(screens)[0];
  }



document.addEventListener("DOMContentLoaded", function () {
    const minusButtons = document.querySelectorAll(".minus-btn");
    const plusButtons = document.querySelectorAll(".plus-btn");
    const counters = document.querySelectorAll(".counter");

    minusButtons.forEach((button, index) => {
        button.addEventListener("click", function () {
            if (parseInt(counters[index].innerText) > 0) {
                counters[index].innerText = parseInt(counters[index].innerText) - 1;
            }
        });
    });

    plusButtons.forEach((button, index) => {
        button.addEventListener("click", function () {
            counters[index].innerText = parseInt(counters[index].innerText) + 1;
        });
    });
});