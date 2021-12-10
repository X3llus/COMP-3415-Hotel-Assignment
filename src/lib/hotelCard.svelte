<script lang="ts">
import { fade } from "svelte/transition";


	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let _id;
	export let startDate;
    export let endDate;
	export let guestNb;

	$: startDateForm = new Date(startDate);
	$: endDateForm = new Date(endDate);
	$: startDateString= startDateForm.toDateString();
    $: endDateString = endDateForm.toDateString();

	async function resDel() {
		const responseR = await fetch('api/hotelRes', {
			method: 'DELETE',
			mode: 'same-origin',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				startDate,
                endDate,
				guestNb
			})
		});
		dispatch('hotelUpdate');
		console.log('delete');
	}
</script>

<div transition:fade|local class="card bg-white rounded-lg shadow-md p-2">
	<span class="text-lg font-bold">{startDateString} -</span>
    <br>
	<span class="text-lg font-bold">{endDateString}</span>
	<div class="border border-red-400 " />
	<div class="px-2 py-1">
		<div>
			<span class="text-md font-bold">Guests: </span><span class="text-base font-normal"
				>{guestNb}</span
			>
		</div>
		<div class="text-center mt-3">
			<button
				class="py-1 px-5 item text-white rounded-lg shadow bg-red-600 hover:bg-red-700 font-bold transition duration-200"
				on:click={resDel}
			>
				Cancel
			</button>
		</div>
	</div>
</div>
