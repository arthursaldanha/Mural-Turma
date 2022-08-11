import { createSchema } from '@/shared/validations';
import { email, name, cpf, phone } from '@/shared/validations/schemas';

const loginSchema = createSchema({
  email,
});

const registerSchema = createSchema({
  name,
  cpf,
  phone,
});

export { loginSchema, registerSchema };
