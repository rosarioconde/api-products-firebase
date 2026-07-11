export const notFoundHandler = (req, res) => {
  res.status(404).json({ error: `Ruta no encontrada: ${req.method} ${req.originalUrl}` });
};

export const errorHandler = (error, _req, res, _next) => {
  const statusCode = error.statusCode || (error.type === 'entity.parse.failed' ? 400 : 500);

  if (statusCode >= 500) console.error(error);

  res.status(statusCode).json({
    error: statusCode >= 500 ? 'Error interno del servidor' : error.message,
  });
};
