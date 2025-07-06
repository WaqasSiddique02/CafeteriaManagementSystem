import { PartialType } from '@nestjs/swagger';
import { CreateCafeteriaDto } from './create-cafeteria.dto';

export class UpdateCafeteriaDto extends PartialType(CreateCafeteriaDto) {}
