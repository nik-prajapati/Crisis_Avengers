import { Schema, model } from 'mongoose';
import { Message } from '../types/schema';

const messageSchema = new Schema<Message>(
  {
    content: {
      type: String,
      required: true,
      maxLength: 1000,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    request: {
      type: Schema.Types.ObjectId,
      ref: 'Request',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Message = model<Message>('Message', messageSchema);

export default Message;
