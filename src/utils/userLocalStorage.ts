export enum CONSTANTS {
  TOKEN = 'TOKEN',
}

export function setLocalStorage(title: string, value: string) {
  localStorage.setItem(title, value);
}

export function getLocalItem(title: string): string | null {
  return localStorage.getItem(title);
}
