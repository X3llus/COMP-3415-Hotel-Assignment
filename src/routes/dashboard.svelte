<script lang="ts">
    import { onMount } from 'svelte';
    import HotelCard from '$lib/hotelCard.svelte';
    import RestCard from '$lib/restCard.svelte';
    import { fade } from 'svelte/transition';

    let hotelRes = [];
    let restRes = [];

    onMount(async () => {
        hotelArray()
		restArray();
	});
    async function hotelArray() {
        const response = await fetch('/api/hotelRes');
        const body = await response.json();
        hotelRes = body.res || [];
        console.log('reload');
    }

    async function restArray() {
        const response = await fetch('/api/resturantRes');
        const body = await response.json();
        restRes = body.res || [];
        console.log('reload');
    }

</script>

<main class="container mt-12 mx-auto">
    <div class="text-center">
        <h1 class="text-5xl font-bold text-blue-900">
            My Reservations
        </h1>
    </div>
    <div class="bg-gray-200 rounded-3xl p-5 m-10">
        <div class="p-5">
            <div class="flex justify-between">
                <h2 class="text-3xl font-bold">Hotel Reservations</h2>
                <button class=" px-3 item text-white rounded-lg shadow bg-green-600 hover:bg-green-700 font-bold transition duration-200">
                    <a href="hotelRes" class="">+ Reservation</a>
                </button>
            </div>
            <div class="border-2 border-red-400 my-2"></div>
            <div class="grid grid-cols-5 grid-wrap p-3 gap-4">
                <!-- CARDS -->
                {#each hotelRes as hotel}
                        <HotelCard {...hotel} on:update={hotelArray} />
                    {:else}
                        <h1>No Reservations</h1>
                    {/each}
                <!-- CARDS END-->
            </div>
        </div>
        <div class="p-5">
            <div class="flex justify-between">
                <h2 class="text-3xl font-bold">Restaurant Reservations</h2>
                <button class=" px-3 item text-white rounded-lg shadow bg-green-600 hover:bg-green-700 font-bold transition duration-200">
                    <a href="resturantRes" class="">+ Reservation</a>
                </button>
            </div>
            <div class="border-2 border-red-400 my-2"></div>
            <div class="grid grid-cols-5 grid-wrap p-3 gap-4">
                <!-- CARDS -->
                    {#each restRes as res}
                        <RestCard {...res} on:update={restArray} />
                    {:else}
                        <h1>No Reservations</h1>
                    {/each}
                <!-- CARDS END-->
        </div>
    </div>  
</main>