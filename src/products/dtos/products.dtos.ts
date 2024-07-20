import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
} from 'class-validator';
// import { PartialType } from '@nestjs/mapped-types'; // se cambia por PartialType de nestjs swagger module, ya que se esta usando nestjs swagger module para documentar la api. ambas opciones cumplen la misma funcion que es la de crear un tipo que acepte propiedades parciales y asi no tener que repetir las propiedades en el objeto de configuracion del decorador @Body de nestjs.
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @IsString({ message: 'El nombre no es un texto' }) // Validación de tipo de dato con class-validator y mensaje personalizado en caso de error de validación de tipo de dato.
  @IsNotEmpty()
  @ApiProperty({ description: `product's name` }) // documentacion de swagger para el campo name del objeto CreateProductDto con description opcional en el objeto de configuracion del decorador @ApiProperty de nestjs swagger module.
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive({ allowNaN: false }) // Validación de número positivo con class-validator y opción allowNaN en false para no permitir valores NaN.
  readonly price: number;

  @IsNumber()
  @IsNotEmpty()
  readonly stock: number;

  @IsUrl()
  @IsNotEmpty()
  readonly image: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
