import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'root', // seu usuário MySQL
  password: '', // sua senha MySQL
  database: 'biogen',
  logging: false,
});

export async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco estabelecida com sucesso.');
  } catch (error) {
    console.error('Não foi possível conectar ao banco:', error);
  }
}