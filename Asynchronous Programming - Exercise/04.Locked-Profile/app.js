async function lockedProfile() {

    const data = await getData();
    const main = document.getElementById("main");
    Object.entries(data).forEach(el => main.appendChild(createProfileCard(el[1])));
    main.removeChild(main.children[0]);

    async function getData() {
        const response = await fetch("http://localhost:3030/jsonstore/advanced/profiles");
        return response.json();
    }

    function createProfileCard(obj) {
        const profileTemplate = document.querySelector(".profile");
        const profile = profileTemplate.cloneNode(true);
        
        const usernameInput = profile.querySelector('input[name$="Username"]');
        usernameInput.value = obj.username;
        
        const emailInput = profile.querySelector('input[name$="Email"]');
        emailInput.value = obj.email;
        
        const ageInput = profile.querySelector('input[name$="Age"]');
        ageInput.value = obj.age;
        ageInput.type = "email";
        
        const hiddenInfo = profile.querySelector(".user1Username");
        hiddenInfo.style.display = 'none';
        const showBtn = profile.querySelector("button");
        
        console.log(profile);
        showBtn.addEventListener("click", function () {
            const isLocked = profile.querySelector(`input[name="user1Locked"]:checked`).value === 'lock';
            
            if (!isLocked) {
                if (hiddenInfo.style.display === 'none') {
                    hiddenInfo.style.display = 'block';
                    showBtn.textContent = 'Hide it';
                } else {
                    hiddenInfo.style.display = 'none';
                    showBtn.textContent = 'Show more';
                }
            } else { }
        })

        return profile;
    }
}