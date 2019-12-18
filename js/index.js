function getUsers(query) {
    console.log(query);
    fetch(`https://api.github.com/search/users?q=${query}`)
        .then(data => data.json())
        .then(displayUsers)
        .catch(console.log);
}

function displayUsers(usersData) {

    if (document.querySelector("li")) document.querySelectorAll("li").forEach(el => el.remove());
    if (document.querySelector("#owner")) document.querySelector("#owner").remove();
    const userList = document.querySelector("#user-list");
    const foundUsers = usersData.items;
    foundUsers.forEach(u => displayUser.call(userList, u));

}

function displayUser(userData) {
    const item = document.createElement('li');
    const repoLink = document.createElement('h4');
    const userLink = document.createElement('a');
    const avatar = document.createElement('img');

    avatar.src = userData.avatar_url

    repoLink.innerText = "repos";
    repoLink.addEventListener('click', e => getUserRepos(e, userData.login));

    userLink.innerText = userData.login;
    userLink.href = userData.html_url;

    item.append(avatar,userLink, repoLink);
    this.appendChild(item);
}

function getUserRepos(event, name) {
    fetch(`https://api.github.com/users/${name}/repos`)
        .then(data => data.json())
        .then(displayRepos)
        .catch(console.log);
}

function getRepos(query) {
    console.log(query);
    fetch(`https://api.github.com/search/repositories?q=${query}`)
        .then(data => data.json())
        .then(displayRepos)
        .catch(console.log)
}

function displayRepos(reposData) {

    let search = false;

    if (reposData.items) {
        reposData = reposData.items;
        search = true;
    }

    document.querySelectorAll("li").forEach(el => el.remove());
    if (document.querySelector("#owner")) document.querySelector("#owner").remove();
    
    if (!search) {
       
        const container = document.querySelector("#github-container");
        const owner = document.createElement("h1");

        owner.id = "owner";
        owner.innerText = `${reposData[0].owner.login}'s repos:`;
        container.insertAdjacentElement('beforebegin', owner);
    }

    const repoList = document.querySelector("#repos-list");
    reposData.forEach(r => displayRepo.call(repoList, r));
    
}

function displayRepo(repoData) {

    const item = document.createElement("li");
    const repoName = document.createElement("h4");
    const link = document.createElement('a');

    link.href = repoData.html_url;
    link.innerText = repoData.name;

    repoName.appendChild(link);
    item.appendChild(repoName);
    this.appendChild(item);

}

const userSearch = document.querySelector("#user-search");
const repoSearch = document.querySelector("#repo-search");

userSearch.addEventListener('click', e => {
    e.preventDefault();
    const input = document.querySelector("#search");
    getUsers(input.value);
    input.value = "";
});

repoSearch.addEventListener('click', e => {
    e.preventDefault();
    const input = document.querySelector("#search");
    getRepos(input.value);
    input.value = "";
});