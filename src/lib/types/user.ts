export default class User {
	id: number;
	username: string;
	email: string;
	password: string;
	type: string;
	language: string | null;
	theme: string | null;
	defaultLocation: string | null;

	constructor(
		id: number,
		username: string,
		email: string,
		password: string,
		type: string,
		language: string | null,
		theme: string | null,
		defaultLocation: string | null
	) {
		this.id = id;
		this.username = username;
		this.email = email;
		this.password = password;
		this.type = type;
		this.language = language;
		this.theme = theme;
		this.defaultLocation = defaultLocation;
	}
}
