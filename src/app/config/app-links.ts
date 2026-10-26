// Aquí va la URL de la app cuando esté publicada
export const APP_URL:string = '';

const APP_ROUTES: Record<string, string> = {
  login: '/login',
  register: '/registro',
  terms: '/terminos',
  privacy: '/privacidad',
};

export function appLink(nombre: string): string {
  if (!APP_URL) return '#';
  return APP_URL.replace(/\/$/, '') + APP_ROUTES[nombre];
}
