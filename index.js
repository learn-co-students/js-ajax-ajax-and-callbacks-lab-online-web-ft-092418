$(document).ready(function (){
});

const displayError = error => $('#errors').html(`${error}`);

const renderCommit = commit => `<li><h3>${commit.sha}</h3><p>${commit.commit.message}</p></li>`;

const renderCommits = commits =>`<ul>${commits.map((commit)=>renderCommit(commit)).join('')}</ul>`;

const showCommits = repo => {
  $.get(`https://api.github.com/repos/${repo.dataset.owner}/${repo.dataset.repository}/commits`, commits => {
    $('#details').html(renderCommits(commits))
  }).fail(error => {
    displayError(error)
  })
}

const renderSearchResult = result => {
  return `
      <div>
        <h2><a href="${result.html_url}">${result.name}</a></h2>
        <p><a href="#" data-repository="${result.name}" data-owner="${result.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
        <p>${result.description}</p>
      </div>
      <hr>
    `
}

const renderSearchResults = data => data.items.map( result => renderSearchResult(result))

const searchRepositories = () => {
  const searchTerms = $('#searchTerms').val()
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, data => {
      $('#results').html(renderSearchResults(data))
    }).fail(error => {
      displayError()
    })
}

