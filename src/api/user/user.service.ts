import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../../core/services/prisma/prisma.service'

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) { }

  async getUserById(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    })

    if (!user) {
      throw new NotFoundException('User not found')
    }
    return user
  }

  async getAllUsers() {
    return await this.prismaService.user.findMany({
      where: {
        role: 'USER',
      },
      orderBy: { createdAt: 'desc' },
    })
  }
}
