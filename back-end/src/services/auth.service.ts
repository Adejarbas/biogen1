import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ISuppliersList } from '../../ISupplier';
import { IRecipientsList } from '../../IRecipient';
import { IAdminList } from '../../IAdmin';

// Simulação de banco de dados (em produção, você usaria Sequelize)
const admins = [
  {
    id: 1,
    nome: "Admin Principal",
    email: "admin@biogen.com",
    senha: "$2b$10$X7o4c5/QhP5.J5VQPV3NXOtbL0IXAH/Cg4FDGP.TGjW0QNXgvJSJy", // "admin123" criptografado
    isSuperAdmin: true
  }
];

// Chave secreta para JWT (em produção, use variáveis de ambiente)
const JWT_SECRET = 'biogen-secret-key';

export class AuthService {
  // Método para verificar credenciais e retornar token JWT
  async login(email: string, senha: string, userType: 'admin' | 'supplier' | 'recipient') {
    let user = null;
    let role = '';

    // Verificar o tipo de usuário e buscar nas coleções correspondentes
    if (userType === 'admin') {
      user = admins.find(a => a.email === email);
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

    // Verificar senha (para admin)
    if (userType === 'admin') {
      const isPasswordValid = await bcrypt.compare(senha, user.senha);
      if (!isPasswordValid) {
        throw new Error('Senha inválida');
      }
    } else {
      // Para outros tipos, você faria a verificação específica
      // Exemplo: const isPasswordValid = await bcrypt.compare(senha, user.senha_supplier);
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

    return { token, user: { ...user, senha: undefined } };
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
}