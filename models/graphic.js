import { Schema, model } from "mongoose";

const DatasetSchema = new Schema({
    label: { type: String, required: false },
    backgroundColor: { type: [String], required: false },
    borderColor: { type: [String], required: false },
    data: { type: [Number], required: false },
    tension: { type: Number, default: 0.1 },
    borderWidth: { type: Number, default: 1 },
});

const DataSchema = new Schema({
    labels: { type: [String], required: false },
    datasets: { type: [DatasetSchema], required: false },
});

const graphicSchema = new Schema({
    type: { type: String, required: false },
    data: { type: DataSchema, required: false },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const Graphic = model("Graphic", graphicSchema);

export default Graphic;
