<script>

export let _id;
export let dateTime;
let dateString = dateTime.toLocaleString();
export let guestNb;


</script>

<div class="card bg-white rounded-lg shadow-md p-2">
    <span class="text-lg font-bold">{dateString}</span>
    <div class="border border-red-400 "></div>
    <div class="px-2 py-1">
        <div>
            <span class="text-md font-bold">Guests: </span><span class="text-base font-normal">{guestNb}</span>
        </div>
        <div class="text-center mt-3">
            <button class="py-1 px-5 item text-white rounded-lg shadow bg-red-600 hover:bg-red-700 font-bold transition duration-200">
                <a href="#" class="">Cancel</a>
            </button>
        </div>
    </div>
</div>