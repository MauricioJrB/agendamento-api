import { sign } from 'jsonwebtoken';
import { prisma } from '../../../utils/prisma';
import { config } from '../../../config';
import { compare } from 'bcryptjs';
import { AuthenticateUserDTO } from '../dtos/AuthenticateUserDTO';

export class AuthenticateUserService {
  public async execute({ email, password }: AuthenticateUserDTO) {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) throw new Error('User not found');
    const comparePassword = await compare(password, user.password);

    if (!comparePassword) throw new Error('Invalid password or email');

    const token = sign({ id: user.id }, config.JWT_SECRET, { expiresIn: '1d' });

    return { token };
  }
}
