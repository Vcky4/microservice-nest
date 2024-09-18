import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ItemService {
    constructor(private prisma: PrismaService) { }
    async create(data: any) {
        // @ts-ignore
        return await this.prisma.item.create({data})
    }

    async update(id: string, data: any) {
        // @ts-ignore
        return await this.prisma.item.update({
            where: {
                id
            },
            data
        })
    }

    async getUserItems(id: string) {
        // @ts-ignore
        return await this.prisma.item.findMany({
            where: {
                ownerId: id
            }
        })
    }

    async getAllItems() {
        // @ts-ignore
        return await this.prisma.item.findMany()
    }

    async getOne(id: string) {
        // @ts-ignore
        return await this.prisma.item.findUnique({
            where: { id }
        })
    }

    async delete(id: string) {
        // @ts-ignore
        return await this.prisma.item.delete({
            where: { id }
        })
    }

}
