let searchButton = document.getElementById('search');
let searchInput = document.getElementById('search-keyword');
let searchSkip = document.getElementById('search-skip');
let searchLimit = document.getElementById('search-limit');
let searchLists = document.getElementById('search-lists');

searchButton.addEventListener('click', function() {
    let keyword = searchInput.value.trim();
    let skip = searchSkip.value || 0;
    let limit = searchLimit.value;
    if (keyword) {
        fetch(`${url}/api/v1/posts/search?keyword=${keyword}&skip=${skip}&limit=${limit}`)
            // method : get
        .then(function(response) {
            if(!response.ok) {
                searchLists.innerHTML = `<p>搜索失败，网络错误</p>`;
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(function(data) {
            // Handle the search results
            let count = data.total;
            data = data.items;
            // Display the search results
            searchLists.innerHTML = '';
            if (count === 0) {
                searchLists.innerHTML = `<p>没有找到相关的文章</p>`;
                throw new Error('No posts found');
            }
            let postcount = document.createElement('p');
            postcount.textContent = `共找到 ${count} 篇文章`;
            searchLists.appendChild(postcount);
            fetchPost(data[0].id);
            let nextpost = document.createElement('button');
            nextpost.type = 'button';
            searchLists.appendChild(nextpost);
            if(data.length > 1) {
                nextpost.textContent = "next post";
            }
            let currpost = 0;
            nextpost.addEventListener('click', function() {
                if (currpost < data.length - 1) {
                    nextpost.textContent = "next post";
                    currpost++;
                    fetchPost(data[currpost].id);
                }
                if(currpost >= data.length - 1) {
                    this.disabled = true;
                    this.textContent = "no more post";
                }
                if(currpost > 0) {
                    lastpost.disabled = false;
                    lastpost.textContent = "last post";
                }
            });
            let lastpost = document.createElement('button');
            lastpost.type = 'button';
            lastpost.textContent = "last post";
            searchLists.appendChild(lastpost);
            if(currpost <= 0) {
                lastpost.disabled = true;
                lastpost.textContent = "no more post";
            }
            lastpost.addEventListener('click', function() {
                if (currpost > 0) {
                    this.textContent = "last post";
                    currpost--;
                    fetchPost(data[currpost].id);
                }
                if(currpost <= 0) {
                    this.disabled = true;
                    this.textContent = "no more post";
                }
                if(currpost < data.length - 1) {
                    nextpost.disabled = false;
                    nextpost.textContent = "next post";
                }
            });
        })
        .catch(function(error) {
            console.error('There was a problem with the fetch operation:', error);
        })
    }
})