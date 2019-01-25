$(document).ready(function(){

});

function searchRepositories() {
    const searchTerm = $('#searchTerms').val();

    $.get(`https://api.github.com/search/repositories?q=${searchTerm}`, function(data) {
        showRepositiories(data);
    }).fail(function(error){
        displayError();
    });
}

function showRepositiories(data) {
    repos = data.items.map(function(repo) {
        return `<li>${repo.name} - ${repo.description} - <a href=${repo.html_url}>Repo</a><img src=${repo.owner.avatar_url}><a href=${repo.owner.html_url}>Profile</a> <a href="" data-repo=${repo.name} data-user=${repo.owner.login} onclick=showCommits(this)>Show Commits</a></li>`
    });

    $('#results').append(repos);
}

function showCommits(el) {
    $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`, function(data){
      $("#details").html(
        commits = data.map(commit =>
          `<ul>
            <li> SHA: ${commit.sha} </li>
            <li> Author: ${commit.commit.author.name} </li>
            <li> Login: ${commit.committer.login} </li>
            <img src=${commit.committer.avatar_url}
          </ul>
          `
        )
      )
    });
  }

function displayError() {
    $('#errors').html("I'm sorry, there's been an error. Please try again.");
}


