<main class="container mt-12 mx-auto justify-center">
    <div class="text-center m-5">
        <h1 class="text-5xl font-bold text-blue-900">Hotel Dashboard</h1>
    </div>
    <div class="flex justify-center">
        <div class="bg-gray-100 rounded-md inline-flex">
                <a href="#" class="py-1.5 px-2 block text-gray-600 font-bold">Hotel Reservations</a>
                <div class="border-l-2"></div>
                <a href="#" class="py-1.5 px-2 block text-gray-600 font-bold">Resturant Reservations</a>
                <div class="border-l-2"></div>
                <a href="#" class="py-1.5 px-2 block text-gray-600 font-bold">Rooms</a>
                <div class="border-l-2"></div>
                <a href="#" class="py-1.5 px-2 block text-gray-600 font-bold">Guests</a>
        </div>
    </div>
    <!-- TABLES-->
    <div class="my-10 space-y-10">
        <!-- HotelRes -->
            <table class="table-auto rounded-lg overflow-hidden shadow-md">
                <thead>
                    <tr class="bg-gray-300 text-gray-700">
                        <th class="px-4 py-1">Start Date</th>
                        <th class="px-4 py-1">End Date</th>
                        <th class="px-4 py-1">Guest</th>
                        <th class="px-4 py-1">Package</th>
                        <th class="px-4 py-1">Room</th>
                        <th class="px-4 py-1">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-gray-100">
                        <td class="px-4 py-1">23/11/2021</td>
                        <td class="px-4 py-1">27/11/2021</td>
                        <td class="px-4 py-1">Nick</td>
                        <td class="px-4 py-1">Breakfast</td>
                        <td class="px-4 py-1">Lakefront Suite</td>
                    </tr>
                    <tr class="bg-gray-200">
                        <td class="px-4 py-1">23/11/2021</td>
                        <td class="px-4 py-1">03/12/2021</td>
                        <td class="px-4 py-1">Sick Nantos</td>
                        <td class="px-4 py-1">Holiday</td>
                        <td class="px-4 py-1">Lakefront</td>
                    </tr>
                    <!-- <tr class="bg-gray-100">
                        <td class="px-4 py-1">27/11/2021</td>
                        <td class="px-4 py-1">14/12/2021</td>
                        <td class="px-4 py-1">Rick Rantos</td>
                        <td class="px-4 py-1">N/A</td> -->
                        <td class="px-4 py-1">Suite</td>
                    </tr>
                </tbody>
            </table>
        <!-- RestRes -->
        <table class="table-auto rounded-lg overflow-hidden shadow-md">
            <thead>
                <tr class="bg-gray-300 text-gray-700">
                    <th class="px-4 py-1">Time</th>
                    <th class="px-4 py-1">Guests</th>
                    <th class="px-4 py-1">Delete</th>
                </tr>
            </thead>
        </table>
        <!-- Rooms -->
        <table class="table-auto rounded-lg overflow-hidden shadow-md">
            <thead>
                <tr class="bg-gray-300 text-gray-700">
                    <th class="px-4 py-1">Room</th>
                    <th class="px-4 py-1">Type</th>
                    <th class="px-4 py-1">Status</th>
                    <th class="px-4 py-1">Guest</th>
                    <th class="px-4 py-1">Start Date</th>
                    <th class="px-4 py-1">End Date</th>
                    <th class="px-4 py-1">Delete</th>
                </tr>
            </thead>
        </table>
        <!-- Guests -->
        <table class="table-auto rounded-lg overflow-hidden shadow-md">
            <thead>
                <tr class="bg-gray-300 text-gray-700">
                    <th class="px-4 py-1">Name</th>
                    <th class="px-4 py-1">Status</th>
                    <th class="px-4 py-1">Email</th>
                    <th class="px-4 py-1">Room</th>
                    <th class="px-4 py-1">Delete</th>
                </tr>
            </thead>
        </table>
    </div>
    <!-- TABLE END-->
</main>