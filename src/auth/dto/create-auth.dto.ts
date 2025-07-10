import { ApiProperty } from "@nestjs/swagger";

export class CreateAuthDto {
    @ApiProperty({ example: 'theawais777@gmail.com' })
    email: string;

    @ApiProperty({ example: 'awais@1234' })
    password: string;
}