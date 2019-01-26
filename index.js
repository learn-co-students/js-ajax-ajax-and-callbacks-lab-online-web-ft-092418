$(document).ready(function (){
    $('#link').click(function(){
      searchRepositories();
    })
});

function displayError() {
    $('#errors').html("I'm sorry, there's been an error. Please try again.")
}
        
function searchRepositories() {
    let searchTerms = document.getElementById("searchTerms").value
    let URI = 'https://api.github.com/search/repositories?q=' + searchTerms;
    $.get(URI, function(response){
      let details = response.items
      .map(r => 
        `<a href="${r.html_url}">${r.name}</a>
        <p><img src="${r.owner.avatar_url}"/></p>
        <p>${r.owner.login}</p>
        <p><a href="${r.owner.html_url}">Profile</a></p>
        <p>${r.description}</p>
        <p><a href="#" data-owner=${r.owner.login} data-repository=${r.name} onclick="showCommits(this)">show commits</a></p>`
      ).join(' ')
      $('#results').html(details)
    }).fail(function(){
      displayError();
    })
}

function showCommits(el) {
    let URL = "https://api.github.com/repos/" + el.dataset.owner + "/" + el.dataset.repository + "/commits"
    $.get(URL, function(response) {
        console.log(response)
        let details = response.map(r => `
        <p>SHA: ${r.sha}</p>
        <p>Author: ${r.author.name}</p>
        <p>Login: ${r.author.login}</p>`).join(' ')
        {$("#details").html(details)}
    }).fail(function (){
        displayError()
    })
}
