// Login form submission handler
document.getElementById('login-form').addEventListener('submit', (e) => {
	e.preventDefault();
	const username = document.getElementById('username').value;
	const password = document.getElementById('password').value;
	// Authenticate user credentials
	if (username === 'admin' && password === 'password') {
		// Login successful, redirect to dashboard
		window.location.href = 'dashboard.html';
	} else {
		// Login failed, display error message
		alert('Invalid username or password');
	}
});

// Register form submission handler
document.getElementById('register-form').addEventListener('submit', (e) => {
	e.preventDefault();
	const username = document.getElementById('username').value;
	const email = document.getElementById('email').value;
	const password = document.getElementById('password').value;
	const confirmPassword = document.getElementById('confirm-password').value;
	// Validate user input
	if (username && email && password && confirmPassword) {
		// Register user
		alert('Registration successful!');
	} else {
		// Registration failed, display error message
		alert('Please fill in all fields');
	}
});

// Forgot password form submission handler
document.getElementById('forgot-password-form').addEventListener('submit', (e) => {
	e.preventDefault();
	const email = document.getElementById('email').value;
	// Send password reset email
	alert('Password reset email sent!');
});

// Reset password form submission handler
document.getElementById('reset-password-form').addEventListener('submit', (e) => {
	e.preventDefault();
	const password = document.getElementById('password').value;
	const confirmPassword = document.getElementById('confirm-password').value;
	// Update user password
	alert('Password updated successfully!');
});

// Dashboard page logic
if (window.location.href === 'dashboard.html') {
	// Display user dashboard
	alert('Welcome to your dashboard!');
}

// Logout button handler
document.getElementById('logout-button').addEventListener('click', () => {
	// Logout user
	alert('Logged out successfully!');
	window.location.href = 'index.html';
});