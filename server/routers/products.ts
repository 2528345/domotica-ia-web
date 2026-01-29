import { publicProcedure, router } from "../_core/trpc";
import { getActiveProducts, getProductById } from "../db";
import { z } from "zod";

export const productsRouter = router({
  /**
   * Obtener todos los productos activos
   */
  list: publicProcedure.query(async () => {
    return await getActiveProducts();
  }),

  /**
   * Obtener un producto por ID
   */
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      return await getProductById(input.id);
    }),
});
