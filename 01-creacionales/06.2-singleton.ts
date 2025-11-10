/**
 * ! Singleton:
 * Es un patrón de diseño creacional que garantiza que una clase
 * tenga una única instancia y proporciona un punto de acceso global a ella.
 *
 * * Es útil cuando necesitas controlar el acceso a una única instancia
 * * de una clase, como por ejemplo, en un objeto de base de datos o en un
 * * objeto de configuración.
 */

import { COLORS } from '../helpers/colors.ts';

class DatabaseConnection {
  private static instance: DatabaseConnection;
  private connected: boolean = false;

  private constructor() {}

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      console.log('%cCreating new DatabaseConnection instance', COLORS.green);
      DatabaseConnection.instance = new DatabaseConnection();
    }

    return DatabaseConnection.instance;
  }

  public connect(): void {
    if (!this.connected) {
      this.connected = true;
      console.log('%cConnected to the database', COLORS.blue);
    } else {
      console.log('%cAlready connected to the database', COLORS.yellow);
    }
  }

  public disconnect(): void {
    if (this.connected) {
      this.connected = false;
      console.log('%cDisconnected from the database', COLORS.red);
    } else {
      console.log(
        '%cNo active database connection to disconnect',
        COLORS.yellow,
      );
    }
  }
}

function main() {
  const db1 = DatabaseConnection.getInstance();

  // Debería conectar a la base de datos
  db1.connect();

  const db2 = DatabaseConnection.getInstance();

  // Debería mostrar que ya existe una conexión activa
  db2.connect();
  // Debería mostrar true
  console.log('Son iguales:', db1 === db2);
  // Debería cerrar la conexión
  db1.disconnect();
  // Ahora debería conectar de nuevo, ya que se cerró la anterior
  db2.connect();
}

main();
