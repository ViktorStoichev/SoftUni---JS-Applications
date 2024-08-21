function loadRepos() {
	const username = document.getElementById('username').value;
	const reposList = document.getElementById('repos');
	reposList.innerHTML = ''; // Clear the list before appending new content

	fetch(`https://api.github.com/users/${username}/repos`)
		.then(response => {
			if (!response.ok) {
				throw new Error(`Error: ${response.status} (${response.statusText})`);
			}
			return response.json();
		})
		.then(repos => {
			repos.forEach(repo => {
				const li = document.createElement('li');
				const a = document.createElement('a');
				a.href = repo.html_url;
				a.textContent = repo.full_name;
				li.appendChild(a);
				reposList.appendChild(li);
			});
		})
		.catch(error => {
			const li = document.createElement('li');
			li.textContent = error.message;
			reposList.appendChild(li);
		});
}