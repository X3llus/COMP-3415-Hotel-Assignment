<script lang="ts">
	import { goto } from '$app/navigation';
	import { auth } from '../lib/authStore';

	import CustomInput from '$lib/customInput.svelte';
	import MainButton from '$lib/mainButton.svelte';

	let breakfast = false;
	let holiday = false;
    let discount = false;
    let description = '';
    let breakPack = 1;

	async function pack() {
		const response = await fetch('/api/package', {
			method: 'POST',
			mode: 'same-origin',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				breakfast,
                holiday,
                discount,
                description
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
			<h1 class="text-3xl">Package Form</h1><br>
		</div>
        <h3> Select from the Options Below:</h3><br>
		<form>
            <label>
                <input type=checkbox  name="breakfast" bind:checked={breakfast}>
                Breakfast Package<br>
            </label>
            <label>
                <input type=checkbox  name="holiday" bind:checked={holiday}>
                Holiday Package<br>
            </label>
            <label>
                <input type=checkbox  name="discount" bind:checked={discount}>
                Discount
            </label>
            <label>
                <textarea id="Desc" name="description" placeholder="Description" rows="4" cols="35" bind:value={description}></textarea>
            </label>
            <MainButton callback={() => pack()} text ='Create Package' width='w-full'/>
		</form>
	</div>
</div>
