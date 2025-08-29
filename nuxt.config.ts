// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	devtools: { enabled: true },
	modules: ['@nuxt/eslint', '@nuxt/ui', '@vueuse/nuxt', 'shadcn-nuxt'],
	css: ['~/assets/css/main.css'],
	runtimeConfig: {
		DB_URL: process.env.DB_URL,
		DB_NAME: process.env.DB_NAME,
		GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
		GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
		SESSION_PASSWORD: process.env.SESSION_PASSWORD,
	},
	shadcn: {
		/**
		 * Prefix for all the imported component
		 */
		prefix: '',
		/**
		 * Directory that the component lives in.
		 * @default "./components/ui"
		 */
		componentDir: './components/ui',
	},
});
