import * as yup from "yup";
export const CreateInterestInputSchema = yup.object({ label: yup.string().required().min(3).max(255) });
export const UpdateInterestInputSchema = yup.object({ label: yup.string().notRequired().min(3).max(255) });
