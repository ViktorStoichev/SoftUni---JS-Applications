function attachEvents() {
    const loadPostsBtn = document.getElementById("btnLoadPosts");
    const selectPosts = document.getElementById("posts");
    const viewPostBtn = document.getElementById("btnViewPost");
    const h1 = document.getElementById("post-title");
    const p = document.getElementById("post-body");
    const ulComments = document.getElementById("post-comments");
    loadPostsBtn.addEventListener("click", async function () {
        const data = await getPosts();
        Object.entries(data).forEach(entry => {
            const option = document.createElement("option");
            option.value = entry[0];
            option.textContent = entry[1].title;
            selectPosts.appendChild(option);
        })

        viewPostBtn.addEventListener("click", async function() {
            h1.innerHTML = "";
            p.innerHTML = "";
            ulComments.innerHTML = "";
            h1.textContent = selectPosts.options[selectPosts.selectedIndex].text;
            p.textContent = data[selectPosts.value].body;
            const commentsData = await getComments();
            const foundComments = Object.values(commentsData).filter(comment => comment.postId === selectPosts.value);
            foundComments.forEach(comment => {
                const li = document.createElement("li");
                li.id = comment.id;
                li.textContent = comment.text;
                ulComments.appendChild(li);
            })
        })
    })

    async function getPosts() {
        const response = await fetch("http://localhost:3030/jsonstore/blog/posts");
        return response.json();
    }

    async function getComments() {
        const response = await fetch("http://localhost:3030/jsonstore/blog/comments");
        return response.json();
    }
}

attachEvents();