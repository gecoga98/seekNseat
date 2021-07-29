import { StorableEvent } from "event-sourcing-nestjs";

export class BookingWasCanceled extends StorableEvent {
    eventAggregate = 'booking';
    eventVersion = 1;
    public readonly modifiedOn = new Date();

    constructor(public readonly id: string) {
        super();
    }
}