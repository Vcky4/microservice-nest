import { ApiProperty } from "@nestjs/swagger";

export class CreateItemDto {
    @ApiProperty()
    name: string

    @ApiProperty()
    description: string

    @ApiProperty()
    ownerId: string

    @ApiProperty()
    price: number
}