$(document).ready(function (){
});


function displayError(){
  $('#errors').html("There was an error.")
}

function renderACommit(commit){
  return `<li> <p>${commit.sha } </p> <p> ${commit.commit.message} </p> <p> ${commit.commit.author.name} </p> </li>`
}

function renderCommits(rawCommits){

  let commits = rawCommits.map((commit) => renderACommit(commit)).join(' ')

  return `${commits}`
}

function showCommits(el){

  $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits` , function(data){

    $("#details").html(renderCommits(data))
  }).fail(error => displayError())
}

function renderSearches(results){
  html = results.items.map( result => {
  return `
  <div>
  Name: ${result.name} - Description ${result.description} - <a href=${result.html_url} > </a> <img src=${result.owner.avatar_url}>
  </div>
  `
  }
  )
  $("#results").append(html)
}

function searchRepositories(){
  const phrase = $('#searchTerms').val()

  $.get(`/https://api.github.com/search/repositories?q=${phrase}` , function(data ){
    renderSearches(data)
  }).fail(error => displayError())
}
