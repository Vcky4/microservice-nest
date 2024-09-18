import { ApiProperty, PartialType } from "@nestjs/swagger"
import { CreateItemDto } from "./create.dto";

export class UpdateItemDto extends PartialType(CreateItemDto) { }