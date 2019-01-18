$(document).ready(function (){
});

function displayError(){
  $('#errors').html("error")
}

function searchRepositories(){
  const searchString = $('#searchTerms').val()
  $.get(`https://api.github.com/search/repositories?q=${searchString}`, data => {
    displayRepositories(data)
  })
}

function displayRepositories(data){
  html = data.items.map(repo => {
    return `<li>${repo.name} - ${repo.description} - <a href=${repo.html_url}>Repo</a><img src=${repo.owner.avatar_url}><a href=${repo.owner.html_url}>Profile</a> <a href="" data-repo=${repo.name} data-user=${repo.owner.login} onclick=showCommits(this)>Show Commits</a></li>`
  })
  $("#results").append(html)
}

function showCommits(el){
  $.get(`https://api.github.com/repos/${el.dataset.user}/${el.dataset.repo}/commits`, function(data){
      debugger
      $("#details").html(displayCommits(data))
  }).fail(error => {
    displayError()
  })
}

function displayCommits(data){
  let commits = data.map((commit)=>detailRender(commit))
  return `${commits}`
}

function detailRender(commit){
  return `
    <h3>Commit</h3>
    <p>Author: ${commit.commit.author.name}, Message: ${commit.commit.message}, ${commit.sha}</p>`
  // `<li><h3>${commit.sha}</h3><p>${commit.commit.message}</p></li>`
}
