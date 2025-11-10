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

class Document {
  public title: string;
  private content: string;
  public author: string;

  constructor(title: string, content: string, author: string) {
    this.title = title;
    this.content = content;
    this.author = author;
  }

  clone(): Document {
    return new Document(this.title, this.content, this.author);
  }

  displayInfo(): void {
    console.log(
      `%c
            Title: ${this.title}
            Author: ${this.author}
            Content: ${this.content}
        `,
      COLORS.cyan,
    );
  }
}

function main() {
  const originalDoc = new Document(
    'Design Patterns',
    'Content about design patterns...',
    'Anderson Zapata',
  );
  console.log({ originalDoc });
  originalDoc.displayInfo();

  const clonedDoc = originalDoc.clone();
  console.log({ clonedDoc });
  clonedDoc.displayInfo();
}

main();
