<script lang="ts">

    export let _id;
    export let date;
    export let guestNb;
    
    $: dateForm = new Date(date);
    $: dateString = dateForm.toLocaleString();

    async function resDel() {
    const responseR = await fetch('api/resturantRes', {
        method: 'DELETE',
        mode: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                date: date,
                guestNb
            }
        )
    });
    }

</script>

<div class="card bg-white rounded-lg shadow-md p-2">
    <span class="text-lg font-bold">{dateString}</span>
    <div class="border border-red-400 "></div>
    <div class="px-2 py-1">
        <div>
            <span class="text-md font-bold">Guests: </span><span class="text-base font-normal">{guestNb}</span>
        </div>
        <div class="text-center mt-3">
            <button class="py-1 px-5 item text-white rounded-lg shadow bg-red-600 hover:bg-red-700 font-bold transition duration-200" on:click={resDel}>
                Cancel
            </button>
        </div>
    </div>
</div>