<script lang="ts">
	import { type Vendor } from '$lib/server/db/schema';
	import { updateCompany } from '$lib/utils/company';
    import convertPhoto from '$lib/utils/photo';

	let { vendor = $bindable(), onClose, onCancel }: { vendor: Vendor, onClose: (vendor: Vendor) => {}, onCancel: () => {} } = $props();

    async function editVendorHandler() {
        if (!vendor.name || !vendor.description || !vendor.id || !vendor.picture || !vendor.location) {
            return console.error('Please fill in all fields');
        }

        const photo = document.getElementById('vendorPhoto') as HTMLInputElement;
        if (photo?.files[0]) {
            vendor.picture = await convertPhoto(photo.files[0]);
        }
        
        try {
            await updateCompany(vendor);
            onClose(vendor);
        } catch (error) {
            console.error(error);                
        }
    }
</script>

<!-- Pop-up for editing Vendor -->
<div class="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center">
	<div class="bg-white p-8 rounded-lg w-96">
		<h3 class="text-xl font-semibold mb-4">Edit the company</h3>
		<div class="mb-4">
			<label for="vendorName" class="block text-sm font-medium text-gray-700 mb-2"
				>Company Name</label
			>
			<input
				type="text"
				id="vendorName"
				bind:value={vendor.name}
				class="w-full p-2 border rounded"
				placeholder="Enter vendor name"
			/>
		</div>
		<div class="mb-4">
			<label for="vendorDescription" class="block text-sm font-medium text-gray-700 mb-2"
				>Company Description</label
			>
			<input
				type="text"
				id="vendorDescription"
				bind:value={vendor.description}
				class="w-full p-2 border rounded"
				placeholder="Enter vendor description"
			/>
		</div>
        <div class="mb-4">
            <label for="vendorLocation" class="block text-sm font-medium text-gray-700 mb-2"
                >Company Location</label
            >
            <input
                type="text"
                id="vendorLocation"
                bind:value={vendor.location}
                class="w-full p-2 border rounded"
                placeholder="Enter vendor location"
            />
        </div>
		<div class="mb-4">
			<label for="vendorPhoto" class="block text-sm font-medium text-gray-700 mb-2"
				>Company Photo (Optional)</label
			>
			<input
				type="file"
				id="vendorPhoto"
				accept="image/*"
				class="w-full p-2 border rounded text-gray-500 cursor-not-allowed"
				placeholder="Click to upload a photo"
			/>
		</div>
		<div class="flex justify-between">
			<button
				class="bg-gray-500 text-white px-4 py-2 rounded-md"
				onclick={onCancel}>Cancel</button
			>
			<button class="bg-green-500 text-white px-4 py-2 rounded-md" onclick={editVendorHandler}
				>Confirm</button
			>
		</div>
	</div>
</div>
