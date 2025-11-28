import { z } from "zod";

export const eventSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    category: z.string().min(1, "Category is required"),
    location: z.string().min(1, "Location is required"),
    startTime: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid start time",
    }),
    endTime: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid end time",
    }),
    capacity: z.coerce.number().min(1, "Capacity must be at least 1"),
    price: z.coerce.number().min(0, "Price cannot be negative"),
}).refine((data) => {
    const start = new Date(data.startTime);
    const end = new Date(data.endTime);
    return end > start;
}, {
    message: "End time must be after start time",
    path: ["endTime"],
});

export type EventInput = z.infer<typeof eventSchema>;
