$(document).ready(function (){
  // searchRepositories();
});

function searchRepositories() {
  const mySearchTerm = $("#searchTerms").val();
  console.log(mySearchTerm)
  $.get(`https://api.github.com/search/repositories?q=${mySearchTerm}`, function(data){
    showRepositories(data);
  }).fail(function(error) {
    displayError();
  })
}

function showRepositories(data) {
  repositories = data.items.map( result => {
  return `
  <div>
  Name: ${result.name} - Description ${result.description} - <a href=${result.html_url} > </a>
  <a href=# onclick="showCommits(this)" data-owner="${result.owner.login}" data-repository="${result.name}" > Show commits </a>
  <img src=${result.owner.avatar_url}>
  </div>`
  })
  $("#results").append(repositories)
}

function displayError() {
  $("#errors").append("<div>There was an error.</div>")
}

function showCommits(el) {
  $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`, function(data){
    console.log(data)
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
  })
}
