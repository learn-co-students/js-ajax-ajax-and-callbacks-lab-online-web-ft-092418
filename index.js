$(document).ready(function (){
});

function searchRepositories() {
    let terms = $('#searchTerms')[0].value
    $.get(`https://api.github.com/search/repositories?q=${terms}`, function(data) {
        let response = data.items
        showRepositories(response)
        
    }).fail(function(error) {
        displayError()
    })
}

function showRepositories(response) {
    const template = Handlebars.compile(document.getElementById('repository-template').innerHTML);
    const repoList = template(response);
    
    document.getElementById('results').innerHTML = repoList
}

function showCommits(el) {
    debugger
    $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`, function(data) {
        const template = Handlebars.compile(document.getElementById('commits-template').innerHTML)
        document.getElementById('details').innerHTML = template(data)
    }).fail(function(error) {
        displayError()        
    })   
}

function displayError() {
    let message = '<p>I\'m sorry, there\'s been an error. Please try again.</p>'
    document.getElementById('errors').innerHTML = message
}