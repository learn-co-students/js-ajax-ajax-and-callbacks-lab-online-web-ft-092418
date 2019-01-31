document.addEventListener('DOMContentLoaded', function(event) {
    Handlebars.registerPartial(
      'authorPartial',
      document.getElementById('author-partial-template').innerHTML
    );
});

$(document).ready(function (){
});

function searchRepositories() {
    let userQ = $('#searchTerms')[0].value

    let repos = null

    $.get(`https://api.github.com/users/${userQ}/repos`, function () {})
        .done(function(response) {
            displayRepositories(response)
        })
        .fail( () => displayError() )
}

function displayRepositories(response){
    const src = document.getElementById('repository-template').innerHTML
    const template = Handlebars.compile(src)
    const repoList = template(response)
    document.getElementById('results').innerHTML = repoList
}

function displayError () {

    const src = document.getElementById('error-template').innerHTML 
    const template = Handlebars.compile(src)
    const errorMsg = "I'm sorry, there's been an error. Please try again."
    document.getElementById('errors').innerHTML = errorMsg
    
}

function showCommits(repo) {
    console.log(repo)
}