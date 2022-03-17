import { Module } from '@nestjs/common';
import { RouterModule, Routes } from '@nestjs/core';
import { EventsModule } from './events/events.module';

const Version1Route = [
  {
    path: 'events',
    module: EventsModule,
  },
];

const routes: Routes = [
  {
    path: '',
    children: Version1Route,
  },
];

@Module({
  imports: [EventsModule, RouterModule.register(routes)],
})
export default class AppRouteModule {}
