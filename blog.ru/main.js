let id = 2;
async function getPosts() {
    let res = await fetch('http://api.blog.ru/posts');
    let posts = await res.json();
    posts = posts.splice(0,10);
    let i = posts.length;
    let list = document.querySelector('.container');
    list.innerHTML = '';
    for (key in posts) {
        list.innerHTML += `
        <div class="row post-list">
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                <h5 class="card-title">${posts[key].title}</h5>
                <p class="card-text">${posts[key].body}</p>
                <a href="#" class="btn btn-primary">Добавить</a>
                <a href="#" class="btn btn-primary" onclick="removePost(${posts[key].id})">Удалить</a>
                <a href="#" class="btn btn-primary" onclick="selectPost('${posts[key].id}', '${posts[key].title}', '${posts[key].body}')">Редактировать</a>
                </div>
            </div>
        </div>
        `
    }
   
}

async function addPost() {
    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;

    let formDate = new FormData();
    formDate.append('title', title);
    formDate.append('body', body);
    const res = await fetch('http://api.blog.ru/posts', {
        method: 'POST',
        body: formDate
    });
    const data = await res.json();
    console.log(data);
    if (data.status === true) {
       await getPosts();

    }

}

async function removePost(id) {
    const res = await fetch(`http://api.blog.ru/posts/${id}`, {
        method: "DELETE"
    });
    const data = await res.json();
    if (data.status === true) {
        await getPosts();
    }
    }

function selectPost(id, title, body) {
    id = id;
    document.getElementById('title-edit').value = title;
    document.getElementById('body-edit').value = body;

}

async function updatePost() {
   const title = document.getElementById('title-edit').value, 
    body = document.getElementById('body-edit').value;
    
    const data = {
        title : title,
        body : body
    };
    
    const res = await fetch(`http://api.blog.ru/posts/${id}`, {
        method: "PATCH" ,
        body: JSON.stringify(data)
    });

    let resData = res.json();

    if (resData.status === true) {
        await getPosts();
    }
}

getPosts();