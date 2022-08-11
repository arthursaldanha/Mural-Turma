import { createSchema } from '@/shared/validations';
import { name, cpf, phone, date } from '@/shared/validations/schemas';

const updateSchema = createSchema({
  name,
  cpf,
  phone,
  birthDate: date,
});

export { updateSchema };
