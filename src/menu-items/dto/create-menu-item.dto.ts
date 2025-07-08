import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
export class CreateMenuItemDto {

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    stall_id: number;
    
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber({ maxDecimalPlaces: 2 })
    price: number;

   @ApiProperty({ example: true, description: 'Availability of the item', required: false })
  @IsOptional()
  @IsBoolean()
  is_available?: boolean = true;

}

