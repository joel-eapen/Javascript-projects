const searchBtn = document.querySelector('.search-btn');
const searchInp = document.querySelector('.search');
const reposContainer = document.querySelector('.repos-container');


searchBtn.addEventListener('click', searchUser);
searchInp.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchUser();
})

async function searchUser() {
    const username = searchInp.value.trim();
    if (!username) return alert('Please enter a username');

    try {
        const response = await fetch(`https://api.github.com/users/${username}`, {
            headers: {
                Authorization: "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"
            }
        });
        if (!response.ok) throw new Error('User not found');
        const userData = await response.json();
        displayUserData(userData);
        fetchRepos(userData.repos_url);
    } catch (error) {
        showError();

    }
}


function displayUserData(user) {
    document.getElementById('error-container').classList.add('hidden');
    document.querySelector('.profile-box').classList.remove('hidden');
    let detailsHTML =
        `<div class="profile-box-inside">
        <div class="user-profile">
                <div class="user-image">
                    <img src="${user.avatar_url}"
                        alt="">
                </div>
                <div class="user-details">
                    <p>${user.name}</p>
                    <p id="user-name">${user.login}</p>
                    <p>${user.bio || 'No bio available'}</p>
                    <p>View Profile</p>
                </div>
            </div>
            
            <div class="user-account-details">
                <div class="user-following">
                    <button>${user.followers} Follower </button>
                    <button>${user.following} Following</button>
                    <button>${user.public_repos} Repositories</button>
                </div>

                <div class="user-other-accounts">
                    <p>${user.location || 'Null'}</p>
                    <a href="${user.blog || '#'}" target="_blank"> Blog</a>
                    <a href="${user.twitter_username ? `https://twitter.com/${user.twitter_username}` : '#'}" target="_blank"> Twitter</a>
    
                </div>

                
                    
            </div>
        </div>
    `
    document.querySelector('.profile-box').innerHTML = detailsHTML;
}

async function fetchRepos(reposURL) {
    try {
        const response = await fetch(reposURL, {
            headers: {
                Authorization: ""
            }
        });
        if (!response.ok) throw new Error('Failed to fetch repositories');
        const repos = await response.json();
        displayRepos(repos);
    } catch (error) {
        console.error('Error fetching repositories:', error);
    }
}

function displayRepos(repos) {
    document.getElementById('repo-title').classList.remove('hidden');
    if (repos.length === 0) {
        document.getElementById('repo-title').classList.remove('hidden');
        document.querySelector('.user-repo').classList.remove('hidden');
        reposContainer.innerHTML = '<p>No repositories found.</p>';
        return;
    }
    let reposHTML = '';

    repos.forEach((repo) => {
        document.querySelector('.user-repo').classList.remove('hidden');
        reposHTML +=
            `<article class="repo-card">
            <a href="#" class="repo-name">
                <i class="fa-solid fa-code-fork" aria-hidden="true"></i>
                ${repo.name}
            </a>
            <p class="repo-description">${repo.description || 'No description available'}</p>
            <div class="repo-meta">
                <span><i class="fa-solid fa-circle repo-language-dot" aria-hidden="true"></i> ${repo.language}</span>
                <span><i class="fa-solid fa-star" aria-hidden="true"></i> ${repo.stargazers_count}</span>
                <span><i class="fa-solid fa-code-fork" aria-hidden="true"></i> ${repo.forks_count}</span>
                <span><i class="fa-regular fa-clock" aria-hidden="true"></i> ${dateFormat(new Date(repo.updated_at))}</span>
            </div>
        </article>
        `
    });
    reposContainer.innerHTML = reposHTML;
}

function showError() {
    document.getElementById('error-container').classList.remove('hidden');
    document.querySelector('.profile-box').classList.add('hidden');
    document.querySelector('.user-repo').classList.add('hidden');
}

function dateFormat(date) {
    const formatted = date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });
    return formatted;
}