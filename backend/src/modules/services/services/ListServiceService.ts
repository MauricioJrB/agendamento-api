import { prisma } from '../../../utils/prisma';

export class ListServiceService {
  public async execute() {
    return await prisma.service.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}
