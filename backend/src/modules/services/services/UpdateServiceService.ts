import { prisma } from '../../../utils/prisma';
import { UpdateServiceDTO } from '../dtos/UpdateServiceDTO';

export class UpdateServiceService {
  public async execute({ serviceId, name, description }: UpdateServiceDTO) {
    const service = await prisma.service.findUnique({
      where: {
        id: serviceId,
      },
    });

    if (!service) throw new Error('Serviço não encontrdo');

    const updated = await prisma.service.update({
      where: {
        id: serviceId,
      },
      data: { name, description },
    });

    return updated;
  }
}
