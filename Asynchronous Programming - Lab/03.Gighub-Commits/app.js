function loadCommits() {
    const username = document.getElementById("username").value;
    const repo = document.getElementById("repo").value;
    const commits = document.getElementById("commits");

    fetch(`https://api.github.com/repos/${username}/${repo}/commits`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`${response.status}`);
            }

            return response.json();
        })
        .then(entries => {
            entries.forEach(entry => {
                const li = document.createElement("li");
                li.textContent = `${entry.commit.author.name}: ${entry.commit.message}`;
                commits.appendChild(li);
            })
        })
        .catch(err => {
            const li = document.createElement("li");
            li.textContent = `Error: ${err.message} (Not Found)`
            commits.appendChild(li);
        })
}