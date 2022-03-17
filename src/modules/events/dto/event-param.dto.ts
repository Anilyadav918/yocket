import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class EventParamDto {
  @IsNotEmpty({ message: 'Event is required' })
  @Expose({ name: 'eventId' })
  readonly eventId!: number;
}
