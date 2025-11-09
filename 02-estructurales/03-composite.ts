/**
 * ! Patrón Composite
 * Es un patrón de diseño estructural que permite componer objetos
 * en estructuras de árbol para representar jerarquías.
 *
 * El patrón permite a los clientes tratar de manera uniforme a los objetos
 * individuales y a sus composiciones.
 *
 * * Es útil cuando necesitas tratar a los objetos individuales
 * * y a sus composiciones de manera uniforme, y la estructura
 * * de los objetos forma una jerarquía en árbol.
 *
 * https://refactoring.guru/es/design-patterns/composite
 *
 */

interface FileSystemComponent {
    showDetails(indent?: string): void;
}

class File implements FileSystemComponent {
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    showDetails(indent?: string): void {
      console.log(`${indent} - Archivo: ${this.name}`);
    }
}

class Folder implements FileSystemComponent {
    private name: string;
    private components: FileSystemComponent[] = [];

    constructor(name: string) {
        this.name = name;
    }

    addComponent(component: FileSystemComponent): void {
        this.components.push(component);
    }

    showDetails(indent: string = ''): void {
      console.log(`${indent} - Carpeta: ${this.name}`);
      this.components.forEach(component => component.showDetails(indent + ' '));
    }
}

function main() {
    const file1 = new File('documento1.txt');
    const file2 = new File('imagen1.png');
    const file3 = new File('video1.mp4');
    const file4 = new File('presentacion1.pptx');

    const folder1 = new Folder('Mis Documentos');
    folder1.addComponent(file1);
    folder1.addComponent(file2);

    const folder2 = new Folder('Mis Multimedia');
    folder2.addComponent(file3);

    const folder3 = new Folder('Mi escritorio');
    folder3.addComponent(file4);
    folder2.addComponent(folder3);

    const rootFolder = new Folder('Raíz');
    rootFolder.addComponent(folder1);
    rootFolder.addComponent(folder2);
    rootFolder.addComponent(folder3);

    rootFolder.showDetails();
}

main();