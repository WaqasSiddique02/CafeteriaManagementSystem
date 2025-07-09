import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, Min } from "class-validator";

export class CreateOrderItemDto {
    @ApiProperty()
    @IsNotEmpty()
    order_id: number;

    @ApiProperty()
    @IsNotEmpty()
    menu_item_id: number;

    
   @ApiProperty({ example: 2, description: 'Quantity of the item being ordered' })
   @IsInt()
   @Min(1, { message: 'Quantity must be at least 1' })
   quantity: number;

   @ApiProperty({ example: 250.00, description: 'Price of the item at the time of ordering' })
   @IsNotEmpty()
   item_price: number;

}
