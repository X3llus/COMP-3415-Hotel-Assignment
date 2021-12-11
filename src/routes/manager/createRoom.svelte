<script lang= "ts">
    import { goto } from '$app/navigation';
    import { isValidObjectId } from 'mongoose';
    import MainButton from '$lib/mainButton.svelte';

    let suite;
    let lakeview;
    let bedQnty;
    let bedType = '';
    let description;

    let beds = ['Single', 'Twin', 'Double', 'Queen', 'King'];

    async function create() {
        const responseR = await fetch('/api/manager/room', {
            method: 'POST',
            mode: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    suite,
                    lakeview,
                    bedQnty,
                    bedType,
                    description                    
                }
            )
        });
        const rData = await responseR.json();
        if (responseR.status == 200) {
            return goto('dashboard');
        }
    }
</script>

<!-- Room Card-->

<main class="flex justify-around">
    <div class="relative rounded-2xl py-4 border dark:border-gray-800 mt-8 px-8 pt-6 pb-8 w-5/6 sm:w-2/3 md:w-1/2 lg:w-2/5 xl:w-1/4">
        <div class="flex justify-around">
            <h1 class="text-3xl">Create New Room</h1>
        </div>
        <form>
            <div class="mb-6">
                <label for="Suite" class="block text-gray-700 text-sm font-bold mb-2"><input type="checkbox" id="suite" name="suite" bind:checked={suite}> Suite</label>
                <!-- <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" bind:value={suite} id="suite" type="suite"> -->
            </div>
            <div class="mb-6">
                <label for="Lakeview" class="block text-gray-700 text-sm font-bold mb-2"><input type="checkbox" id="lakeview" name="lakeview" bind:checked={lakeview}> Lakeview</label>
                <!-- <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" bind:value={lakeview} id="lakeview" type="lakeview"> -->
            </div>
            <div class="mb-6">
                <label for="Number of Beds" class="block text-gray-700 text-sm font-bold mb-2">Number of Beds</label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" bind:value={bedQnty} id="number" type="number" placeholder="0">
            </div>
            <div class="mb-6">
                <label for="Bed" class="block text-gray-700 text-sm font-bold mb-2">Bed Size</label>
                <select class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" bind:value={bedType} id="bedType" type="bedType" name="bedType">
                    {#each beds as bedType}
                        <option value={bedType}>{bedType}</option>
                    {/each}
                </select>
            </div>
            <div class="mb-6">
                <label for="Description" class="block text-gray-700 text-sm font-bold mb-2">Description</label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" bind:value={description} id="description" type="description">
            </div>          
            <MainButton callback={() => create()} text ='Create Reservation' width='w-full'/>
        </form>
    </div>
</main>