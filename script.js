const url = document.getElementById('url')
const title = document.getElementById('title')
const form = document.getElementById('form')
const pushNoti = document.getElementById('push-noti')
const ul = document.getElementById('ul')
const hiddenInput = document.getElementById('hidden')

const localStorageUrls = JSON.parse(localStorage.getItem('urls'))

let urls = localStorageUrls !== null ? localStorageUrls : []

function render(){
    urls.map(url => {
        const li = document.createElement('li')
        li.classList.add('item')
        li.innerHTML = `
        <a href="${url.link}" title="${url.title}">
        <div class="item-div">
        <p>${url.title} ${url.link.includes('http://') ? '( Not Secure )' : ''}</p>
        </div>
        </a>
        <button type="button" onclick="copy('${url.link}')"><i class="fa fa-clone" aria-hidden="true"></i></button>
        <button type="button" onclick="removeById(${url.id})"><i class="fa fa-trash" aria-hidden="true"></i></button>`;
        ul.appendChild(li)
        if(url.link.includes('http://')){
            li.classList.add('danger')
        }
    })
}

render()

function submitfnc(e){
    e.preventDefault()
    if(url.value === '' && title.value === ''){
        alert('Please enter a valid URL and title')
    }else{
        const urll = {
            id: generateId(),
            link: url.value,
            title: title.value
        }

        urls.push(urll)

        ul.innerHTML = '';
        render()

        updateLocalStorage()

        url.value = '';
        title.value = '';
    }
}

function generateId(){
    return Math.floor(Math.random() * 1000000000)
}

function removeById(id){
    urls = urls.filter(url => url.id !== id);
    ul.innerHTML = '';
    render();
    updateLocalStorage();
}

function copy(link){
    hiddenInput.value = '';
    hiddenInput.value = link;
    hiddenInput.select();
    document.execCommand('Copy');
    pushNoti.classList.toggle('active')
    setTimeout(() => {
        pushNoti.classList.toggle('active')
    }, 2000);
}

function updateLocalStorage(){
    localStorage.setItem('urls', JSON.stringify(urls))
}

form.addEventListener('submit', submitfnc)