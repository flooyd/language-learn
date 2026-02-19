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
		gap: var(--space-xl);
		padding-bottom: var(--space-md);
		padding-top: var(--space-xl);
	}

	.header {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}

	h1 {
		margin-bottom: 0;
		background: var(--header-bg);
		border: none;
		border-left: 4px solid var(--header-border);
		border-radius: var(--radius-lg);
		padding: var(--space-lg) var(--space-xl);
		box-shadow: var(--shadow-sm);
	}

	.subtitle {
		color: var(--text-secondary);
		font-size: var(--text-md);
		margin-bottom: 0;
		font-weight: 300;
	}

	.form-card {
		max-width: 500px;
		background: var(--card-bg);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-xl);
		padding: var(--space-2xl);
		box-shadow: var(--shadow-md);
		transition: all var(--transition-base);
	}

	.form-card:hover {
		box-shadow: var(--shadow-lg);
	}

	form {
		display: flex;
		flex-direction: column;
		gap: var(--space-lg);
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}

	label {
		font-weight: 700;
		font-size: var(--text-md);
		color: var(--text-primary);
	}

	input {
		padding: var(--space-sm) var(--space-md);
		border: 1.5px solid var(--input-border);
		border-radius: var(--radius-md);
		font-size: var(--text-base);
		transition: all var(--transition-base);
		background: var(--input-bg);
		color: var(--text-primary);
	}

	input:focus {
		outline: none;
		border-color: var(--accent-blue);
		box-shadow: 0 0 0 3px var(--accent-blue-subtle);
	}

	input::placeholder {
		color: var(--text-tertiary);
	}

	.submit-button {
		background: var(--accent-green);
		color: var(--accent-green-text);
		border: 1.5px solid var(--accent-green);
		border-radius: var(--radius-lg);
		padding: var(--space-md);
		font-weight: 700;
		cursor: pointer;
		transition: all var(--transition-base);
		box-shadow: var(--shadow-sm);
	}

	.submit-button:hover {
		background: var(--accent-green-hover);
		border-color: var(--accent-green-hover);
		transform: translateY(-2px);
		box-shadow: var(--shadow-md);
	}

	.switch-card {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
	}

	.switch-button {
		background: var(--card-bg);
		color: var(--text-primary);
		border: 1.5px solid var(--border-color-strong);
		padding: var(--space-sm) var(--space-lg);
		font-size: var(--text-base);
		font-weight: 600;
		border-radius: var(--radius-md);
		cursor: pointer;
		transition: all var(--transition-base);
	}

	.switch-button:hover {
		border-color: var(--accent-blue);
		background: var(--accent-blue-subtle);
		transform: translateY(-2px);
		box-shadow: var(--shadow-sm);
	}

	@media (max-width: 768px) {
		.container {
			max-width: 100%;
			gap: var(--space-md);
		}
	}
</style>
