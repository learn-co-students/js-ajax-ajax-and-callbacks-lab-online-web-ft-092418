document.addEventListener('DOMContentLoaded', function(event) {
    Handlebars.registerPartial(
      'authorPartial',
      document.getElementById('author-partial-template').innerHTML
    );
});

$(document).ready(function (){
    // currently does nothing
    // otherwise once page loads, these things would execute
    
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
    // const src = document.getElementById('repository-template').innerHTML
    // const template = Handlebars.compile(src)
    // const repoList = template(response)
    // document.getElementById('results').innerHTML = repoList

    const src = $('#repository-template')[0].innerHTML
    const template = Handlebars.compile(src)
    const repoList = template(response)
    $('#results')[0].innerHTML = repoList
}

function displayError () {

    const src = $('#error-template')[0].innerHTML 
    const template = Handlebars.compile(src)
    const errorMsg = "I'm sorry, there's been an error. Please try again."
    $('#errors')[0].innerHTML = errorMsg
    
}

function showCommits(commitsURL) {
    commitsURL = commitsURL.slice(0, -6)
    
    let commits = null 
    $.get(commitsURL, function () {})
        .done(function(response) {
            displayCommits(response)
            console.log('response: ', response)
        })
        .fail( () => displayError())

}

function displayCommits(response) {
    const src = $('#commit-template')[0].innerHTML
    const template = Handlebars.compile(src)
    const commitList = template(response)
    $('#details')[0].innerHTML = commitList
}