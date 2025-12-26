import { z } from "zod";

/* ----------------------------- User Schemas ----------------------------- */

const createUserSchema = z
  .object({
    username: z.string().min(3).max(10),
    email: z.string().email(),
    password: z.string(),
    name: z.string(),
  })
  .strict();

const signinUserSchema = z
  .object({
    email: z.string().email(),
    password: z.string(),
  })
  .strict();

/* ----------------------------- Room Schema ------------------------------ */

const roomSchema = z
  .object({
    name: z.string().min(3).max(20),
  })
  .strict();

/* ------------------------------- Types ---------------------------------- */

type CreateUserInput = z.infer<typeof createUserSchema>;
type SigninUserInput = z.infer<typeof signinUserSchema>;
type RoomInput = z.infer<typeof roomSchema>;

/* ------------------------------ Exports --------------------------------- */

export {
  createUserSchema,
  signinUserSchema,
  roomSchema,
};

export type {
  CreateUserInput,
  SigninUserInput,
  RoomInput,
};
