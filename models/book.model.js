/* vim: set tabstop=2 softtabstop=0 expandtab shiftwidth=2 smarttab : */
import mongoose from 'mongoose';

const bookSchema = mongoose.Schema(
  {
    'userId': {type: String, required: true},
    'title': {type: String, required: true},
    'author': {type: String, required: true},
    'imageUrl': {type: String, required: true},
    'year': {type: Number, required: true},
    'genre': {type: String, required: true},
    'ratings': [
      {
        'userId': {type: String},
        'grade': {type: Number}
      }
    ],
    'averageRating': {type: Number, default: 0.0}
  }
);

bookSchema.pre(
  'save', (
    function (next) {
      const ratings = (
        typeof this.ratings === 'object' ? this.ratings.map(rating => rating.grade) : []
      );
      if (!ratings.length) {
        this.averageRating = 0.0;
      } else {
        const sumOfRatings = (
          ratings.reduce((ac, cur) => ac + cur, 0.0)
        );
        this.averageRating = Math.ceil(sumOfRatings / ratings.length);
      }
      next();
    }
  )
)

export default mongoose.model('Book', bookSchema);
