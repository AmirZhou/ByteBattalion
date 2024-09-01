import {
  IsString,
  IsNumber,
  Min,
  Max,
  IsLongitude,
  IsLatitude,
} from 'class-validator';

export class CreateReportDto {
  @IsNumber()
  @Min(0)
  @Max(100000000)
  price: number;

  @IsString()
  make: string;

  @IsString()
  model: string;

  @IsNumber()
  @Min(1900)
  @Max(2050)
  year: number;

  @IsLongitude()
  lng: number;

  @IsLatitude()
  lat: number;

  @IsNumber()
  @Min(0)
  @Max(100000000)
  mileage: number;
}

// @Entity()
// export class Report {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   price: number;

//   @Column()
//   make: string;

//   @Column()
//   model: string;

//   @Column()
//   year: number

//   @Column()
//   lng: number;

//   @Column()
//   lat: number;

//   @Column()
//   mileage: number;
// }
