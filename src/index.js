import $ from 'jquery';
const state = {
  results: [],
  userInput: '',
  gitName: [],
  gitUrl: []
};
// HTML Generators
const generateFormHTML = function () {
  return '<h1>Github User Repository Search</h1><form><input type="text"><input type="submit"></form>';
};
const generateNameRequest = function () {
  let html = [];
  for (let i = 0; i < state.gitName.length; i++) {
    html.push(`<li><h3>${state.gitName[i]}</h3><a href="${state.gitUrl[i]}" target="_blank">Link to Repository</a></li>`);
  }
  return html;
};
// function to render HTML
const render = () => {
  let page = generateFormHTML();
  if (state.gitName.length > 0) {
    page += generateNameRequest();
  }
  $('body').html(page);
};
// handlers
const inputHandler = function () {
  $('body').on('submit', 'form', function (e) {
    e.preventDefault();
    state.userInput = $('input[type="text"]').val();
    fetch(`https://api.github.com/users/${state.userInput}/repos`)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(data => {
        state.gitUrl = [];
        state.gitName = [];
        data.forEach(d => state.gitName.push(d.name));
        data.forEach(d => state.gitUrl.push(d.html_url));
        render();
      }).catch(err => {
        console.log(err);
      });
  });
};
// main functions
const main = () => {
  render();
  inputHandler();
};
$(main);