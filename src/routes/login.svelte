<script lang="ts">
    import CustomInput from '$lib/customInput.svelte';
    import MainButton from '$lib/mainButton.svelte';

    let email = '';
    let password = '';

    async function signin() {
        // send credentials to /api/user/login
        // 200 on success, go to /
        // on fail, give error message to user
    }

    async function register() {
        // go to register page?
    }
</script>

<div class="flex justify-around">
    <div class="relative rounded-2xl py-4 border dark:border-gray-800 my-16 px-8 pt-6 pb-8 sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4">
        <div class="flex justify-around">
            <h1 class="text-3xl">Sign In</h1>
        </div>
        <form>
            <CustomInput bind:value={email} placeholder="name@email.com" name="Email" />
            <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                Password
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="**************">
            </div>
            <!-- <div class="grid gap-y-5 grid-cols-1"> -->
                <MainButton callback={() => console.log('test')} text='Sign In' width='w-full' />
                <!-- <MainButton callback={() => console.log('test')} text='Register' width='w-full' /> -->
            <!-- </div> -->
        </form>
    </div>
</div>
