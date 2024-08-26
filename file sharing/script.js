const header = document.getElementById('header');
const title = document.getElementById('title');
const excerpt = document.getElementById('excerpt');
const profile_img = document.getElementById('profile_img');
const name = document.getElementById('name');
const date = document.getElementById('date');
const animated_bgs = document.querySelectorAll('.animated-bg');
const animated_bg_texts = document.querySelectorAll('.animated-bg-text');

setTimeout(getData, 5000);

function getData() {
    if (header && title && excerpt && profile_img && name && date) {
        header.innerHTML = '<img src="https://images.unsplash.com/photo-1724250267252-247d7691a1ad?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8NnNNVmpUTFNrZVF8fGVufDB8fHx8fA%3D%3D" alt="" />';
        title.innerHTML = 'Google it';
        title.style.textAlign = 'center',
        excerpt.innerHTML = 'description ';
        excerpt.style.textAlign = 'center',
        profile_img.src = "./logo.svg";
        name.innerHTML = 'self Made';
        date.innerHTML = '2004';    
        animated_bgs.forEach((bg) => bg.classList.remove('animated-bg'));
        animated_bg_texts.forEach((bg) => bg.classList.remove('animated-bg-text'));
    } else {
        console.error('One or more elements not found');
    }
}