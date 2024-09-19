import { Controller, Post, Body, Inject, Get, Param, Delete, Put, UseGuards, Req } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateItemDto } from './dto/create.dto';
import { UpdateItemDto } from './dto/update.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth('JWT')
@Controller('item')
@ApiTags('item')
export class ItemController {
    constructor(
        @Inject('ITEM_SERVICE')
        private readonly itemService: ClientProxy
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    async create(@Req() req, @Body() createItemDto: CreateItemDto) {
        createItemDto.ownerId = req.user.id
        return this.itemService.send({ cmd: 'create' }, createItemDto);
    }

    @UseGuards(JwtAuthGuard)
    @Put('update/:id')
    async update(@Req() req, @Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
        updateItemDto.ownerId = req.user.id
        return this.itemService.send({ cmd: 'update' }, { id, data: updateItemDto });
    }

    @UseGuards(JwtAuthGuard)
    @Get('my-items')
    async getUserItems(@Req() req) {
        const ownerId = req.user.id;
        return this.itemService.send({ cmd: 'getUserItems' }, ownerId);
    }

    @UseGuards(JwtAuthGuard)
    @Get('all')
    async getAllItems() {
        return this.itemService.send({ cmd: 'getAllItems' }, {});
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getOne(@Param('id') id: string) {
        return this.itemService.send({ cmd: 'getOne' }, id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.itemService.send({ cmd: 'delete' }, id);
    }
}
