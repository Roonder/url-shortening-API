// Variables
const burgerBtn = document.querySelector('#burger-menu');
const menuMobile = document.querySelector('#menuMobile');
const shortenerInput = document.querySelector('#shortener');
const shortenerDiv = document.querySelector('.shortener');
const form = document.querySelector('#form');
const results = document.querySelector('#results');
const startBtn = document.querySelectorAll('.start');

//Start
startBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        shortenerDiv.scrollIntoView({
            top: 100,
            behavior: 'smooth'
        })

    });
});

// Menu Mobile
burgerBtn.addEventListener('click', toggleMenu);

function toggleMenu() {
    menuMobile.classList.toggle('no-display');
}

const consultAPI = async () => {
    const url = 'https://api.shrtco.de/v2/shorten?url=';
    const shortenURL = shortenerInput.value;
    try {
        const response = await fetch(`${url}${shortenURL}`);
        const result = await response.json();
        printResult(result.result);
    } catch (error) {
        console.log(error);
    }
}

// API Consult
form.addEventListener('submit', validate);

function validate(e) {
    e.preventDefault();
    
    if(shortenerInput.value === '') {
        showAlert('Please, add a link');
        return;
    }

    consultAPI();
}

function showAlert(message) {
    const alerts = document.querySelector('.alert');
    if(!alerts) {
        const alert = document.createElement('DIV');
        alert.textContent = message;
        alert.classList.add('alert');
        shortenerInput.classList.add('red-border');
        if(window.innerWidth > 769){
            shortenerDiv.appendChild(alert);
        } else {
            form.insertBefore(alert, shortenerInput.nextElementSibling);
        }

        setTimeout(() => {
            alert.remove();
            shortenerInput.classList.remove('red-border');
        }, 3000);
    }
}

function printResult(result) {
    const {full_short_link3, original_link} = result;
    console.log(result);
     
    const linkDiv = document.createElement('DIV');
    linkDiv.classList.add('shorten-link')

    const ogLink = document.createElement('P');
    ogLink.textContent = original_link;

    const doneDiv = document.createElement('DIV');
    doneDiv.classList.add('done-info');

    const shortLink = document.createElement('A');
    shortLink.href = full_short_link3;
    shortLink.textContent = full_short_link3;

    const copyBtn = document.createElement('BUTTON');
    copyBtn.textContent = 'Copy';
    copyBtn.onclick = () => {
        copy(full_short_link3);
        copyBtn.textContent = 'Copied!';
        copyBtn.classList.add('copied');

        setTimeout(() => {
            copyBtn.textContent = 'Copy';
            copyBtn.classList.remove('copied');
        }, 3000);
    }

    linkDiv.appendChild(ogLink);
    doneDiv.appendChild(shortLink);
    doneDiv.appendChild(copyBtn);
    linkDiv.appendChild(doneDiv);
    results.appendChild(linkDiv);
}

function copy(link) {
    navigator.clipboard.writeText(link);

}