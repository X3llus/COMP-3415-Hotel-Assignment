<script lang="ts">
    import { onMount } from 'svelte'

    let rooms = [];
    let packages = [];

    onMount(async () =>{
        roomsArray();
        packageArray();
    });

    async function roomsArray() {
        const response = await fetch('/api/manager/room');
        const body = await response.json();
        rooms = body.room || [];
        console.log('reload');
    }

    async function packageArray() {
        const response = await fetch('/api/package');
        const body = await response.json();
        packages = body.res || [];
        console.log('reload');
    }

    async function pacDel(pac) {
		const responseR = await fetch('/api/package', {
			method: 'DELETE',
			mode: 'same-origin',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				breakfast: pac.breakfast,
                holiday: pac.holiday,
                discount: pac.discount,
                description: pac.description,
			})
		});
        packageArray();
		console.log('delete');
	}

    async function roomDel(room) {
		const responseR = await fetch('/api/manager/room', {
			method: 'DELETE',
			mode: 'same-origin',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				suite: room.suite,
                lakeview: room.lakeview,
                bedQnty: room.bedQnty,
                bedType: room.bedType,
                description: room.description
			})
		});
        roomsArray();
		console.log('delete');
	}
</script>


<main class="container mt-12 mx-auto justify-center">
    <div class="text-center m-5">
        <h1 class="text-5xl font-bold text-blue-900">Hotel Dashboard</h1>
    </div>
    <div class="flex justify-center space-x-5">
            <button class="py-1 px-3 item text-white rounded-lg shadow bg-green-600 hover:bg-green-700 font-bold transition duration-200">
                <a href="/packageForm" class="">+ Package</a>
            </button>
            <button class="py-1 px-3 item text-white rounded-lg shadow bg-blue-600 hover:bg-blue-700 font-bold transition duration-200">
                <a href="createRoom" class="">+ Room</a>
            </button>
    </div>
    <!-- TABLES-->
    <div class="my-10 space-y-10 mx-auto">
        <!-- Packages -->
        <div class="flex justify-center">
            <table class="table-auto rounded-lg overflow-hidden shadow-md">
                <thead>
                    <tr class="bg-gray-300 text-gray-700">
                        <th class="px-4 py-1">Type</th>
                        <th class="px-4 py-1">Description</th>
                        <th class="px-4 py-1">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {#each packages as pac , i}
                        <tr class="{ (i%2 == 0) ? "bg-gray-100" : "bg-gray-200" }">
                            <td class="px-4 py-1">
                                {#if pac.breakfast}
                                    Breakfast
                                {:else if pac.discout}
                                    Discount
                                {:else if pac.holiday}
                                    Holiday
                                {:else}
                                    N/A
                                {/if}
                            </td>
                            <td class="px-4 py-1">{pac.description}</td>
                            <td class="px-4 py-1">
                                <button
                                class="py-1 px-5 item text-white rounded-lg shadow bg-red-600 hover:bg-red-700 font-bold transition duration-200"
                                on:click={() => pacDel(pac)}
                            >
                                Delete
                            </button></td>
                        </tr>
                    {:else}
                        <td class="px-4 py-1">N/A</td>
                        <td class="px-4 py-1">N/A</td>
                        <td class="px-4 py-1">N/A</td>
                        <td class="px-4 py-1">N/A</td>
                    {/each}
                </tbody>
            </table>
        </div>
        <!-- Rooms -->
        <div class="flex justify-center">
            <table class="table-auto rounded-lg overflow-hidden shadow-md">
                <thead>
                    <tr class="bg-gray-300 text-gray-700">
                        <th class="px-4 py-1">Room Type</th>
                        <th class="px-4 py-1">Lakeview</th>
                        <th class="px-4 py-1">Bed Type</th>
                        <th class="px-4 py-1">Beds</th>
                        <th class="px-4 py-1">Description</th>
                        <th class="px-4 py-1">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {#each rooms as room, i}
                        <tr class="{ (i%2 == 0) ? "bg-gray-100" : "bg-gray-200" }">
                            <td class="px-4 py-1">
                                {#if room.type}
                                    Suite
                                {:else}
                                    Base
                                {/if}
                            </td>
                            <td class="px-4 py-1">
                                {#if room.lakeview}
                                    Yes
                                {:else}
                                    No
                                {/if}
                            </td>
                            <td class="px-4 py-1">{room.bedQnty}</td>
                            <td class="px-4 py-1">{room.bedType}</td>
                            <td class="px-4 py-1">{room.description}</td>
                            <td class="px-4 py-1">
                                <button
                                class="py-1 px-5 item text-white rounded-lg shadow bg-red-600 hover:bg-red-700 font-bold transition duration-200"
                                on:click={() =>roomDel(room)}
                            >
                                Delete
                            </button></td>

                        </tr>
                    {:else}
                        <td class="px-4 py-1">N/A</td>
                        <td class="px-4 py-1">N/A</td>
                        <td class="px-4 py-1">N/A</td>
                        <td class="px-4 py-1">N/A</td>
                        <td class="px-4 py-1">N/A</td>
                        <td class="px-4 py-1">N/A</td>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
    <!-- TABLE END-->
</main>