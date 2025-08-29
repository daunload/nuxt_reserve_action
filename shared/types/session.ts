import { type User } from '../../server/models/user.model';

export interface UserSession extends User {
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
