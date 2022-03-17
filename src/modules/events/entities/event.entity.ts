import {
  AutoIncrement,
  Column,
  DataType,
  DefaultScope,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Expose, Type } from 'class-transformer';
import { BaseEntity, ExcludeColumn } from 'src/modules/base.entity';

@DefaultScope(() => ({
  attributes: ExcludeColumn,
}))
@Table({ modelName: 'Event', tableName: 'events' })
export class Event extends BaseEntity {
  @Type(() => Number)
  @Expose({ name: 'id' })
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.BIGINT)
  eventId!: number;

  @Expose({ name: 'name' })
  @Column
  eventName!: string;

  @Expose({ name: 'start_time' })
  @Column
  startTime!: Date;

  @Expose({ name: 'duration' })
  @Column
  duration!: number;
}
