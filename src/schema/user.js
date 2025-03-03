import * as yup from "yup";
import { CreateAddressSchema, UpdateAddressInputSchema } from "./address";
import { CreateInterestInputSchema } from "./interest";
import { CreateUserInterestsInputSchema } from "./userInterest";
export const CreateUserInputSchema = yup.object({
	name: yup.string().required().min(3).max(56),
	lastname: yup
		.string()
		.required()
		.matches(/^[a-zA-Z ]+$/, "Invalid lastname Format")
		.min(3)
		.max(56),
	bio: yup.string().notRequired(),
	birthday: yup.date().required(),
	age: yup.number().notRequired().nullable().min(18).max(99),
	email: yup.string().email("Invalid email format").required().min(3).max(255),
	password: yup.string().required(),
	phoneNumber: yup
		.string()
		.notRequired()
		.matches(/^\+?[1-9]\d{1,14}$/, "Invalid phoneNumber Format"),
	status: yup.string().required().nullable().oneOf(["developer", "user", "manager", "admin"]),
	userInterests: yup
		.array()
		.notRequired()
		.nullable()
		.test("userInterests-validation", "userInterests Is not Valid", async (userInterests) => {
			if (!userInterests) return true;
			for (const userinterests of userInterests)
				try {
					await CreateUserInterestsInputSchema.validate(userinterests, { abortEarly: true });
					return true;
				} catch (error) {
					return false;
				}
		}),
	address: yup
		.object()
		.notRequired()
		.nullable()
		.test("address-validation", "address Is not Valid", async (address) => {
			if (!address) return true;
			try {
				await CreateAddressSchema.validate(address, { abortEarly: true });
				return true;
			} catch (error) {
				return false;
			}
		}),
	interests: yup
		.array()
		.notRequired()
		.nullable()
		.test("interests-validation", "interests Is not Valid", async (interests) => {
			if (!interests) return true;
			for (const interest of interests)
				try {
					await CreateInterestInputSchema.validate(interest, { abortEarly: true });
					return true;
				} catch (error) {
					return false;
				}
		}),
});
export const UpdateUserInputSchema = yup.object({
	name: yup.string().notRequired().min(3).max(56),
	lastname: yup.string().notRequired().matches(/^[a-zA-Z ]+$/, "Invalid lastname Format").min(3).max(56),
	bio: yup.string().notRequired(),
	birthday: yup.date().notRequired(),
	age: yup.number().notRequired().nullable().min(18).max(99),
	score: yup.number().notRequired().nullable(),
	rating: yup.number().notRequired().nullable(),
	email: yup.string().email("Invalid email format").notRequired().min(3).max(255),
	password: yup.string().notRequired(),
	phoneNumber: yup
		.string()
		.notRequired()
		.matches(/^\+?[1-9]\d{1,14}$/, "Invalid phoneNumber Format"),
	status: yup.string().notRequired().nullable().oneOf(["developer", "user", "manager", "admin"]),
	isActive: yup.boolean().notRequired().nullable(),
	address: yup
		.object()
		.notRequired()
		.nullable()
		.test("address-validation", "address Is not Valid", async (address) => {
			if (!address) return true;
			try {
				await UpdateAddressInputSchema.validate(address, { abortEarly: true });
				return true;
			} catch (error) {
				return false;
			}
		}),
});
