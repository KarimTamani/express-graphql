import * as yup from "yup";
export const CreateCityInputSchema = yup.object({
	name: yup.string().required(),
	cityCode: yup.string().required(),
	countryId: yup.number().notRequired(),
});
export const UpdateCityInputSchema = yup.object({
	name: yup.string().notRequired(),
	cityCode: yup.string().notRequired(),
	countryId: yup.number().notRequired(),
});
