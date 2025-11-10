/**
 * ! Patrón Adapter
 *  Permite que objetos con interfaces incompatibles trabajen juntos, también es muy
 *  util para utilizar librerías de terceros en nuestra aplicación sin depender
 *  directamente de ellas.
 *
 * * Es útil cuando se quiere reutilizar una clase que no tiene la interfaz que
 * * necesitamos o cuando queremos crear una capa de abstracción para una librería
 * * de terceros.
 *
 * https://refactoring.guru/es/design-patterns/adapter
 */

import { COLORS } from '../helpers/colors.ts';

// 1. Interfaz PaymentProcessor
interface PaymentProcessor {
  processPayment(amount: number): void;
}

// 2. Clases de Servicios de Pago Externos
// Estas clases simulan los servicios externos de PayPal, Stripe y MercadoPago

class PayPalService {
  sendPayment(amount: number): void {
    console.log(`Procesando pago de $${amount} con %cPayPal`, COLORS.blue);
  }
}

class StripeService {
  makeCharge(amount: number): void {
    console.log(`Procesando pago de $${amount} con %cStripe`, COLORS.purple);
  }
}

class MercadoPagoService {
  pay(amount: number): void {
    console.log(
      `Procesando pago de $${amount} con %cMercadoPago`,
      COLORS.yellow,
    );
  }
}

// 3. Clases Adaptadoras

// Adaptador para PayPal
class PayPalAdapter implements PaymentProcessor {
  private amount: number;
  private paypalService: PayPalService;

  constructor() {
    this.paypalService = new PayPalService();
    this.amount = 0;
  }

  processPayment(amount: number): void {
    this.amount = amount;
    this.paypalService.sendPayment(this.amount);
  }
}

// Adaptador para Stripe
class StripeAdapter implements PaymentProcessor {
  private amount: number;
  private stripeService: StripeService;

  constructor() {
    this.stripeService = new StripeService();
    this.amount = 0;
  }

  processPayment(amount: number): void {
    this.amount = amount;
    this.stripeService.makeCharge(this.amount);
  }
}

// Adaptador para MercadoPago
class MercadoPagoAdapter implements PaymentProcessor {
  private amount: number;
  private mercadoPagoService: MercadoPagoService;

  constructor() {
    this.mercadoPagoService = new MercadoPagoService();
    this.amount = 0;
  }

  processPayment(amount: number): void {
    this.amount = amount;
    this.mercadoPagoService.pay(this.amount);
  }
}

// 4. Código Cliente para probar el Adapter

function main() {
  const paymentAmount = 100;

  const paypalProcessor: PaymentProcessor = new PayPalAdapter();
  const stripeProcessor: PaymentProcessor = new StripeAdapter();
  const mercadoPagoProcessor: PaymentProcessor = new MercadoPagoAdapter();

  // Procesar pagos con los diferentes servicios
  // Los 3 procesadores de pago trabajan exactamente igual después de adaptaros
  console.log('Usando PayPal:');
  paypalProcessor.processPayment(paymentAmount);

  console.log('\nUsando Stripe:');
  stripeProcessor.processPayment(paymentAmount);

  console.log('\nUsando MercadoPago:');
  mercadoPagoProcessor.processPayment(paymentAmount);
}

main();
