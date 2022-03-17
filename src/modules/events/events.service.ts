import { InjectModel } from '@nestjs/sequelize';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require('moment');

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event) private readonly eventRepository: typeof Event,
    private sequelize: Sequelize,
  ) {}

  findAll(): Promise<Event[]> {
    return this.eventRepository.findAll();
  }

  findOne(id: number): Promise<Event | null> {
    return this.eventRepository.findOne({ where: { eventId: id } });
  }

  create(createEventDto: CreateEventDto): Promise<Event> {
    return this.eventRepository.create({
      ...createEventDto,
    });
  }

  remove(id: number): Promise<number> {
    return this.eventRepository.destroy({ where: { eventId: id } });
  }

  update(id: number, updateEventDto: UpdateEventDto): Promise<any> {
    return this.eventRepository.update(updateEventDto, {
      where: { eventId: id },
    });
  }

  async findOrFail(id: number): Promise<Event> {
    const foundEvent = await this.eventRepository.findOne({
      where: { eventId: id },
    });

    if (!foundEvent) {
      throw new NotFoundException('Event not found');
    }

    return foundEvent;
  }

  async upcomingEvent(): Promise<Event[]> {
    console.log(moment().format('YYYY-MM-DD'));
    const foundEvent = await this.eventRepository.findAll({
      where: {
        startTime: { [Op.gt]: moment().toDate() },
      },
    });
    return foundEvent;
  }

  async liveEvent(): Promise<Event[]> {
    const foundEvent = await this.eventRepository.findAll({
      where: {
        startTime: { [Op.lte]: moment().add(10, 'minutes').toDate() },
      },
    });

    return foundEvent;
  }
}
