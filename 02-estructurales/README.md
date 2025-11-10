# Patrones de diseño estructurales con TypeScript

## 1. Introducción

Los patrones de diseño estructurales ayudan a definir cómo se relacionan y organizan las clases y objetos para formar estructuras más grandes y flexibles. Permiten componer objetos y clases para obtener nuevas funcionalidades, facilitando la reutilización y el mantenimiento del código.

Son importantes porque:

- Permiten construir sistemas complejos a partir de componentes simples.
- Favorecen la reutilización y extensión de funcionalidades sin modificar el código existente.
- Ayudan a reducir el acoplamiento entre componentes.
- Facilitan la integración de sistemas o librerías con interfaces incompatibles.

En resumen, los patrones estructurales te ayudan a organizar el código para que sea más flexible, escalable y fácil de mantener.

## 2. Patrones estructurales en detalle

### Adapter Pattern

**Definición**  
Permite que dos interfaces incompatibles trabajen juntas mediante un adaptador que traduce las llamadas de una interfaz a otra.

**Problema que resuelve**  
Cuando necesitas usar una clase existente cuya interfaz no es compatible con la que espera tu código.

**Ejemplo de la vida real**  
Un enchufe de viaje que adapta la clavija de un dispositivo extranjero al tomacorriente local.

**Ventajas**
- Permite reutilizar código existente sin modificarlo.
- Facilita la integración de sistemas de terceros.

**Desventajas**
- Puede introducir una capa adicional de complejidad.
- El abuso puede llevar a una arquitectura difícil de entender.

```ts
// Interfaz esperada
interface Logger {
  log(mensaje: string): void;
}

// Clase existente incompatible
class LocalLogger {
  writeLog(texto: string) {
    console.log(`Local: ${texto}`);
  }
}

// Adaptador
class LoggerAdapter implements Logger {
  constructor(private localLogger: LocalLogger) {}
  log(mensaje: string) {
    this.localLogger.writeLog(mensaje);
  }
}

const logger = new LoggerAdapter(new LocalLogger());
logger.log('Mensaje adaptado');
```

### Bridge Pattern

**Definición**  
Separa una abstracción de su implementación, permitiendo que ambas evolucionen de forma independiente.

**Problema que resuelve**  
Cuando tienes múltiples variantes de una abstracción y de su implementación, y quieres combinarlas libremente sin crear una explosión de subclases.

**Ejemplo de la vida real**  
Un control remoto (abstracción) que puede operar diferentes marcas de televisores (implementaciones).

**Ventajas**
- Reduce el número de clases necesarias para combinar variantes.
- Permite cambiar la implementación en tiempo de ejecución.

**Desventajas**
- Puede ser más complejo de entender y diseñar.

```ts
// Implementación
interface Dispositivo {
  encender(): void;
  apagar(): void;
}

class TV implements Dispositivo {
  encender() { console.log('TV encendida'); }
  apagar() { console.log('TV apagada'); }
}

class Radio implements Dispositivo {
  encender() { console.log('Radio encendida'); }
  apagar() { console.log('Radio apagada'); }
}

// Abstracción
class ControlRemoto {
  constructor(protected dispositivo: Dispositivo) {}
  encender() { this.dispositivo.encender(); }
  apagar() { this.dispositivo.apagar(); }
}

const control = new ControlRemoto(new TV());
control.encender();
```

### Composite Pattern

**Definición**  
Permite tratar objetos individuales y composiciones de objetos de manera uniforme mediante una estructura en árbol.

**Problema que resuelve**  
Cuando necesitas manipular jerarquías de objetos (por ejemplo, menús, archivos y carpetas) de forma uniforme.

**Ejemplo de la vida real**  
Un menú de aplicación donde cada elemento puede ser una opción simple o un submenú con más opciones.

**Ventajas**
- Simplifica el código cliente al tratar objetos y composiciones de la misma forma.
- Facilita la construcción de estructuras jerárquicas complejas.

**Desventajas**
- Puede hacer más difícil restringir tipos de componentes.

```ts
interface Componente {
  mostrar(): void;
}

class Opcion implements Componente {
  constructor(private nombre: string) {}
  mostrar() { console.log(this.nombre); }
}

class Menu implements Componente {
  private hijos: Componente[] = [];
  constructor(private nombre: string) {}
  agregar(componente: Componente) { this.hijos.push(componente); }
  mostrar() {
    console.log(`Menu: ${this.nombre}`);
    this.hijos.forEach(hijo => hijo.mostrar());
  }
}

const menuPrincipal = new Menu('Archivo');
menuPrincipal.agregar(new Opcion('Nuevo'));
menuPrincipal.agregar(new Opcion('Abrir'));
const submenu = new Menu('Exportar');
submenu.agregar(new Opcion('PDF'));
submenu.agregar(new Opcion('Word'));
menuPrincipal.agregar(submenu);
menuPrincipal.mostrar();
```

### Decorator Pattern

**Definición**  
Permite añadir funcionalidades a objetos de forma dinámica, envolviéndolos en decoradores que implementan la misma interfaz.

**Problema que resuelve**  
Cuando necesitas agregar responsabilidades a objetos sin modificar su código ni usar herencia.

**Ejemplo de la vida real**  
Un café al que puedes agregarle leche, azúcar o crema, cada uno envolviendo al café original.

**Ventajas**
- Añade funcionalidades de forma flexible y dinámica.
- Evita la proliferación de subclases.

**Desventajas**
- Puede generar muchas clases pequeñas y difíciles de rastrear.

```ts
interface Cafe {
  costo(): number;
  descripcion(): string;
}

class CafeSimple implements Cafe {
  costo() { return 10; }
  descripcion() { return 'Café'; }
}

class ConLeche implements Cafe {
  constructor(private cafe: Cafe) {}
  costo() { return this.cafe.costo() + 3; }
  descripcion() { return this.cafe.descripcion() + ' con leche'; }
}

const miCafe = new ConLeche(new CafeSimple());
console.log(miCafe.descripcion(), miCafe.costo());
```

### Facade Pattern

**Definición**  
Proporciona una interfaz simplificada para un conjunto de interfaces en un subsistema, haciendo el subsistema más fácil de usar.

**Problema que resuelve**  
Cuando un sistema es complejo y quieres ofrecer una API sencilla para tareas comunes.

**Ejemplo de la vida real**  
Un control universal que maneja varios dispositivos del hogar con unos pocos botones.

**Ventajas**
- Reduce la complejidad para el usuario.
- Desacopla el código cliente del subsistema complejo.

**Desventajas**
- Puede ocultar funcionalidades avanzadas del subsistema.

```ts
class SistemaAudio {
  encender() { console.log('Audio encendido'); }
}
class SistemaVideo {
  encender() { console.log('Video encendido'); }
}
class HomeTheaterFacade {
  constructor(private audio: SistemaAudio, private video: SistemaVideo) {}
  verPelicula() {
    this.audio.encender();
    this.video.encender();
    console.log('¡Listo para ver la película!');
  }
}
const homeTheater = new HomeTheaterFacade(new SistemaAudio(), new SistemaVideo());
homeTheater.verPelicula();
```

### Flyweight Pattern

**Definición**  
Permite compartir la mayor cantidad posible de datos entre objetos similares para ahorrar memoria.

**Problema que resuelve**  
Cuando tienes muchos objetos similares y quieres optimizar el uso de memoria.

**Ejemplo de la vida real**  
Un editor de texto que reutiliza el mismo objeto para cada letra 'a' en el documento, en vez de crear uno nuevo cada vez.

**Ventajas**
- Reduce el consumo de memoria.
- Mejora el rendimiento en sistemas con muchos objetos similares.

**Desventajas**
- Puede complicar el diseño y la gestión del estado.

```ts
type Icono = { tipo: string };
class IconoFactory {
  private iconos: Record<string, Icono> = {};
  obtener(tipo: string): Icono {
    if (!this.iconos[tipo]) {
      this.iconos[tipo] = { tipo };
    }
    return this.iconos[tipo];
  }
}
const factory = new IconoFactory();
const iconoA = factory.obtener('carpeta');
const iconoB = factory.obtener('carpeta');
console.log(iconoA === iconoB); // true
```

### Proxy Pattern

**Definición**  
Proporciona un objeto sustituto que controla el acceso a otro objeto, permitiendo agregar lógica extra (control de acceso, cache, etc.).

**Problema que resuelve**  
Cuando necesitas controlar el acceso a un objeto, agregar validaciones, cache o registro de operaciones.

**Ejemplo de la vida real**  
Una tarjeta de acceso que valida si puedes entrar a una zona restringida antes de abrir la puerta.

**Ventajas**
- Permite agregar lógica extra sin modificar el objeto real.
- Útil para control de acceso, cache, logging, etc.

**Desventajas**
- Puede agregar complejidad y afectar el rendimiento si se abusa.

```ts
interface Servicio {
  solicitar(): void;
}
class ServicioReal implements Servicio {
  solicitar() { console.log('Servicio real ejecutado'); }
}
class ProxyServicio implements Servicio {
  constructor(private real: ServicioReal) {}
  solicitar() {
    console.log('Validando acceso...');
    this.real.solicitar();
  }
}
const servicio = new ProxyServicio(new ServicioReal());
servicio.solicitar();
```

## 3. Comparativa y buenas prácticas

| Patrón     | Úsalo cuando...                                                      | Ventaja clave                        | Precauciones                        |
|------------|-----------------------------------------------------------------------|--------------------------------------|-------------------------------------|
| Adapter    | Integras código con interfaces incompatibles.                         | Reutilización sin modificar código.  | Puede complicar la arquitectura.    |
| Bridge     | Variantes de abstracción e implementación deben combinarse libremente. | Flexibilidad y bajo acoplamiento.    | Diseño más complejo.                |
| Composite  | Estructuras jerárquicas (menús, árboles, etc.).                       | Uniformidad en el tratamiento.       | Difícil restringir tipos.           |
| Decorator  | Añadir funcionalidades dinámicamente.                                 | Extensión flexible de objetos.       | Muchas clases pequeñas.             |
| Facade     | Simplificar el uso de subsistemas complejos.                          | API sencilla y desacoplada.          | Puede ocultar detalles importantes. |
| Flyweight  | Muchos objetos similares consumen mucha memoria.                      | Ahorro de memoria.                   | Gestión de estado compleja.         |
| Proxy      | Controlar acceso, cache o logging.                                    | Lógica extra sin modificar objeto.   | Complejidad y posible sobrecarga.   |

**Consejos para elegir o combinar patrones**

- Identifica si el problema es de integración, extensión, composición o control de acceso.
- Combina patrones cuando sea útil: por ejemplo, un `Proxy` puede envolver un `Facade`.
- Mantén interfaces claras y documenta la intención del patrón en el código.
- Refactoriza gradualmente: introduce el patrón cuando detectes necesidad real.

**Ejemplos en frameworks TypeScript**

- Angular usa `Renderer2` (Facade + Adapter) para manipular el DOM de forma segura.
- NestJS utiliza proxies para interceptores y guards.
- Librerías de UI usan Composite para menús y árboles de componentes.
- Express y Koa permiten middlewares tipo Decorator.

## 4. Conclusión

Los patrones estructurales te ayudan a organizar y conectar componentes de manera flexible y escalable. Con TypeScript, puedes aprovechar el tipado estático para implementar estos patrones de forma robusta y mantenible.

**Buenas prácticas generales**

- Empieza simple; introduce un patrón solo cuando lo necesites.
- Usa nombres descriptivos que comuniquen el patrón (ej. `LoggerAdapter`, `ControlRemoto`).
- Acompaña cada patrón con pruebas unitarias.
- Documenta la intención y el uso de cada patrón en el código.

**Recursos recomendados**

- _Head First Design Patterns_ (Elisabeth Freeman, Eric Freeman).
- _Design Patterns: Elements of Reusable Object-Oriented Software_ (Gang of Four).
- Documentación oficial de TypeScript: [https://www.typescriptlang.org/docs/](https://www.typescriptlang.org/docs/).
- Curso gratuito sobre patrones en Refactoring Guru: [https://refactoring.guru/es/design-patterns](https://refactoring.guru/es/design-patterns).
- Videos de Angular y NestJS en YouTube sobre patrones estructurales y arquitectura.
