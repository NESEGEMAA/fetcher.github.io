let dataString = localStorage.getItem('myData');
let fetchedData = JSON.parse(dataString);

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("logo").src = fetchedData['avatar_url'];
    document.getElementById("favicon").href = fetchedData['avatar_url'];
    document.getElementById("followers").innerHTML = fetchedData['followers'];
    document.getElementById("following").innerHTML = fetchedData['following'];

    let date = new Date(fetchedData['created_at']);
    let formattedDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);

    document.getElementById("joined").innerHTML = "joined: " + formattedDate;
    document.getElementById("bio").innerHTML = fetchedData['bio'];
    document.getElementById("username").innerHTML = fetchedData['login'];
    document.getElementById("name").innerHTML = fetchedData['name'];

    fetch(fetchedData['repos_url'])
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < fetchedData['public_repos']; i++) {
                document.getElementById("repositories").innerHTML +=
            '<span id="repository">' +
            '<span id="left-side">' +
            '<span id="_title">' + extractRepositoryName(data[i]['html_url']) + '</span>' +
            '<span id="_description">' + data[i]['description'] + '</span>' +
            '<span id="rep_footer">' +
            '<span id="_language">' + data[i]['language'] + '</span>' +
            '<span id="_number">' +
            '<img src="/media/sparkle.png" alt="star" style="width:auto; height:12px;" />' +
            data[i]['stargazers_count'] +
            '</span>' +
            '</span>' +
            '</span>' +
            '<span id="right-side">' +
            '<span id="_publicity">' + data[i]['visibility'] + '</span>' +
            '</span>' +
            '</span>';
            }
        })
        .catch(error => {
            document.getElementById("errors").innerHTML = error;
        });
  });

function extractRepositoryName(url) {
    let parts = url.split("/");
    let finalName = parts.pop();
    return finalName;
}

