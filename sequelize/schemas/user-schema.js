const userDataSchema = {
  email: {
    type: String,
    required: true,
    match: /^\S+@\S+\.\S+$/,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  photo: {
    type: String,
  },
};

module.exports = userDataSchema;
