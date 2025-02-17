import { z } from "zod";

const validNIEPrefixes = ["X", "Y", "Z"];
const validDNIPrefixes = [...Array(23).keys()].map((i) => (i + 1).toString());
const DNI_REGEX = /^(([XYZ]\d{7,8})|(\d{8}))([a-zA-Z])$/i;
const DNISchema = z
  .string()
  .min(1, { message: "Este campo es obligatorio" })
  .regex(DNI_REGEX, { message: "Debe ser un valor válido" })
  .transform((value) => value.toUpperCase())
  .refine((value) => {
    const firstLetter = value.charAt(0);
    const letter = value.slice(-1);
    const validLetters = "TRWAGMYFPDXBNJZSQVHLCKE";

    if (validDNIPrefixes.includes(firstLetter)) {
      const numberPart = value.slice(0, -1);
      const index = parseInt(numberPart) % 23;
      const expectedLetter = validLetters.charAt(index);

      return letter === expectedLetter;
    }

    if (validNIEPrefixes.includes(firstLetter)) {
      const numberPart = value.slice(1, -1);
      const NIENumber = validNIEPrefixes.indexOf(firstLetter) + numberPart;
      const index = parseInt(NIENumber) % 23;
      const expectedLetter = validLetters.charAt(index);

      return letter === expectedLetter;
    }

    return false;
  }, { message: "Formato DNI/NIE incorrecto" });

const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

export const UserRegisterSchema = z
  .object({
    dni: DNISchema,
    email: z
      .string()
      .min(1, { message: "Este campo es obligatorio" })
      .email("Debe ser un correo válido"),
    name: z
      .string()
      .min(1, { message: "Este campo es obligatorio" }),
    specialization: z
      .string()
      .min(1, { message: "Este campo es obligatorio" }),
    password: z
      .string()
      .min(8, { message: "La contraseña debe tener mínimo 8 caracteres" })
      .regex(new RegExp(passRegex), {
        message:
          "La contraseña debe contener al menos un número, mayúsculas y minúsculas",
      }),
    confirmPassword: z
      .string()
      .min(1, { message: "Este campo es obligatorio" }),
    accept: z
      .boolean()
      .refine(value => value === true, { message: "Es necesario aceptar los términos legales" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Las contraseñas deben ser iguales",
  });
