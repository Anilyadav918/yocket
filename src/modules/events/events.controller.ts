import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { ReasonPhrases } from 'http-status-codes';
import { Serializer } from 'src/common/decorators/serializer.decorator';
import { CreateEventDto } from './dto/create-event.dto';
import { EventParamDto } from './dto/event-param.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';
import { EventsService } from './events.service';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Events')
@ApiUnauthorizedResponse({ description: ReasonPhrases.UNAUTHORIZED })
@ApiInternalServerErrorResponse({
  description: ReasonPhrases.INTERNAL_SERVER_ERROR,
})
export class EventsController {
  constructor(private readonly eventService: EventsService) {}

  @Get()
  @Serializer()
  @ApiOkResponse({ description: ReasonPhrases.OK })
  async get(): Promise<Event[]> {
    const events = await this.eventService.findAll();
    return events;
  }

  @Get('upcoming')
  @Serializer()
  @ApiOkResponse({ description: ReasonPhrases.OK })
  async getUpcomingEvents(): Promise<Event[]> {
    const events = await this.eventService.upcomingEvent();
    return events;
  }

  @Get('live')
  @Serializer()
  @ApiOkResponse({ description: ReasonPhrases.OK })
  async getLiveEvents(): Promise<Event[]> {
    const events = await this.eventService.liveEvent();
    return events;
  }

  @Post()
  @Serializer()
  @ApiOkResponse({ description: ReasonPhrases.OK })
  @ApiCreatedResponse({ description: ReasonPhrases.CREATED })
  async create(@Body() createEventDto: CreateEventDto): Promise<Event> {
    return await this.eventService.create(createEventDto);
  }

  @Get(':eventId')
  @Serializer()
  @ApiOkResponse({ description: ReasonPhrases.OK })
  async show(@Param() params: EventParamDto): Promise<Event> {
    const event = await this.eventService.findOrFail(params.eventId);
    return event;
  }

  @Patch(':eventId')
  @ApiConflictResponse({ description: ReasonPhrases.CONFLICT })
  @ApiOkResponse({ description: ReasonPhrases.OK })
  async update(
    @Body() updateCommunityDto: UpdateEventDto,
    @Param() params: EventParamDto,
  ): Promise<any> {
    await this.eventService.update(params.eventId, updateCommunityDto);
    return { code: HttpStatus.OK, message: 'Success' };
  }

  @Delete(':eventId')
  @ApiOkResponse({ description: ReasonPhrases.OK })
  async delete(@Param() params: EventParamDto): Promise<any> {
    await this.eventService.remove(params.eventId);
    return { code: HttpStatus.OK, message: 'Success' };
  }
}
