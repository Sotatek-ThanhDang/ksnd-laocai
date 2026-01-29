import dayjs from 'dayjs';

const today = Object.freeze(dayjs());
const tomorrow = Object.freeze(dayjs().add(1, 'day'));

export { today, tomorrow };
