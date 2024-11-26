// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			user: import('$lib/server/auth').User;
			session: import('$lib/server/auth').SessionValidationResult['session'];
		}
	}
}

export {};
