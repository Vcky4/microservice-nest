import { ApiProperty } from "@nestjs/swagger";

export class CreateItemDto {
    @ApiProperty()
    name: string

    @ApiProperty()
    description: string

    ownerId: string

    @ApiProperty()
    price: number
}