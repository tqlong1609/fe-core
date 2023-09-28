import z from "zod";

export type AuthenticationResponse = {
  statusCode?: number;
  message: string;
  token?: string;
};

const authenticationResponseSchema = z.object({
  statusCode: z.number().optional(),
  message: z.string(),
  token: z.string().optional()
});

export type AuthenticationResponseSchema = z.infer<
  typeof authenticationResponseSchema
>;

export { authenticationResponseSchema };
