/**
 * ! Abstract Factory:
 * Es un patrón de diseño que permite crear familias de objetos relacionados
 * sin especificar sus clases concretas.
 *
 * En lugar de crear objetos individuales directamente,
 * creamos fábricas que producen un conjunto de objetos relacionados.
 *
 * * Es útil cuando necesitas crear objetos que son parte de una familia
 * * y quieres asegurarte de que estos objetos se complementen entre sí.
 *
 * https://refactoring.guru/es/design-patterns/abstract-factory
 */

/**
 *  El propósito del Abstract Factory es crear familias de objetos relacionados
 *  (en este caso, hamburguesas y bebidas) sin especificar las clases concretas
 *  de cada uno de esos objetos en el código principal.
 */

import { COLORS } from '../helpers/colors.ts';

interface Hamburger {
  prepare(): void;
}

interface Drink {
  pour(): void;
}

class ChickenHamburger implements Hamburger {
  prepare(): void {
    console.log('Preparing %cChicken Hamburger', COLORS.blue);
  }
}

class BeefHamburger implements Hamburger {
  prepare(): void {
    console.log('Preparing %cBeef Hamburger', COLORS.red);
  }
}

class SodaDrink implements Drink {
  pour(): void {
    console.log('Pouring %cSoda Drink', COLORS.cyan);
  }
}

class JuiceDrink implements Drink {
  pour(): void {
    console.log('Pouring %cJuice Drink', COLORS.orange);
  }
}

interface RestaurantFactory {
  createHamburger(): Hamburger;
  createDrink(): Drink;
}

class FastFoodRestaurantFactory implements RestaurantFactory {
  createHamburger(): Hamburger {
    return new BeefHamburger();
  }

  createDrink(): Drink {
    return new SodaDrink();
  }
}

class HealthyRestaurantFactory implements RestaurantFactory {
  createHamburger(): Hamburger {
    return new ChickenHamburger();
  }

  createDrink(): Drink {
    return new JuiceDrink();
  }
}

function main(factory: RestaurantFactory) {
  const hamburger = factory.createHamburger();
  const drink = factory.createDrink();

  hamburger.prepare();
  drink.pour();
}

console.log('%cFast Food Restaurant Order:', COLORS.purple);
main(new FastFoodRestaurantFactory());
console.log('%cHealthy Restaurant Order:', COLORS.purple);
main(new HealthyRestaurantFactory());
