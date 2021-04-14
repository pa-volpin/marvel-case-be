const favoritesDataSchema = {
  name: {
    type: String,
  },
  photo: {
    type: String,
  },
  marvelId: {
    type: String,
    required: true
  }
};

module.exports = favoritesDataSchema;

