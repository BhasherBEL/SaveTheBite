<script lang="ts">
	// Create an array of FAQ categories containing a header and its related FAQs
	let faqSections = [
		{
			header: "General Questions",
			faqs: [
				{
					question: "What is SaveTheBite, and how does it work?",
					answer:
						"SaveTheBite connects consumers with local businesses offering surplus food at discounted prices. Users can browse, filter, and reserve food baskets to pick up later.",
					open: false
				},
				{
					question: "Why is SaveTheBite important?",
					answer:
						"SaveTheBite helps reduce food waste, supports local businesses, and promotes sustainability by aligning with the United Nations Sustainable Development Goals like \n " +
							"e.g. Goal 2: Zero Hunger — Reducing food waste and improving food availability. \n" +
							"Goal 12: Responsible Consumption and Production — Promoting sustainable resource use and reducing waste. \n" +
							"Goal 13: Climate Action — Cutting down food waste reduces greenhouse gas emissions.",
					open: false
				}
			]
		},
		{
			header: "Account and Access",
			faqs: [
				{
					question: "Do I need an account to use SaveTheBite?",
					answer:
						"You can browse without an account. However, creating an account allows you to buy the baskets, personalize your experience and save preferences.",
					open: false
				},
				{
					question: "Can I use SaveTheBite without a smartphone?",
					answer:
						"Yes, SaveTheBite is available on both mobile devices and web browsers, making it accessible to everyone.",
					open: false
				}
			]
		},
		{
			header: "Browsing and Searching",
			faqs: [
				{
					question: "How do I find surplus food near me?",
					answer:
						"Enter your location into the search bar or enable location services to discover food baskets in your area. Use filters for dietary preferences.",
					open: false
				},
				{
					question: "What dietary preferences can I filter by?",
					answer:
						"SaveTheBite allows you to filter by dietary preferences such as vegetarian, vegan, fish, gluten-free, egg-free, and non-dairy options.",
					open: false
				}
			]
		},
		{
			header: "Reservations and Pickup",
			faqs: [
				{
					question: "How can I get directions to a market?",
					answer:
						"Click on the location button in the search bar to show the map. You can then click on individual markets to get directions.",
					open: false
				},
				{
					question: "Can I see what’s in a food basket before reserving?",
					answer:
						"Yes, detailed descriptions, including contents and allergen information, should be provided for each basket by the company selling them.",
					open: false
				},
				{
					question: "How do I reserve a food basket?",
					answer:
						"Click on a basket to view details and put it into your cart.",
					open: false
				},
				{
					question: "Can I cancel my reservation?",
					answer:
						"Yes, reservations can be cancelled, but keep in mind to not cancel with short notice so that the company has the possibility to sell the basket to another customer.",
					open: false
				},
				{
					question: "Where do I pick up my reserved food?",
					answer:
						"Pickup locations and times are provided in the basket details and reservation confirmation.",
					open: false
				}
			]
		},
		{
			header: "For Vendors",
			faqs: [
				{
					question: "How can my business join SaveTheBite?",
					answer:
						"Create an account, then register your business from the \"Account\" page. Add details like location, description, and finally add food baskets.",
					open: false
				},
				{
					question: "What types of food can vendors list?",
					answer:
						"Vendors can list surplus prepared meals, bakery items, fresh produce, and other food that aligns with health and safety standards.",
					open: false
				},
				{
					question: "Can farmers use SaveTheBite to sell surplus produce?",
					answer:
						"Yes, farmers are encouraged to join to reduce food waste and make extra profits on surplus goods.",
					open: false
				}
			]
		},
		{
			header: "Sustainability and Security",
			faqs: [
				{
					question: "How does SaveTheBite reduce food waste?",
					answer:
						"SaveTheBite redistributes surplus food that would otherwise be discarded, helping to reduce greenhouse gas emissions.",
					open: false
				},
				{
					question: "Is my data secure with SaveTheBite?",
					answer:
						"Yes, we use industry-standard security practices, including hashed passwords and secure databases, to protect user data.",
					open: false
				}
			]
		},
		{
			header: "Customization and Features",
			faqs: [
				{
					question: "How can I customize my preferences?",
					answer:
						"Log in to your account and update your preferences for dietary needs, location, and favorite vendors.",
					open: false
				},
				{
					question: "How can I save favorite baskets or vendors?",
					answer:
						"Click the \"Favorite\" button on a basket or vendor to save it for easy access later.",
					open: false
				}
			]
		}
	];

	// Toggle function to expand/collapse FAQ answers
	function toggleFAQ(sectionIndex: number, faqIndex: number) {
		faqSections = faqSections.map((section, sIndex) => {
			if (sIndex === sectionIndex) {
				section.faqs = section.faqs.map((faq, fIndex) => {
					if (fIndex === faqIndex) faq.open = !faq.open;
					return faq;
				});
			}
			return section;
		});
	}
</script>

<svelte:head>
	<title>FAQ - SaveTheBite</title>
	<meta name="description" content="Frequently Asked Questions about SaveTheBite." />
</svelte:head>

<section class="p-8 max-w-4xl mx-auto">
	<h1 class="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h1> <!-- Adjusted margin-bottom -->

	<!-- FAQ sections -->
	<div class="space-y-8">
		{#each faqSections as section, sectionIndex}
			<div>
				<h2 class="text-2xl font-bold mb-4">{section.header}</h2>
				<div class="space-y-4">
					{#each section.faqs as faq, faqIndex}
						<div class="border border-gray-300 rounded-md shadow-sm">
							<div
								class="p-4 bg-gray-100 cursor-pointer flex justify-between items-center"
								on:click={() => toggleFAQ(sectionIndex, faqIndex)}
							>
								<h3 class="text-lg font-semibold">{faq.question}</h3>
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
