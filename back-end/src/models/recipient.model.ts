import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export class Recipient extends Model {
    public id!: number;
    public nis!: string;
    public nome!: string;
    public email!: string;
    public senha!: string;
    public endereco!: string;
    public numero!: string;
    public cep!: string;
}

Recipient.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nis: {
        type: DataTypes.STRING(11),
        allowNull: false,
        unique: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    endereco: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    numero: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cep: {
        type: DataTypes.STRING(9),
        allowNull: false,
    }
}, {
    sequelize,
    tableName: 'beneficiario',
    timestamps: true,
});