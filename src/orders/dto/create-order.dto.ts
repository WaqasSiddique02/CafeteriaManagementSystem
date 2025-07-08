import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class CreateOrderDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    stall_id: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    cashier_id: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    total_amount: number;

}