// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	devtools: { enabled: true },
	modules: ['@nuxt/eslint', '@nuxt/ui'],
	css: ['~/assets/css/main.css'],
	runtimeConfig: {
		DB_URL: process.env.DB_URL,
		DB_NAME: process.env.DB_NAME,
	},
});
