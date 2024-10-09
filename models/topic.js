import mongoose from 'mongoose';

const { Schema } = mongoose;

const topicSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Topic = mongoose.models.Topic || mongoose.model('Topic', topicSchema);

export default Topic;
