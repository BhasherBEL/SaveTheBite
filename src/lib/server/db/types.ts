import { customType } from 'drizzle-orm/sqlite-core';

function bufferToBase64(buffer: Blob): string {}

function base64ToBuffer(base64: string): Blob {}

export const sqliteCustomImage = customType<{ data: Blob; driverData: string }>({
	dataType() {
		return 'text';
	},
	fromDriver(data: string): Blob {
		return base64ToBuffer(data);
	},
	toDriver(data: Blob): string {
		return bufferToBase64(data);
	}
});
