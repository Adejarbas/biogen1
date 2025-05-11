import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export class Supplier extends Model {
    public id!: number;
    public cnpj!: string;
    public razaoSocial!: string;
    public cep!: string;
    public address!: string;
    public number!: string;
    public email!: string;
    public password!: string;
}

Supplier.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    cnpj: {
        type: DataTypes.STRING(18),
        allowNull: false,
        unique: true,
    },
    razaoSocial: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cep: {
        type: DataTypes.STRING(9),
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize,
    tableName: 'fornecedor',
    timestamps: true
});