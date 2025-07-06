import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumber, IsOptional, Max, Min } from "class-validator";

export class CreateStallDto {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  cafeteria_id: number;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(100)
  university_share_percent?: number;
}
