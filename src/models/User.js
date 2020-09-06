const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        count: {
          type: Number,
          required: true,
          default: 1,
        },
        courseId: {
          type: Schema.Types.ObjectId,
          ref: 'Course',
          required: true,
        },
      },
    ],
  },
});

userSchema.methods.addToCart = function({ _id: id }) {
  const items = [...this.cart.items];
  const idx = items.findIndex(
    ({ courseId }) => console.log('_id', { id, courseId }) || courseId.toString() === id.toString(),
  );

  if (idx >= 0) {
    items[idx].count++;
  } else {
    items.push({
      courseId: id,
      count: 1,
    });
  }

  this.cart = { items };

  return this.save();
};

userSchema.methods.removeCartItem = function(id) {
  let items = [...this.cart.items];
  const idx = items.findIndex(({ courseId }) => courseId.toString() === id.toString());

  if (items[idx].count === 1) {
    items = items.filter(({ courseId }) => courseId.toString() !== id.toString());
  } else {
    items[idx].count--;
  }

  this.cart = { items };

  return this.save();
};

module.exports = model('User', userSchema);
