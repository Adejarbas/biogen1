import express from "express";
import cors from "cors";

// Importação das rotas
import supplierRoutes from "./src/routes/supplier.routes";
import recipientRoutes from "./src/routes/recipient.routes";
import authRoutes from "./src/routes/auth.routes";
import { testConnection, sequelize } from './src/config/database';

// Criação da aplicação
const app = express();

// Configuração dos middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Registra as rotas
app.use("/suppliers", supplierRoutes);
app.use("/recipients", recipientRoutes);
app.use("/auth", authRoutes);

// Testar conexão com o banco
testConnection();

// Adicione ao app.ts temporariamente para criar as tabelas
// sequelize.sync({ force: true }); // Cuidado: isso vai recriar as tabelas

// Inicialização do servidor
const PORT = 3008;
app.listen(PORT, () => {
  console.log(`Servidor executando na Porta ${PORT}`);
});

export default app;

