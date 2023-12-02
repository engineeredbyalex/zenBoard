import { model, models, Schema } from "mongoose";

const blogSchema = new Schema({
    title: { type: String, required: true },
    headingOne: { type: String, },
    contentOne: { type: String, },
    headingTwo: { type: String, },
    contentTwo: { type: String, },
    headingThree: { type: String, },
    contentThree: { type: String, },
}, { timestamps: true })

export const Blog = models?.Blog || model('Blog', blogSchema);