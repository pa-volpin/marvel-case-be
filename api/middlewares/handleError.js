const handleError = (err, _req, res, _next) => {
  let { message, status } = err;
  console.log('ERRO',err);

  if (!message && err.includes('must have')) {
    status = 400;
    message = 'Invalid fields';
  };

  if (!message && err.includes('must match'))  {
    status = 400;
    message = 'Invalid fields';
  };

  if (!message && err.includes('required'))  {
    status = 400;
    message = 'Invalid fields';
  };

  if (!message)  {
    status = 500;
    message = 'Internal error';
  };

  return res.status(status).json({ message });
};

module.exports = handleError;
