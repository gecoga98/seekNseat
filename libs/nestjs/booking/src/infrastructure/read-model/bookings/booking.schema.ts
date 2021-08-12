import { BookingDTO } from "@seekNseat/contracts/booking";
import { Document, Schema } from "mongoose";

export const BOOKINGS_PROJECTION = 'bookings'

export type BookingDocument = BookingDTO & Document;

export const BookingSchema = new Schema({
    _id: String,
    userId: String,
    username: String,
    businessId: String,
    businessName: String,
    numberOfFoodies: Number,
    bookingState: String,
    noShow: Boolean,
    deleted: Date,
},
{
    versionKey: false,
})
