<script lang="ts">
    export let placeholder: string;
    export let name: string;
    export let value: string;

</script>

<div class="mb-6">
    <label class="block text-gray-700 text-sm font-bold mb-2" for={name}>
    {name}
    </label>
    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id={name} type="text" bind:value={value} placeholder={placeholder}>
</div>