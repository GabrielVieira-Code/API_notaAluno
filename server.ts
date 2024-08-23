import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './src/dataBase/databse'; // Importa a função para conectar ao banco de dados
import { User } from './src/entities/User';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './swagger.json';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/users', async (_, res) => {
  try {
    const connection = await connectToDatabase();
    const userRepository = connection.getRepository(User);
    const users = await userRepository.find();
    res.json(users);
  } catch (error) {
    res.status(500).send('Error fetching users');
  }
});

app.post('/users', async (req, res) => {
  try {
    const connection = await connectToDatabase();
    const userRepository = connection.getRepository(User);
    const user = userRepository.create(req.body);
    await userRepository.save(user);
    res.json(user);
  } catch (error) {
    res.status(500).send('Error creating user');
  }
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
