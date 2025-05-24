import { IsOptional, IsBooleanString, IsIn, IsNumberString } from 'class-validator';

export class ContactQueryDTO {
  @IsOptional()
  @IsNumberString()
  page?: string;

  @IsOptional()
  @IsNumberString()
  limit?: string;

  @IsOptional()
  @IsIn(['name', 'email'])
  sort?: string;

  @IsOptional()
  @IsBooleanString()
  favorite?: string;
}
