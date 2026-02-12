<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import {user} from '$lib/stores';
	import { goto } from '$app/navigation';

	let loginOrRegister = $state('login');

	const handleSubmit = async (event: Event) => {
		event.preventDefault();
		if(loginOrRegister === 'login') {
			await handleLogin(event);
		} else {
			await handleRegister(event);
		}
	};

	const handleLogin = async (event: Event) => {
		console.log('hi')
		const formData = new FormData(event.target as HTMLFormElement);
		const email = formData.get('username') as string;
		const password = formData.get('password') as string;

		try {
			const response = await fetch('/api/auth/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password })
			});

			if (response.ok) {
				const data = await response.json();
				user.set(data.user);
				goto('/learn');
			} else {
				const errorData = await response.json();
				alert(errorData.error || 'Login failed');
			}
		} catch (error) {
			console.error('Error during login:', error);
			alert('An error occurred. Please try again.');
		}
	};

	const handleRegister = async (event: Event) => {
		const formData = new FormData(event.target as HTMLFormElement);
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		try {
			const response = await fetch('/api/auth/register', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password })
			});

			if (response.ok) {
				const data = await response.json();
				user.set(data.user);
				goto('/learn');
			} else {
				const errorData = await response.json();
				alert(errorData.error || 'Registration failed');
			}
		} catch (error) {
			console.error('Error during registration:', error);
			alert('An error occurred. Please try again.');
		}
	};
</script>

<div class="container">
	{#if loginOrRegister === 'login'}
		<div class="header" in:fly|global={{ y: -50, duration: 600, delay: 0 }}>
			<h1>Login</h1>
			<h5>Continue your language learning journey.</h5>
		</div>

		<div class="form-card" in:fly|global={{ y: -30, duration: 600, delay: 150 }}>
			<form onsubmit={handleSubmit}>
				<div class="form-group">
					<label for="username">Email</label>
					<input type="text" id="username" name="username" required placeholder="Enter your email" />
				</div>

				<div class="form-group">
					<label for="password">Password</label>
					<input type="password" id="password" name="password" required placeholder="Enter your password" />
				</div>

				<button type="submit" class="submit-button">Login</button>
			</form>
		</div>

		<div class="switch-card" in:fly|global={{ y: -10, duration: 600, delay: 300 }}>
			<h5>Don't have an account?</h5>
			<button class="switch-button" onclick={() => (loginOrRegister = 'register')}>
				Register here
			</button>
		</div>
	{:else}
		<div class="header" in:fly|global={{ y: -50, duration: 600, delay: 0 }}>
			<h1>Register</h1>
			<p class="subtitle">Join us and start learning Spanish today!</p>
		</div>

		<div class="form-card" in:fly|global={{ y: -30, duration: 600, delay: 150 }}>
			<form onsubmit={handleSubmit}>
				<div class="form-group">
					<label for="email">Email</label>
					<input type="text" id="email" name="email" required placeholder="Enter your email" />
				</div>

				<div class="form-group">
					<label for="password">Password</label>
					<input type="password" id="password" name="password" required placeholder="Enter your password" />
				</div>

				<button type="submit" class="submit-button">Register</button>
			</form>
		</div>

		<div class="switch-card" in:fly|global={{ y: -10, duration: 600, delay: 300 }}>
			<h5>Already have an account?</h5>
			<button class="switch-button" onclick={() => (loginOrRegister = 'login')}>
				Login here
			</button>
		</div>
	{/if}
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		min-height: calc(100vh - 164px);
		gap: 1.44rem;
		padding-bottom: 1rem;
	}

	.header {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	h1 {
		margin-bottom: 0;
		background: #f0e68c;
		border: 5px solid black;
		border-radius: 5px;
		padding: 1rem;
	}

	.subtitle {
		color: #666;
		font-size: 1.1rem;
		margin-bottom: 0;
	}

	.form-card {
		max-width: 500px;
		background: white;
		border: 3px solid black;
		border-radius: 5px;
		padding: 1rem;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		transition: transform 0.3s ease, box-shadow 0.3s ease;
	}

	.form-card:hover {
		transform: translateY(-5px);
		box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	label {
		font-weight: bold;
		font-size: 1.1rem;
		color: black;
	}

	input {
		padding: 5px;
		border: 2px solid #ccc;
		border-radius: 5px;
		font-size: 1rem;
		transition: border-color 0.3s ease, box-shadow 0.3s ease;
	}

	input:focus {
		outline: none;
		border-color: #4a90e2;
		box-shadow: 0 0 0 3px rgba(173, 216, 230, 0.2);
	}

	input::placeholder {
		color: #999;
	}

	.submit-button {
		border: 5px solid #4a90e2;
		border-radius: 5px;
		cursor: pointer;
		transition: transform 0.2s ease, border-color 0.3s ease;
	}

	.submit-button:hover {
		transform: scale(1.02);
	}

	.switch-card {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.switch-button {
		background: white;
		color: black;
		border: 3px solid black;
		padding: 10px 20px;
		font-size: 1rem;
		font-weight: bold;
		border-radius: 5px;
		cursor: pointer;
		transition: transform 0.2s ease, background-color 0.3s ease;
	}

	.switch-button:hover {
		transform: scale(1.05);
		background: #4a90e2;
		border-color: #4a90e2;
	}

	/* Dark Mode Styles */
	:global(body.dark-mode) .subtitle {
		color: #e0e0e0;
	}

	:global(body.dark-mode) .form-card {
		background: #2a2a2a;
		border-color: #444;
	}

	:global(body.dark-mode) label {
		color: #e0e0e0;
	}

	:global(body.dark-mode) input {
		background: #1a1a1a;
		color: #e0e0e0;
		border-color: #444;
	}

	:global(body.dark-mode) input::placeholder {
		color: #666;
	}

	:global(body.dark-mode) input:focus {
		border-color: #4a90e2;
		box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.2);
	}

	:global(body.dark-mode) .submit-button {
		background: #e0e0e0;
		color: #121212;
		border-color: #4a90e2;
	}

	:global(body.dark-mode) .submit-button:hover {
		background: #2a2a2a;
		border-color: #f0e68c;
		color: #f0e68c;
	}

	:global(body.dark-mode) .switch-button:hover {
		background: #4a90e2;
		border-color: #4a90e2;
		color: white;
	}

	@media (max-width: 768px) {
		.container {
			max-width: 100%;
            gap: 1rem;
		}

		h1 {
			font-size: 1.44rem;
		}
	}
</style>
