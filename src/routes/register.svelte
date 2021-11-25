<script lang="ts">
import { goto } from '$app/navigation';
import { auth } from '$lib/authStore';

    import CustomInput from '$lib/customInput.svelte';
    import MainButton from '$lib/mainButton.svelte';
    import type { Address } from '$models/Guest';

    let email = '';
    let fName = '';
    let title = '';
    let lName = '';
    let number = '';
    let address: Address = {
        street: '',
        city: '',
        postal: '',
        province: '',
        country: ''
    };
    let password = '';
    let passwordConf = '';

    async function register() {
        const response = await fetch('/api/user/register', {
            method: 'POST',
            mode: 'same-origin',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    email,
                    fName,
                    title,
                    lName,
                    number,
                    address,
                    password,
                    passwordConf
                }
            )
        });

        const rData = await response.json();

        if (response.status == 200) {
            auth.setTo(rData);
            return goto('/');
        }

    }
</script>

<div class="flex justify-around">
    <div class="relative rounded-2xl py-4 border dark:border-gray-800 mt-8 px-8 pt-6 pb-8 w-5/6 sm:w-2/3 md:w-1/2 lg:w-2/5 xl:w-1/4">
        <div class="flex justify-around">
            <h1 class="text-3xl">Register</h1>
        </div>
        <form>
            <CustomInput bind:value={email} placeholder="name@email.com" name="Email" />
            <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                Password
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" bind:value={password} id="password" type="password" placeholder="**************">
            </div>
            <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="passwordConf">
                Confirm Password
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" bind:value={passwordConf} id="passwordConf" type="password" placeholder="**************">
            </div>
            <CustomInput bind:value={fName} placeholder="John" name="First Name" />
            <div class="grid grid-cols-3 gap-2">
                <CustomInput bind:value={title} placeholder="Mr/Ms/Mx" name="Title" />
                <div class="col-span-2">
                    <CustomInput bind:value={lName} placeholder="Doe" name="Last Name" />
                </div>
            </div>
            <CustomInput bind:value={number} placeholder="999-999-9999" name="Phone Number" />
            <div class="grid md:grid-cols-3 gap-2">
                <div class="md:col-span-2">
                    <CustomInput bind:value={address.street} placeholder="500 University Ave" name="Street" />
                </div>
                <CustomInput bind:value={address.city} placeholder="Orillia" name="City" />
            </div>
            <div class="grid md:grid-cols-3 gap-2">
                <CustomInput bind:value={address.province} placeholder="Ontario" name="Province" />
                <CustomInput bind:value={address.country} placeholder="Canada" name="Country" />
                <CustomInput bind:value={address.postal} placeholder="L3V 6H2" name="Postal Code" />
            </div>
            <MainButton callback={() => register()} text='Register' width='w-full' />
        </form>
    </div>
</div>
