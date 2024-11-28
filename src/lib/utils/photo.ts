export default async function convertPhoto(photo: File) {
	const toBase64 = (file: File) =>
		new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = reject;
		});

	async function convertFileToBase64(photo: File): Promise<string> {
		const base64String = await toBase64(photo);
		return base64String;
	}

	return convertFileToBase64(photo);
}
