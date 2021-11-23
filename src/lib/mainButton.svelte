<script lang="ts">
    export let callback: Function;
    export let text: string;
    export let width: string = null; // The width class
</script>

<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline {width}" on:click|preventDefault={() => callback()}>
    {text}
</button>