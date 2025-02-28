import * as yup from "yup";
import { CreateCityInputSchema } from "./city";
export const CreateCountryInputSchema = yup.object({
	name: yup.string().required(),
	cities: yup
		.array()
		.notRequired()
		.nullable()
		.test("cities-validation", "cities Is not Valid", async (cities) => {
			if (!cities) return true;
			for (const city of cities)
				try {
					await CreateCityInputSchema.validate(city, { abortEarly: true });
					return true;
				} catch (error) {
					return false;
				}
		}),
});
export const UpdateCountryInputSchema = yup.object({ name: yup.string().notRequired() });
