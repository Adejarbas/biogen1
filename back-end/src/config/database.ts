import { Sequelize } from 'sequelize';
import path from 'path';

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '../../database.sqlite'), // Caminho mais preciso
    logging: false,
    define: {
        timestamps: true, // Adiciona createdAt e updatedAt
        underscored: true, // Usa formato snake_case para colunas
        freezeTableName: true // Mantém o nome da tabela como definido
    }
});

// Função para testar conexão e sincronizar models
export const initializeDatabase = async () => {
  try {
      await sequelize.authenticate();
      console.log('Conexão estabelecida com sucesso.');
      
      await sequelize.sync( );
      console.log('Models sincronizados com sucesso.');
  } catch (error) {
      console.error('Erro na inicialização do banco:', error);
      process.exit(1);
  }
};

export const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexão com o banco estabelecida com sucesso.');
        
        // Força a criação das tabelas
        await sequelize.sync({ force: true });
        console.log('Banco de dados sincronizado com sucesso.');
    } catch (error: any) {
        console.error('Erro na conexão:', error.message);
        throw error; // Propaga o erro para tratamento adequado
    }
};

// Função para sincronizar sem forçar (usar em produção)
export const syncDatabase = async () => {
    try {
        await sequelize.sync();
        console.log('Banco de dados sincronizado sem força.');
    } catch (error: any) {
        console.error('Erro na sincronização:', error.message);
        throw error;
    }
};

export default sequelize;