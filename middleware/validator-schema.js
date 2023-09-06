import { ZodError } from 'zod';
export const validateSchema = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    if(error instanceof ZodError) {
      console.log(error)
      return res
        .status(400)
        .json({ message: error.errors.map((error) => error.message) });
    }
  }
};