<script lang="ts">
	import '../tailwind.css';
	import { auth } from '$lib/authStore';
	import { clickOutside } from '../lib/clickOutside.js';
	import { onMount } from 'svelte';

	const inputList = {
        BUTTON: 'button',
        OUTSIDE: 'outside',
        FRESH: 'fresh'
    };
	let showList = false;
	let lastInput = inputList.FRESH;

	function handleClickOutside(_: any) {
			if (lastInput == inputList.BUTTON && showList) {
				showList = false;
				lastInput = inputList.OUTSIDE;
				setTimeout(() => (lastInput = inputList.FRESH), 10);
			}
		}

	async function signOut() {
		await fetch('/api/user/signout', {
            method: 'POST',
            mode: 'same-origin',
            credentials: 'include'
        });
		auth.signOut();
		showList = false;
		lastInput = inputList.OUTSIDE;
		setTimeout(() => (lastInput = inputList.FRESH), 10);
	}

	onMount(async () => {
		const response = await fetch('/api/user/token');
		const body = await response.json();
		auth.setTo(body);
	});
</script>

<nav class="bg-gray-100 shadow-lg border-b-2 border-red-400">
	<div class="mx-10">
		<div class="flex justify-between">
			<div>
				<a href="/" class="flex items-center py-4 px-2">
					<span class="font-bold text-black text-xl">Lake Simcoe Resort</span>
				</a>
			</div>

			{#if $auth}
				<div class="flex items-center space-x-1">
					<button class="inline-flex py-4 px-2 font-mono text-gray-600 hover:text-gray-900 uppercase" on:click={() => {
						if (lastInput == inputList.FRESH) {
							showList = true;
						} else if (lastInput == inputList.OUTSIDE && showList == false) {
							lastInput = inputList.BUTTON;
						} else {
							showList = true;
						}
						lastInput = inputList.BUTTON;
					}}>{$auth.email}
						<svg class="-mr-1 ml-1 h-7 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
							<path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
						</svg>
					</button>
				</div>
			{:else}
				<div class="flex items-center space-x-4">
					<a href="login" class="py-1.5 px-2 text-black hover:text-gray-600 hover:drop-shadow-lg hover:filter transition duration-200 font-semibold">Sign In</a>
					<a href="register" class="py-1.5 px-2 text-black hover:text-gray-600 hover:drop-shadow-lg hover:filter transition duration-200 font-semibold">Register</a>
				</div>
			{/if}
				
		</div>
		<div class:hidden={!showList}
			use:clickOutside
			on:click_outside={handleClickOutside} class="hidden origin-top-right absolute right-12 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
			<ul class="py-1">
				<li class="active">
					<a	href="profile"class="block text-gray-700 px-4 py-2 text-sm">Profile</a>
				</li>
				<li>
					<a href="dashboard" class="block text-gray-700 px-4 py-2 text-sm">Dashboard</a>
				</li>
				<li>
					<button on:click={() => signOut()} class="block text-gray-700 px-4 py-2 text-sm">Logout</button>
				</li>
			</ul>
		</div>
	</div>
	
</nav>
<slot />
