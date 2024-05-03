export const add = (a: number, b: number): number => {
  return Math.round((a + b) * 100) / 100;
};

export const subtract = (a: number, b: number): number => {
  return Math.round((a - b) * 100) / 100;
};
