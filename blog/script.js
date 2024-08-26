const blogPosts = [
        { title: 'Blog Post 1', content: 'This is the content of blog post 1.', image: 'image1.jpg', description: 'This is the description of blog post 1.' },
        { title: 'Blog Post 2', content: 'This is the content of blog post 2.', image: 'image2.jpg', description: 'This is the description of blog post 2.' },
        { title: 'Blog Post 3', content: 'This is the content of blog post 3.', image: 'image3.jpg', description: 'This is the description of blog post 3.' },
        // Add more blog posts here
        {
            title: 'Blog Post 4',
            content: 'This is the content of blog post 4.',
            image: 'image4.jpg',
            description: 'This is the description of blog post 4.'
        },
        {
            title: 'Blog Post 5',
            content: 'This is the content of blog post 5.',
            image: 'image5.jpg',
            description: 'This is the description of blog post 5.'
        },
        {
            title: 'Blog Post 6',
            content: 'This is the content of blog post 6.',
            image: 'image6.jpg',
            description: 'This is the description of blog post 6.'
        },
        {
            title: 'Blog Post 7',
            content: 'This is the content of blog post 7.',
            image: 'image7.jpg',
            description: 'This is the description of blog post 7.'
        },
        {
            title: 'Blog Post 8',
            content: 'This is the content of blog post 8.',
            image: 'image8.jpg',
            description: 'This is the description of blog post 8.'
        },
        {
            title: 'Blog Post 9',
            content: 'This is the content of blog post 9.',
            image: 'image9.jpg',
            description: 'This is the description of blog post 9.'
        },
        {
            title: 'Blog Post 10',
            content: 'This is the content of blog post 10.',
            image: 'image10.jpg',
            description: 'This is the description of blog post 10.'
        }
];

const blogPostsSection = document.querySelector('.blog-posts');

blogPosts.forEach((post) => {
	const article = document.createElement('article');
	const h2 = document.createElement('h2');
	const p = document.createElement('p');
	const img = document.createElement('img');
	const desc = document.createElement('p');

	h2.textContent = post.title;
	p.textContent = post.content;
	img.src = post.image;
	desc.textContent = post.description;

	article.appendChild(h2);
	article.appendChild(p);
	article.appendChild(img);
	article.appendChild(desc);

	article.addEventListener('click', () => {
		article.classList.toggle('big');
	});

	blogPostsSection.appendChild(article);
});
article.addEventListener('click', () => {
	article.classList.toggle('big');
});

article.addEventListener('mouseover', () => {
	article.classList.add('big');
});

article.addEventListener('mouseout', () => {
	article.classList.remove('big');
});