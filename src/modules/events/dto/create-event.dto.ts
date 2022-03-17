import { ApiProperty } from '@nestjs/swagger';

import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateEventDto {
  @ApiProperty({
    type: String,
    example: null,
    name: 'name',
  })
  @IsNotEmpty()
  @IsString({ message: 'Event name must be a string value' })
  @MaxLength(160, {
    message: 'Event name must be less than 160 characters',
  })
  @Expose({ name: 'name' })
  readonly eventName!: string;

  @ApiProperty({
    type: Date,
    example: null,
    name: 'start_time',
  })
  @IsNotEmpty()
  @Expose({ name: 'start_time' })
  readonly startTime!: Date;

  @ApiProperty({
    type: Number,
    example: null,
    name: 'duration',
  })
  @IsNotEmpty()
  @Expose({ name: 'duration' })
  readonly duration!: number;
}
