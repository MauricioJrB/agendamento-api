import { prisma } from '../../../utils/prisma';
import { CreateServiceDTO } from '../dtos/CreateServiceDTO';

export class CreateServiceService {
  public async execute({ name, description }: CreateServiceDTO) {
    const serviceExists = await prisma.service.findFirst({
      where: {
        name,
      },
    });

    if (serviceExists) throw new Error('Já existe um serviço com esse nome.');

    const service = await prisma.service.create({
      data: {
        name,
        description,
      },
    });

    return service;
  }
}
