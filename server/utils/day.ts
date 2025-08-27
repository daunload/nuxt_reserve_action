import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';

dayjs.extend(utc);

export const isValidUTCISO = (date: string) => {
	return dayjs.utc(date, 'YYYY-MM-DDTHH:mm:ss[Z]', true).isValid();
};

export const toLocalISOString = (date: Date) => {
	const pad = (n: number) => n.toString().padStart(2, '0');
	return (
		date.getFullYear() +
		'-' +
		pad(date.getMonth() + 1) +
		'-' +
		pad(date.getDate()) +
		'T' +
		pad(date.getHours()) +
		':' +
		pad(date.getMinutes()) +
		':' +
		pad(date.getSeconds())
	);
};
