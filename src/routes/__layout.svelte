<script>
	import '../tailwind.css';
</script>

<nav class="bg-gray-100 shadow-lg border-b-2 border-red-400">
	<div class="mx-10">
		<div class="flex justify-between">
			<div>
				<a href="/" class="flex items-center py-4 px-2">
					<span class="font-semibold text-black text-lg">Lake Simcoe Resort</span>
				</a>
			</div>

			<div class="flex items-center space-x-1">
				<button
					class="py-2 px-2 rounded-lg text-black font-semibold hover:ring-2 hover:ring-blue-500 hover:bg-gray-200 transition duration-200"
				>
					<a href="/" class="">Register</a>
				</button>
				<button
					class="py-2 px-2 rounded-lg text-black font-semibold hover:ring-2 hover:ring-blue-500 hover:bg-gray-200 transition duration-200"
				>
					<a href="/" class="">Sign in</a>
				</button>
			</div>
		</div>
	</div>
</nav>
<slot />
