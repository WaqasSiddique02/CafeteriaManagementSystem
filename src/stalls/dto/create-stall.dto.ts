import { IsInt, IsNotEmpty, IsNumber, IsOptional, Max, Min } from "class-validator";

export class CreateStallDto {
  @IsInt()
  @IsNotEmpty()
  cafeteria_id: number;

  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(100)
  university_share_percent?: number;
}
