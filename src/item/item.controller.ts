import { Controller, Post, Body, Inject, Get, Param, Delete, Put } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateItemDto } from './dto/create.dto';
import { UpdateItemDto } from './dto/update.dto';

@Controller('item')
export class ItemController {
    constructor(
        @Inject('ITEM_SERVICE')
        private readonly itemService: ClientProxy
    ) { }

    @Post('create')
    async create(@Body() createItemDto: CreateItemDto) {
        return this.itemService.send({ cmd: 'create' }, createItemDto);
    }

    @Put('update/:id')
    async update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
        return this.itemService.send({ cmd: 'update' }, { id, data: updateItemDto });
    }

    @Get('user/:ownerId')
    async getUserItems(@Param('ownerId') ownerId: string) {
        return this.itemService.send({ cmd: 'getUserItems' }, ownerId);
    }

    @Get('all')
    async getAllItems() {
        return this.itemService.send({ cmd: 'getAllItems' }, {});
    }

    @Get(':id')
    async getOne(@Param('id') id: string) {
        return this.itemService.send({ cmd: 'getOne' }, id);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.itemService.send({ cmd: 'delete' }, id);
    }
}
