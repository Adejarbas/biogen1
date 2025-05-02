import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';  // Adicione esta importação
import { ISuppliersList } from '../../ISupplier';
import { IRecipientsList } from '../../IRecipient';
import { IAdminList } from '../../IAdmin';

// Chave secreta para JWT (em produção, use variáveis de ambiente)
const JWT_SECRET = 'biogen-secret-key';

export class AuthService {
  // Método para verificar credenciais e retornar token JWT
  async login(email: string, senha: string, userType: 'admin' | 'supplier' | 'recipient') {
    let user = null;
    let role = '';

    // Verificar o tipo de usuário e buscar nas coleções correspondentes
    if (userType === 'admin') {
      user = await User.findOne({ where: { email, userType: 'admin' } });
      role = 'admin';
    } else if (userType === 'supplier') {
      // Aqui você buscaria no banco de dados de fornecedores
      // Exemplo: user = await Supplier.findOne({ where: { email_supplier: email } });
      role = 'supplier';
    } else if (userType === 'recipient') {
      // Aqui você buscaria no banco de dados de beneficiários
      // Exemplo: user = await Recipient.findOne({ where: { email_recipient: email } });
      role = 'recipient';
    }

    // Se não encontrou usuário, retorna erro
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    // Verificar senha
    const isPasswordValid = await bcrypt.compare(senha, user.senha);
    if (!isPasswordValid) {
      throw new Error('Senha inválida');
    }

    // Gerar token JWT
    const token = jwt.sign(
      { 
        id: user.id, 
        email: user.email, 
        role: role,
        isSuperAdmin: userType === 'admin' ? user.isSuperAdmin : false
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    return { token, user: { ...user.toJSON(), senha: undefined } };
  }

  // Método para verificar token JWT
  verifyToken(token: string) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      return decoded;
    } catch (error) {
      throw new Error('Token inválido');
    }
  }

  // Método para criar hash de senha
  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  // Método para verificar se existe admin
  async checkIfAdminExists(): Promise<boolean> {
    const admin = await User.findOne({ where: { userType: 'admin' } });
    return !!admin;
  }

  // Método para criar primeiro admin
  async createFirstAdmin(nome: string, email: string, senha: string) {
    const hashedPassword = await this.hashPassword(senha);
    
    const admin = await User.create({
      nome,
      email,
      senha: hashedPassword,
      userType: 'admin',
      isSuperAdmin: true
    });

    return admin;
  }
}
