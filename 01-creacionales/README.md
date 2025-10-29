# Patrones de diseno creacionales con TypeScript

## 1. Introduccion

Los patrones de diseno creacionales son soluciones probadas para instanciar objetos en programacion orientada a objetos. En lugar de crear objetos de forma directa y rigida, estos patrones ofrecen modelos flexibles para producirlos, encapsulando los detalles del proceso de construccion.

Son importantes porque:
- Simplifican la creacion de objetos complejos y evitan repeticion de codigo.
- Separan la logica de construccion del resto de la aplicacion, favoreciendo el encapsulamiento.
- Facilitan la reutilizacion, el mantenimiento y la prueba del codigo.
- Permiten cambiar implementaciones sin modificar el codigo cliente, incrementando la flexibilidad.

En resumen, aplicar patrones creacionales ayuda a construir sistemas mas ordenados, extensibles y faciles de evolucionar.

## 2. Patrones creacionales en detalle

### Builder Pattern

**Definicion**  
Separar la construccion de un objeto complejo de su representacion final, permitiendo crear diferentes variantes paso a paso.

**Problema que resuelve**  
Cuando la creacion de un objeto requiere muchos pasos u opciones (por ejemplo, construir un pedido personalizado), el constructor directo (`new`) se vuelve confuso o inflexible.

**Ejemplo de la vida real**  
Personalizar un combo en una cafeteria: eliges bebida, tamano, extras y acompanamientos. El cajero (builder) registra cada paso y al final entrega el pedido completo.

**Ventajas**
- Claridad al construir objetos con multiples configuraciones.
- Evita constructores con listas enormes de parametros.
- Reutiliza pasos comunes entre variaciones.

**Desventajas**
- Introduce clases adicionales (builder/director).
- Puede ser excesivo para objetos sencillos.

```ts
// Ejemplo: construir un curso en linea con distintas opciones
interface CursoConfig {
  titulo: string;
  descripcion: string;
  tieneChat?: boolean;
  sesionesEnVivo?: number;
  materialesExtra?: string[];
}

class CursoBuilder {
  private config: CursoConfig = { titulo: '', descripcion: '' };

  conTitulo(titulo: string) {
    this.config.titulo = titulo;
    return this;
  }

  conDescripcion(descripcion: string) {
    this.config.descripcion = descripcion;
    return this;
  }

  conChat() {
    this.config.tieneChat = true;
    return this;
  }

  conSesionesEnVivo(cantidad: number) {
    this.config.sesionesEnVivo = cantidad;
    return this;
  }

  conMateriales(materiales: string[]) {
    this.config.materialesExtra = materiales;
    return this;
  }

  build(): CursoConfig {
    if (!this.config.titulo || !this.config.descripcion) {
      throw new Error('El curso necesita titulo y descripcion');
    }
    return { ...this.config };
  }
}

const cursoIntensivo = new CursoBuilder()
  .conTitulo('Introduccion a TypeScript')
  .conDescripcion('Aprende TypeScript desde cero en 4 semanas')
  .conChat()
  .conSesionesEnVivo(8)
  .conMateriales(['Guia PDF', 'Repositorio con ejemplos'])
  .build();
```

### Factory Method Pattern

**Definicion**  
Define una interfaz para crear objetos, pero delega a las subclases la decision de que clase instanciar.

**Problema que resuelve**  
Cuando necesitas crear objetos relacionados y quieres evitar acoplar el codigo a clases concretas. Por ejemplo, distintos tipos de notificaciones (correo, SMS, push) que comparten una interfaz comun.

**Ejemplo de la vida real**  
Una empresa de entrega asigna un repartidor distinto segun el tipo de paquete (fragil, refrigerado, documentos), pero el cliente solo solicita el servicio general de entrega.

**Ventajas**
- Facilita agregar nuevas variantes sin tocar el codigo cliente.
- Hace mas sencillo probar e intercambiar dependencias.

**Desventajas**
- Puede generar jerarquias amplias de clases creadoras.
- La logica de seleccion puede dispersarse en varias subclases.

```ts
interface Notificacion {
  enviar(mensaje: string): void;
}

class NotificacionEmail implements Notificacion {
  enviar(mensaje: string) {
    console.log(`Enviando email: ${mensaje}`);
  }
}

class NotificacionSMS implements Notificacion {
  enviar(mensaje: string) {
    console.log(`Enviando SMS: ${mensaje}`);
  }
}

abstract class NotificacionFactory {
  abstract crearNotificacion(): Notificacion;

  notificar(mensaje: string) {
    const canal = this.crearNotificacion();
    canal.enviar(mensaje);
  }
}

class EmailFactory extends NotificacionFactory {
  crearNotificacion() {
    return new NotificacionEmail();
  }
}

class SMSFactory extends NotificacionFactory {
  crearNotificacion() {
    return new NotificacionSMS();
  }
}

const fabrica = Math.random() > 0.5 ? new EmailFactory() : new SMSFactory();
fabrica.notificar('Tu pedido esta en camino');
```

### Abstract Factory Pattern

**Definicion**  
Provee una interfaz para crear familias completas de objetos relacionados sin especificar sus clases concretas.

**Problema que resuelve**  
Necesitas garantizar que multiples objetos se creen en conjunto y sean compatibles entre si (por ejemplo, temas visuales con componentes coherentes).

**Ejemplo de la vida real**  
Al elegir un estilo de muebles (moderno, rustico), todas las piezas de la sala se combinan armoniosamente porque provienen de la misma coleccion.

**Ventajas**
- Mantiene la coherencia entre objetos relacionados.
- Permite intercambiar familias completas (temas, configuraciones) con un solo cambio.

**Desventajas**
- Requiere muchas clases e interfaces; puede ser complejo.
- Introduce capas adicionales que quiza no se necesitan en aplicaciones pequenas.

```ts
interface Boton {
  render(): string;
}

interface Checkbox {
  render(): string;
}

interface UIAbstractFactory {
  crearBoton(): Boton;
  crearCheckbox(): Checkbox;
}

class BotonClaro implements Boton {
  render() {
    return 'Boton claro';
  }
}

class CheckboxClaro implements Checkbox {
  render() {
    return 'Checkbox claro';
  }
}

class BotonOscuro implements Boton {
  render() {
    return 'Boton oscuro';
  }
}

class CheckboxOscuro implements Checkbox {
  render() {
    return 'Checkbox oscuro';
  }
}

class UIClaroFactory implements UIAbstractFactory {
  crearBoton() {
    return new BotonClaro();
  }
  crearCheckbox() {
    return new CheckboxClaro();
  }
}

class UIOscuroFactory implements UIAbstractFactory {
  crearBoton() {
    return new BotonOscuro();
  }
  crearCheckbox() {
    return new CheckboxOscuro();
  }
}

function renderizarInterfaz(factory: UIAbstractFactory) {
  console.log(factory.crearBoton().render());
  console.log(factory.crearCheckbox().render());
}

const tema = Math.random() > 0.5 ? new UIClaroFactory() : new UIOscuroFactory();
renderizarInterfaz(tema);
```

```ts
interface Documento {
  clonar(): Documento;
}

class PlanDeProyecto implements Documento {
  constructor(
    public titulo: string,
    public tareas: string[],
    public presupuesto: number
  ) {}

  clonar() {
    return new PlanDeProyecto(
      this.titulo,
      [...this.tareas],
      this.presupuesto
    );
  }
}

const planBase = new PlanDeProyecto('Lanzamiento App', ['Diseno', 'QA'], 5000);
const planMarketing = planBase.clonar();
planMarketing.titulo = 'Campana Marketing';
planMarketing.tareas.push('Redes sociales');
```

### Singleton Pattern

**Definicion**  
Garantiza que una clase tenga una unica instancia global y provee un punto de acceso controlado a ella.

**Problema que resuelve**  
Necesitas compartir un recurso unico (como una conexion a base de datos, configuracion global o cache) a lo largo de la aplicacion.

**Ejemplo de la vida real**  
Un panel de control centralizado que coordina todas las operaciones de un edificio inteligente. Solo hay uno y todos los subsistemas lo consultan.

**Ventajas**
- Evita duplicar recursos pesados.
- Mantiene un estado global consistente.

**Desventajas**
- Puede dificultar pruebas al introducir estado global.
- Si se abusa, puede generar dependencias ocultas y acoplamiento.

```ts
class ConfiguracionApp {
  private static instancia: ConfiguracionApp | null = null;

  private constructor(private readonly opciones: Record<string, unknown>) {}

  static getInstance() {
    if (!this.instancia) {
      this.instancia = new ConfiguracionApp({ modoOscuro: true, locale: 'es-MX' });
    }
    return this.instancia;
  }

  obtener(key: string) {
    return this.opciones[key];
  }
}

const configA = ConfiguracionApp.getInstance();
const configB = ConfiguracionApp.getInstance();
console.log(configA === configB); // true
```

### Factory Functions

**Definicion**  
Funciones simples que crean y retornan objetos sin necesidad de clases, manteniendo el estado encapsulado en clausuras.

**Problema que resuelve**  
Cuando quieres construir objetos ligeros o basados en funciones, aprovechando el paradigma funcional de JavaScript/TypeScript.

**Ejemplo de la vida real**  
Un menu que genera tarjetas personalizadas para exhibir productos a partir de datos dinamicos.

**Ventajas**
- Sintaxis ligera y flexible.
- Facilitan la inmutabilidad al devolver nuevos objetos facilmente.
- No requieren herencia ni `new`.

**Desventajas**
- No aprovechan el tipado estructural de clases (`instanceof`).
- Pueden duplicar logica si la reutilizacion no se organiza bien.

```ts
type Producto = {
  nombre: string;
  precio: number;
  aplicarDescuento(porcentaje: number): Producto;
};

function crearProducto(nombre: string, precio: number): Producto {
  return {
    nombre,
    precio,
    aplicarDescuento(porcentaje: number) {
      const factor = 1 - porcentaje / 100;
      return crearProducto(nombre, Number((precio * factor).toFixed(2)));
    },
  };
}

const cursoTS = crearProducto('Curso TypeScript', 49.99);
const cursoEnOferta = cursoTS.aplicarDescuento(20);
```

### Inmutabilidad

**Definicion**  
Tecnica para crear objetos cuyos estados no cambian despues de su creacion. En lugar de modificar, se generan nuevas versiones con los cambios necesarios.

**Problema que resuelve**  
Evita efectos secundarios inesperados y facilita razonar sobre el estado, crucial en aplicaciones con muchos eventos o concurrencia.

**Ejemplo de la vida real**  
Duplicar una hoja de calculo y editar la copia para conservar el original intacto.

**Ventajas**
- Facilita depuracion y pruebas al prevenir cambios ocultos.
- Trabaja muy bien con herramientas de control de estado (Redux, NgRx).
- Permite compartir referencias sin riesgos.

**Desventajas**
- Puede generar mas objetos en memoria si no se usa con moderacion.
- Requiere disciplina para evitar mutaciones directas.

```ts
type Perfil = {
  nombre: string;
  intereses: string[];
};

const perfilBase: Perfil = {
  nombre: 'Ana',
  intereses: ['TypeScript', 'Patrones de diseno'],
};

const perfilActualizado: Perfil = {
  ...perfilBase,
  intereses: [...perfilBase.intereses, 'Arquitectura de software'],
};

console.log(perfilBase.intereses.length); // 2
console.log(perfilActualizado.intereses.length); // 3
```

## 3. Comparativa y buenas practicas

| Patron               | Usalo cuando...                                                                        | Ventaja clave                                | Precauciones                           |
|----------------------|-----------------------------------------------------------------------------------------|----------------------------------------------|----------------------------------------|
| Builder              | Debes crear objetos complejos con muchas opciones configurables.                        | Limpia el codigo de construccion.            | Mas clases y pasos adicionales.        |
| Factory Method       | Quieres delegar la eleccion de la implementacion concreta a subclases.                  | Permite extender facilmente nuevas variantes.| Jerarquia de fabricas puede crecer.    |
| Abstract Factory     | Necesitas familias de objetos que deban trabajar juntas y ser consistentes.             | Garantiza compatibilidad entre objetos.      | Complejidad inicial elevada.           |
| Prototype            | Clonar objetos costosos es mas barato que reconstruirlos desde cero.                    | Duplica configuraciones rapidamente.         | Cuidado con copias superficiales.      |
| Singleton            | Requieres un unico punto de acceso a un recurso compartido.                             | Gestiona recursos globales unicos.           | Puede introducir estado global rigido. |
| Factory Functions    | Prefieres funciones ligeras que creen objetos sin clases.                               | Sintaxis simple y aprovechamiento de clausuras.| Dificil usar `instanceof`.            |
| Inmutabilidad        | Buscas estados predecibles y faciles de rastrear, especialmente en UI o programacion reactiva.| Facilita pruebas y debugging.             | Mayor consumo de memoria si abusas.    |

**Consejos para elegir o combinar patrones**
- Identifica primero el problema de creacion: complejidad, coherencia, rendimiento o estado compartido.
- Combina patrones cuando sea util: por ejemplo, una `AbstractFactory` puede utilizar internamente `Builder` para objetos complejos.
- Manten interfaces y tipos claros; usa `interfaces` y `type` para documentar contratos.
- Documenta la intencion del patron en el codigo (comentarios breves o nombres descriptivos).
- Refactoriza gradualmente: introduce el patron cuando detectes dolor real en la creacion de objetos.

**Ejemplos en frameworks TypeScript**
- Angular usa `FactoryProvider` y `Injector` (Abstract Factory + Singleton) para gestionar servicios.
- NestJS utiliza `Providers` y `Modules` para instancias unicas (Singleton) y fabricas (`useFactory`).
- TypeORM crea repositorios y conexiones con patrones `Factory` y `Singleton`.
- RxJS favorece la inmutabilidad y funciones puras para mantener flujos predecibles.

## 4. Conclusion

Los patrones creacionales te ayudan a controlar como se instancian los objetos, ofreciendo flexibilidad sin sacrificar claridad. Con TypeScript, puedes combinar tipado estatico con estos patrones para producir codigo mas mantenible y escalable.

**Buenas practicas generales**
- Empieza simple; introduce un patron solo cuando lo necesites.
- Asegura que los nombres de clases y funciones comuniquen el patron (ej. `CursoBuilder`, `createUserRepository`).
- Acompana cada patron con pruebas unitarias que verifiquen la creacion esperada.

**Recursos recomendados**
- *Head First Design Patterns* (Elisabeth Freeman, Eric Freeman).
- *Design Patterns: Elements of Reusable Object-Oriented Software* (Gang of Four).
- Documentacion oficial de TypeScript: [https://www.typescriptlang.org/docs/](https://www.typescriptlang.org/docs/).
- Curso gratuito sobre patrones en Refactoring Guru: [https://refactoring.guru/es/design-patterns](https://refactoring.guru/es/design-patterns).
- Videos de Angular y NestJS en YouTube que expliquen el uso de `providers`, `injectors` y patrones de diseno.
