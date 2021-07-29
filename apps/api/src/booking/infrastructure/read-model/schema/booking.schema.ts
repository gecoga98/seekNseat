import { Document, Schema } from "mongoose";

export const BookingSchema = new Schema({
    _id: String,
    userId: String,
    businessId: String,
    numberOfFoodies: Number,
    bookingState: String,
    noShow: Boolean,
    deleted: Date,
})

export interface BookingView extends Document {
    readonly _id: string;
    readonly userId: string;
    readonly businessId: string;
    readonly numberOfFoodies: number;
    readonly bookingState: string;
    readonly noShow: boolean;
    readonly deleted: Date;
}

export const BOOKING_MODEL = 'BOOKING_MODEL';