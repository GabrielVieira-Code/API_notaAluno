import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import 'reflect-metadata';
import { connectToDatabase } from './dataBase/databse'; // Importa a função para conectar ao banco de dados
import { User } from './entities/User';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../swagger.json';

const app = express();
app.use(express.json());
app.use(cors());

// Endpoint GET para listar todos os usuários
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

// Endpoint POST para criar um novo usuário
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

// Endpoint PUT para atualizar um usuário existente
app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  try {
    const connection = await connectToDatabase();
    const userRepository = connection.getRepository(User);
    
    // Buscar o usuário existente
    const user = await userRepository.findOne({ where: { id: Number(id) } });
    
    if (!user) {
      return res.status(404).send('User not found');
    }

    // Atualizar os campos do usuário
    userRepository.merge(user, updatedUser);
    
    // Salvar as alterações no banco de dados
    await userRepository.save(user);
    
    res.json(user);
  } catch (error) {
    res.status(500).send('Error updating user');
  }
});

// Endpoint DELETE para remover um usuário
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const connection = await connectToDatabase();
    const userRepository = connection.getRepository(User);
    
    // Buscar o usuário existente
    const user = await userRepository.findOne({ where: { id: Number(id) } });
    
    if (!user) {
      return res.status(404).send('User not found');
    }
    
    // Remover o usuário do banco de dados
    await userRepository.remove(user);
    
    res.status(204).send(); // Status 204 No Content
  } catch (error) {
    res.status(500).send('Error deleting user');
  }
});

// Endpoint para documentação Swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(process.env.PORT ?Number(process.env.PORT):3000, () => {
  console.log('Server listening on port 3000');
});
