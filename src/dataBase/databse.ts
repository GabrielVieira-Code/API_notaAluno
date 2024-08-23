import { createConnection, Connection } from 'typeorm';
import { User } from '../entities/User';

let connection: Connection | null = null;

export const connectToDatabase = async () => {
  if (connection) return connection;

  connection = await createConnection({
    type: 'sqlite', // ou 'mysql', 'postgres', etc.
    database: 'database.sqlite', // ou as credenciais do seu banco de dados
    entities: [User],
    synchronize: true, // Certifique-se de configurar isso adequadamente para produção
  });

  return connection;
};
