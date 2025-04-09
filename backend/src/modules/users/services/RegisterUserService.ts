import { hash } from 'bcryptjs';
import { prisma } from '../../../utils/prisma';
import { config } from '../../../config';
import { RegisterUserDTO } from '../dtos/RegisterUserDTO';

export class RegisterUserService {
  public async execute({ name, email, password }: RegisterUserDTO) {
    const userAlreadyExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userAlreadyExists) throw new Error('User already exists!');

    const password_hash = await hash(password, config.SALT_ROUNDS);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: password_hash,
      },
    });

    return user;
  }
}
