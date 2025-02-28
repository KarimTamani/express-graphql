import * as yup from "yup";
export const CreateUserInterestsInputSchema = yup.object({
	userId: yup.string().notRequired(),
	interestId: yup.number().notRequired(),
});
export const UpdateUserInterestsInputSchema = yup.object({
	userId: yup.string().notRequired(),
	interestId: yup.number().notRequired(),
});
