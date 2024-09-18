import { Controller } from '@nestjs/common';
import { ItemService } from './item.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class ItemController {
    constructor(private readonly itemService: ItemService) { }

    @MessagePattern({ cmd: 'create' })
    async create(
        @Payload() data: { name: string; ownerId: string; description: string; price: number }
    ) {
        return this.itemService.create(data);
    }

    @MessagePattern({ cmd: 'update' })
    async update(
        @Payload() payload: { id: string; data: { name?: string; description?: string; price?: number } }
    ) {
        const { id, data } = payload;
        return this.itemService.update(id, data);
    }

    @MessagePattern({ cmd: 'getUserItems' })
    async getUserItems(@Payload() userId: string) {
        return this.itemService.getUserItems(userId);
    }

    @MessagePattern({ cmd: 'getAllItems' })
    async getAllItems() {
        return this.itemService.getAllItems();
    }

    @MessagePattern({ cmd: 'getOne' })
    async getOne(@Payload() id: string) {
        return this.itemService.getOne(id);
    }

    @MessagePattern({ cmd: 'delete' })
    async delete(@Payload() id: string) {
        return this.itemService.delete(id);
    }
}
