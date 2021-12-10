<script lang= "ts">
    import { goto } from '$app/navigation';
    import { auth } from '$lib/authStore';
    import { isValidObjectId } from 'mongoose';
    import MainButton from '$lib/mainButton.svelte';

    let startDate = '';
    let endDate = '';
    let dateString = '';
    let timeString = '';
    let dateTime;
    let guestNb;
    let breakfastPackage;
    let holidayPackage;

    let isValidDate;

    async function getDateTime(ds, ts) {
        const newDate = new Date(ds);
        newDate.setHours(ts.split(':')[0]);
		newDate.setMinutes(ts.split(':')[1]);
		
		dateTime = newDate.toString();
        isValidDate = Date.parse(dateTime);
    }

    $: getDateTime(dateString, timeString);

    async function create() {
        const responseR = await fetch('api/hotelRes', {
            method: 'POST',
            mode: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    startDate,
                    endDate,
                    guestNb,                    
                }
            )
        });
        const rData = await responseR.json();
        if (responseR.status == 200) {
            return goto('dashboard');
        }
    }
</script>

<!--Hotel Reservation Card-->

<main class="flex justify-around">
    <div class="relative rounded-2xl py-4 border dark:border-gray-800 mt-8 px-8 pt-6 pb-8 w-5/6 sm:w-2/3 md:w-1/2 lg:w-2/5 xl:w-1/4">
        <div class="flex justify-around">
            <h1 class="text-3xl">Hotel Reservation</h1>
        </div>
        <form>
            <div class="mb-6">
                <label for="GuestNb" class="block text-gray-700 text-sm font-bold mb-2">Number of Guest</label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" bind:value={guestNb} id="number" type="number" placeholder="0">
            </div>
            <div class="mb-6">
                <label for="Start Date" class="block text-gray-700 text-sm font-bold mb-2">Start Date</label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" bind:value={startDate} id="date" type="date">
            </div>
            <div class="mb-6">
                <label for="End Date" class="block text-gray-700 text-sm font-bold mb-2">End Date</label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" bind:value={endDate} id="date" type="date">
            </div>
            <div class="mb-6">
                <label for="Breakfast Package" class="block text-gray-700 text-sm font-bold mb-2"><input type="checkbox" id="breakfastPackage" name="breakfastPackage">Breakfast Package</label>
                
            </div>
            <div class="mb-6">
                <label for="Holiday Package" class="block text-gray-700 text-sm font-bold mb-2"><input type="checkbox" id="holidayPackage" name="holidayPackage">Holiday Package</label>
                
            </div>             
            <MainButton callback={() => create()} text ='Create Reservation' width='w-full'/>
        </form>
    </div>
</main>