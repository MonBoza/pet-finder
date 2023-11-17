import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import PoemFinder from './Poem-finder';

// Business Logic
async function getPoem(keyword) {
    const response = await PoemFinder.getPoem(keyword);
    if (response) {
        printElements(response, keyword);
    } else {
        printError(response, keyword);
    }
}

// UI Logic

function printElements(response, keyword) {
    document.querySelector('#displayResults').innerText = `Here are the poems with the word ${keyword}`
    const resultContainer = document.querySelector('#displayResults');
    response.forEach(function (poem){
        const listItem = document.createElement("li");
        listItem.textContent = `Title: ${poem.title} | Author: ${poem.author} | Lines: ${poem.lines}`;
        resultContainer.appendChild(listItem);
    });
}

function printError(error, keyword) {
  let errorMessage = '';
  
  if (!keyword || !isValidKeyword(keyword)) {
    errorMessage = `Invalid keyword: ${keyword}. Please enter a valid keyword.`;
  } else {
    errorMessage = `There was an error accessing the poem data for ${keyword}: ${error}`
  }
    document.querySelector('#displayResults').innerText = errorMessage;
}

function isValidKeyword(keyword) {
  return keyword.length >= 3;
}


function handleFormSubmission(event) {
    event.preventDefault();
    const keyword = document.querySelector('#keyWord').value;
    document.querySelector('#keyWord').value;
    
    if (isValidKeyword(keyword)) {
      getPoem(keyword);
    } else {
      printError('Invalid keyword. Please enter a valid keyword.', keyword);
    }
    
}

window.addEventListener("load", function () {
    document.querySelector('form').addEventListener("submit", handleFormSubmission);
});