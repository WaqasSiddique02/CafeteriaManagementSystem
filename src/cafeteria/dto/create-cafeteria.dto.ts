import { IsNotEmpty, IsString } from "class-validator";

export class CreateCafeteriaDto {
    @IsString()
    @IsNotEmpty()
    name:string;

    @IsString()
    @IsNotEmpty()
    location:string;
}
