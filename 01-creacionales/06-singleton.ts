/**
 * ! Singleton:
 * Es un patrón de diseño creacional que garantiza que una clase
 * tenga una única instancia y proporciona un punto de acceso global a ella.
 *
 * * Es útil cuando necesitas controlar el acceso a una única instancia
 * * de una clase, como por ejemplo, en un objeto de base de datos o en un
 * * objeto de configuración.
 *
 * https://refactoring.guru/es/design-patterns/singleton
 */

import { COLORS } from '../helpers/colors.ts';

class DragonBalls {
  private static instance: DragonBalls;
  private ballsCollected: number;

  private constructor() {
    this.ballsCollected = 0;
  }

  public static getInstance(): DragonBalls {
    if (!DragonBalls.instance) {
      console.log('%cCreating new DragonBalls instance', COLORS.green);
      DragonBalls.instance = new DragonBalls();
    }

    return DragonBalls.instance;
  }

  collectBall(): void {
    if (this.ballsCollected < 7) {
      this.ballsCollected++;
      console.log(
        `%cCollected a dragon ball! Total: ${this.ballsCollected}`,
        COLORS.yellow,
      );
      return;
    }
  }

  summonShenlong() {
    if (this.ballsCollected === 7) {
      console.log('%c Summoning Shenlong!', COLORS.red);
      this.ballsCollected = 0;
      return;
    }

    console.log(
      `%cCannot summon Shenlong. Collected ${this.ballsCollected}/7 balls.`,
      COLORS.red,
    );
  }
}

function main() {
  const gokuDragonBalls = DragonBalls.getInstance();
  gokuDragonBalls.collectBall();
  gokuDragonBalls.collectBall();
  gokuDragonBalls.collectBall();
  gokuDragonBalls.summonShenlong();

  const vegetaDragonBalls = DragonBalls.getInstance();
  vegetaDragonBalls.collectBall();
  vegetaDragonBalls.collectBall();
  vegetaDragonBalls.collectBall();
  vegetaDragonBalls.collectBall();

  gokuDragonBalls.summonShenlong();
  vegetaDragonBalls.summonShenlong();
}

main();
