<script lang="ts">
	// Create an array of FAQ objects containing question and answer pairs
	let faqs = [
		{
			question: "What is SaveTheBite?",
			answer:
				"SaveTheBite is a platform that connects users with food markets offering sustainable and affordable food options in various cities and regions.",
			open: false
		},
		{
			question: "How do I search for markets?",
			answer:
				"You can search for markets by entering a city, region, or address into the search bar. You can also filter markets based on specific dietary preferences, such as vegan or gluten-free.",
			open: false
		},
		{
			question: "What dietary preferences can I filter by?",
			answer:
				"SaveTheBite allows you to filter by dietary preferences such as vegetarian, vegan, fish, gluten-free, egg-free, and non-dairy options.",
			open: false
		},
		{
			question: "How can I get directions to a market?",
			answer:
				"Click on the location button in the search bar to show the map. You can then click on individual markets to get directions.",
			open: false
		},
		{
			question: "How do I create an account?",
			answer:
				"Currently, you can browse without an account. In the future, you will be able to sign up to receive notifications and personalized offers.",
			open: false
		}
	];

	// Toggle function to expand/collapse FAQ answers
	function toggleFAQ(index: number) {
		faqs = faqs.map((faq, i) => {
			if (i === index) faq.open = !faq.open; // Toggle the clicked FAQ
			return faq;
		});
	}
</script>

<svelte:head>
	<title>FAQ - SaveTheBite</title>
	<meta name="description" content="Frequently Asked Questions about SaveTheBite." />
</svelte:head>

<section class="p-8 max-w-4xl mx-auto">
	<h1 class="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h1> <!-- Adjusted margin-bottom -->

	<!-- FAQ list -->
	<div class="space-y-4">
		{#each faqs as faq, index}
			<div class="border border-gray-300 rounded-md shadow-sm">
				<div class="p-4 bg-gray-100 cursor-pointer flex justify-between items-center" on:click={() => toggleFAQ(index)}>
					<h2 class="text-lg font-semibold">{faq.question}</h2>
					<!-- Icon to show expand/collapse -->
					<span class="text-gray-600">{faq.open ? '−' : '+'}</span>
				</div>
				{#if faq.open}
					<div class="p-4 bg-white border-t border-gray-200">
						<p class="text-gray-700">{faq.answer}</p>
					</div>
				{/if}
			</div>
		{/each}
	</div>
</section>

<style>
	/* Smooth accordion animation */
	section div {
		transition: max-height 0.3s ease;
		overflow: hidden;
	}

	/* Additional spacing for the FAQ header and items */
	h1 {
		margin-bottom: 2rem; /* Add more space below the header */
	}

	/* Space between FAQ items */
	.border {
		margin-top: 1rem; /* Space between each FAQ item */
	}
</style>
