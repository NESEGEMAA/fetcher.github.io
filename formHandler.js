document.addEventListener("DOMContentLoaded", function() {
    let button = document.getElementById("submission_button");
    button.addEventListener('click', startFetch);
  });

function startFetch() {
    let username = document.getElementById("username").value;
    let url = "https://api.github.com/users/" + username;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('myData', JSON.stringify(data));
            window.location.href = "dataDisplay.html";
        })
        .catch(error => {
            document.getElementById("errors").innerHTML = error;
        });
}