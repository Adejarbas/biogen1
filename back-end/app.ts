import express from 'express';
import cors from 'cors';
import { sequelize, initializeDatabase } from './src/config/database';
import supplierRoutes from './src/routes/supplier.routes';
import recipientRoutes from './src/routes/recipient.routes';
import authRoutes from './src/routes/auth.routes';
//import { User } from './src/models/user.model';
//import { Supplier } from './src/models/supplier.model';
//import { Recipient } from './src/models/recipient.model';

// Importação explícita dos models
import './src/models/user.model';
import './src/models/Supplier.model';
import './src/models/recipient.model';


const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Inicialização do banco
initializeDatabase().then(() => {
  console.log('Banco de dados inicializado com sucesso!');
}).catch(error => {
  console.error('Erro ao inicializar banco:', error);
});

// Sincronização do banco
sequelize.sync()
    .then(() => {
        console.log('Banco de dados sincronizado com sucesso!');
    })
    .catch((error) => {
        console.error('Erro ao sincronizar banco:', error);
    });

// Rotas
app.use('/suppliers', supplierRoutes);
app.use('/recipients', recipientRoutes);
app.use('/auth', authRoutes);

export default app;

