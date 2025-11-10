/**
 * ! Factory Function
 * Es un patrón de diseño que nos permite crear objetos o funciones de manera dinámica que serán
 * usados posteriormente en el código.
 *
 * * Es útil cuando necesitamos crear objetos o funciones de manera dinámica,
 * * es decir, en tiempo de ejecución y no en tiempo de compilación.
 */

import { COLORS } from '../helpers/colors.ts';

type Lenguaje = 'es' | 'en' | 'fr';

function createGreeter(lang: Lenguaje) {
  return function (name: string) {
    const messages = {
      es: `¡Hola, ${name}!`,
      en: `Hello, ${name}!`,
      fr: `Bonjour, ${name}!`,
    };
    return console.log('%c' + messages[lang], COLORS.green);
  };
}

function main() {
  const greeterES = createGreeter('es');
  const greeterEN = createGreeter('en');
  const greeterFR = createGreeter('fr');

  greeterES('Juan');
  greeterEN('John');
  greeterFR('Jean');
}

main();
