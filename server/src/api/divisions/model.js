/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import mongoose, { Schema } from 'mongoose';
import mongooseKeywords from 'mongoose-keywords';

const divisionsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    description: {
      type: String,
      minlength: 5,
    },
    authorID: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (obj, ret) => {
        delete ret._id;
      },
    },
  },
);

divisionsSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      authorID: this.authorID, // ---
      description: this.description,
    };

    return full ? { ...view } : view;
  },
};

divisionsSchema.plugin(mongooseKeywords, { paths: ['name'] });

const model = mongoose.model('Divisions', divisionsSchema);

export const schema = { ...model.schema };
export default model;
