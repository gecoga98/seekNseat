import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { EventSourcingModule } from "event-sourcing-nestjs";

import { AuthModule } from "../../auth/auth.module";
import { DatabaseModule } from "../../database/database.module";
import { RequestBookingHandler } from "../application/command/request-booking.hanlder";
import { BookingProviders } from "./booking.provider";
import { BookingController } from "./controller/booking.controller";
import { BookingWasRequestedProjection } from "./read-model/projection/booking-was-requested.projection";

const CommandHandlers = [
    RequestBookingHandler,
];

const QueryHandlers = [];

const ProjectionHandlers = [
    BookingWasRequestedProjection,
];

@Module({
    controllers: [BookingController],
    imports: [AuthModule, CqrsModule, EventSourcingModule.forFeature(), DatabaseModule],
    providers: [
        ...CommandHandlers,
        ...QueryHandlers,
        ...ProjectionHandlers,
        ...BookingProviders,
        //BookingMapper,
    ]
})

export class BookingModule {}