// Aquí va la URL de la app cuando esté publicada
export const APP_URL:string = 'http://invertu-frontend-kipu.s3-website-us-east-1.amazonaws.com';

const APP_ROUTES: Record<string, string> = {
  login: '/iniciar-sesion',
  register: '/registro',
  terms: '/terminos',
  privacy: '/privacidad',
};

export function appLink(nombre: string): string {
  if (!APP_URL) return '#';
  return APP_URL.replace(/\/$/, '') + APP_ROUTES[nombre];
}
