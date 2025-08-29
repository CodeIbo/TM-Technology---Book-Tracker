export const clip = (s: string = '', max = 15) => (s.length > max ? s.slice(0, max - 1) + '…' : s);
