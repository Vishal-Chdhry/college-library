export const fetcher = (url: string) => {
  fetch(url).then((res) => res.json());
};
const dev = process.env.NODE_ENV !== 'production';
export const server = dev
  ? 'http://localhost:3000'
  : 'https://college-library.vercel.app';
