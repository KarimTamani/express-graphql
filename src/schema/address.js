import * as yup from "yup";
export const CreateAddressSchema = yup.object({
	street: yup.string().required(),
	latit: yup.number().notRequired(),
	longt: yup.number().notRequired(),
	userId: yup.string().notRequired(),
	cityId: yup.string().notRequired(),
});
export const UpdateAddressInputSchema = yup.object({
	street: yup.string().notRequired(),
	latit: yup.number().notRequired(),
	longt: yup.number().notRequired(),
	userId: yup.string().notRequired(),
	cityId: yup.string().notRequired(),
});
