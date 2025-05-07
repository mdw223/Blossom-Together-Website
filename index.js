/*** Dark Mode ***/
// Step 1: Select the theme button
const darkModeButtons = document.querySelectorAll("#theme-button");
// Step 2: Write the callback function
const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
}
// Step 3: Register a 'click' event listener for the theme button,
//             and tell it to use toggleDarkMode as its callback function
darkModeButtons.forEach(button => {
    button.addEventListener('click', toggleDarkMode);
});

/*** Form Handling ***
  
  Purpose:
  - When the user submits the RSVP form, the name and state they 
    entered should be added to the list of participants.
***/

// Step 1: Add your query for the submit RSVP button here
const rsvpButton = document.getElementById("rsvp-button");
let count = 3;
const participantsDiv = document.querySelector(".participants");

const addParticipant = (person) => {
  console.log(person.firstName, person.lastName, person.phoneNumber, person.email);

  // update counter
  const rsvpCountElement = document.getElementById("rsvp-count");
  count++;
  rsvpCountElement.textContent = "🌹" + count + " people have RSVP'd to this event!";

  // add the participant name to the list 
  const newParticipantParagraph = document.createElement('p');
  newParticipantParagraph.textContent = "🌹 " + person.firstName + " has RSVP'd.";
  participantsDiv.appendChild(newParticipantParagraph);

  toggleModal(person);
}

const isValidEmail = (email) => {
  // Basic but more common email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
const isValidPhoneNumber = (phoneNumber) => {
  // Regular expression to match either format
  const phoneRegex = /^\d{3}-?\d{3}-?\d{4}$/;
  return phoneRegex.test(phoneNumber);
};

/*** Form Validation ***
  Purpose:
  - Prevents invalid form submissions from being added to the list of participants.
***/
var rsvpInputs = document.getElementById("rsvp-form").elements;
const validateForm = () => {
  let containsErrors = false;
  let person = {
    firstName: document.getElementById('fname').value,
    lastName: document.getElementById('lname').value,
    phoneNumber: document.getElementById('contact').value,
    email: document.getElementById('email').value
  };

  for (let i = 0; i < rsvpInputs.length; i++) {
    const inputElement = rsvpInputs[i];

    if ((inputElement.value.length < 2 && inputElement.id !== "rsvp-button") 
      || (inputElement.id === "email" && !isValidEmail(person.email)) 
      || (inputElement.id === 'contact' && !isValidPhoneNumber(person.phoneNumber))) {
      containsErrors = true;
      // Add the class 'error' to the current input element
      inputElement.classList.add('error');
    } else {
      inputElement.classList.remove('error');
    }
  }

  if (!containsErrors) {
    addParticipant(person);
    // Clear the input fields
    for (let i = 0; i < rsvpInputs.length; i++) {
      if (rsvpInputs[i].type !== 'button' && rsvpInputs[i].type !== 'submit') {
        rsvpInputs[i].value = '';
      }
    }
    return true; // means it was correctly validated 
  } else {
    return false;
  }
}
// Step 3: Replace the form button's event listener with a new one that calls validateForm()
rsvpButton.addEventListener('click', (event) => {
  const isValid = validateForm();
  console.log("validateForm returned:", isValid);
  if (isValid) { // If validateForm returns true (no errors)
    event.preventDefault();
  }
});

/*** Modal ***
  Purpose:
  - Use this starter code to add a pop-up modal to your website.
***/
let intervalId;
const modal = document.querySelector('.modal');
const toggleModal = (person) => {
  const modalContainer = document.querySelector('.modal-container');
  const modalItem = document.getElementById('modal-item-text');
  const closeButton = document.querySelector('.close-button');
  if (modal && modalContainer && modalItem && closeButton) {
    modal.style.display = "flex";
    modalItem.textContent = `Thank you ${person.firstName} so much for your interest!\nWe cannot wait to blossom together🌹`;
    intervalId = setInterval(animateImage, 500);
    closeButton.addEventListener('click', () => {
      // Your code to close the element goes here
      clearInterval(intervalId);
      modal.style.display = "none";
      console.log('Close button clicked!');
    });
    // else if they dont click it in 5 secs
    setTimeout(() => {
      clearInterval(intervalId);
      modal.style.display = "none";
    }, 5000);
  } else {
    console.log("Error: element not found");
  }
}
// TODO: animation variables and animateImage() function
let rotateFactor = 0;
const modalImage = document.getElementById('modal-item-img').querySelector('img');
const animateImage = ()=> {
  if (modalImage) {
    if(rotateFactor === 0) {
      rotateFactor = 10;
    } else if (rotateFactor === 10) {
      rotateFactor = .01;
    } else if (rotateFactor === .01) {
      rotateFactor = -10;
    } else if (rotateFactor === -10) {
      rotateFactor = 0;
    } else { 
      rotateFactor = 0;
    }
    modalImage.style.transform = `rotate(${rotateFactor}deg)`;
  } else {
    console.log("Error: Image element not found within modal-image-container");
  }
}

let slideIndex = 1; // this is the first slide i have that is automatic
showSlides(slideIndex);

let slidePage = 1; // the manual slides index
showSlides(slidePage, 'slides-page');

// n it how much we add to the slide index
function plusSlides(n, slideClass='slide') {
    if (slideClass === 'slides-page') {
      showSlides(slidePage += n, 'slides-page');
    } else {
      showSlides(slideIndex += n);
    }
}

function showSlides(n, slideClass='slide') {
    let slides;
    let dots;
    if (slideClass === 'slide') {
      slides = document.getElementsByClassName('slide');
      dots = document.getElementsByClassName('dot');
      if (n > slides.length) {slideIndex = 1}
      if (n < 1) {slideIndex = slides.length}
    } else if (slideClass === 'slides-page') {
      slides = document.getElementsByClassName("slides-page");
      dots = document.getElementsByClassName("dot1");
      if (n > slides.length) {slidePage = 1}
      if (n < 1) {slidePage = slides.length}
    }
    let i;
    // makes the slides inactive 
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        if (slideClass === 'slide') {
          slides[i].classList.remove('active');
        }
    }
    // makes the dots inactive
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active-dot", "");
    }
    if (slideClass === 'slide') {
      slides[slideIndex-1].style.display = "flex";
      slides[slideIndex-1].classList.add('active');
      dots[slideIndex-1].className += " active-dot";
    } else if (slideClass === 'slides-page') {
      slides[slidePage-1].style.display = "flex";
      slides[slidePage-1].classList.add('active');
      dots[slidePage-1].className += " active-dot";
    }
    
}

// Automatic slideshow (optional)
setInterval(() => {
    plusSlides(1);
}, 5000); // Change slide every 5 seconds (5000 milliseconds)

const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');
nextButton.addEventListener('click', (event) => {
  plusSlides(1, 'slides-page');
  console.log("nextButton clicked!");
  event.preventDefault();
});
prevButton.addEventListener('click', (event) => {
  plusSlides(-1, 'slides-page');
  console.log("prevButton clicked!");
  event.preventDefault();
});