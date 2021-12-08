<script lang="ts">
	import { goto } from '$app/navigation';
	import { auth } from '../lib/authStore';

	import CustomInput from '$lib/customInput.svelte';
	import MainButton from '$lib/mainButton.svelte';

	let email = '';
	let password = '';

	async function signin() {
		const response = await fetch('/api/user/login', {
			method: 'POST',
			mode: 'same-origin',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email,
				password
			})
		});

		const rData = await response.json();
        console.log(rData);
        

		if (response.status == 200) {
			auth.setTo(rData);
			goto('/');
		}
	}
</script>

<div class="flex justify-around">
	<div
		class="relative rounded-2xl py-4 border dark:border-gray-800 mt-8 px-8 pt-6 pb-8 sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4"
	>
		<div class="flex justify-around">
			<h1 class="text-3xl">Sign In</h1>
		</div>
		<form>
			<CustomInput bind:value={email} placeholder="name@email.com" name="Email" />
			<div class="mb-6">
				<label class="block text-gray-700 text-sm font-bold mb-2" for="password"> Password </label>
				<input
					class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					bind:value={password}
					id="password"
					type="password"
					placeholder="**************"
				/>
			</div>
			<MainButton callback={() => signin()} text="Sign In" width="w-full" />
		</form>
	</div>
</div>
