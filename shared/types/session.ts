export interface UserSession {
	name: string;
	email: string;
	picture: string;
}

export interface AppSession {
	user: UserSession;
}

declare module 'h3' {
	interface H3EventContext {
		user?: UserSession;
	}
}
