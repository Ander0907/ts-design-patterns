/**
 * ! Patrón Prototype:

 * Es un patrón de diseño creacional que nos permite copiar objetos existentes sin hacer
 * que el código dependa de sus clases.
 *
 * * Es útil cuando queremos duplicar el contenido,
 * * el título y el autor de un documento, por ejemplo o cualquier objeto complejo.
 *
 * https://refactoring.guru/es/design-patterns/prototype
 */

import { COLORS } from '../helpers/colors.ts';

class Pokemon {
  name: string;
  type: string;
  level: number;
  attacks: string[];

  constructor(name: string, type: string, level: number, attacks: string[]) {
    this.name = name;
    this.type = type;
    this.level = level;
    this.attacks = attacks;
  }

  // Método para clonar el Pokémon
  clone(): Pokemon {
    // Los ataques deben de evitar pasarse por referencia, es decir, no deben de ser el mismo arreglo.
    return new Pokemon(
      this.name,
      this.type,
      this.level,
      [...this.attacks],
    );
  }

  displayInfo(): void {
    console.log(
      `Nombre: ${this.name}\nTipo: ${this.type}\nNivel: ${this.level}\nAtaques: ${
        this.attacks.join(', ')
      }`,
    );
  }
}

// Tarea:
// 1. Crear un Pokémon base.
// 2. Clonar el Pokémon base y modificar algunos atributos en los clones.
// 3. Llamar a displayInfo en cada Pokémon para mostrar sus detalles.

function main() {
  const basePokemon = new Pokemon('Charmander', 'Fuego', 1, [
    'Llamarada',
    'Arañazo',
  ]);
  const clonePokemon = basePokemon.clone();
  clonePokemon.name = 'Charmeleon';
  clonePokemon.level = 16;
  clonePokemon.attacks.push('Lanzallamas');

  console.log('%cInfo Pokemon base:', COLORS.brown);
  basePokemon.displayInfo();
  console.log('%cInfo Pokemon cloned:', COLORS.blue);
  clonePokemon.displayInfo();
}

main();
