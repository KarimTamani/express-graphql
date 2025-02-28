import { ApolloError } from "apollo-server-express";
import { CreateUserInputSchema, UpdateUserInputSchema } from "../../schema/user";
const UserResolver = {
	Query: {
		getUsers: async (_, { isActive, name, status }, { models }) => {
			try {
				// since some of the filters are not required like (name,status,isActive) we have to check first if they are provided by the user
				let domain = {};
				if (name) {
					// add name to the domain
					domain = { name };
				}
				// add status to the domain
				if (status) {
					domain = { ...domain, status };
				}
				// add isActive to the domain
				if (isActive) {
					domain = { ...domain, isActive };
				}
				// fetching all users that match the filters (isActive,name,status)
				return await models.User.findAll({
					where: { ...domain },
					include: [
						{
							model: models.Address,
							as: "address",
							include: [
								{ model: models.City, as: "city", include: [{ model: models.Country, as: "country" }] },
							],
						},
						{ model: models.Interest, as: "interests" },
					],
				});
			} catch (error) {
				return new ApolloError(error.message);
			}
		},
		getUserByEmail: async (_, { id }, { models }) => {
			try {
				// type to find User by id
				const user = await models.User.findByPk(id, {
					include: [
						{
							model: models.Address,
							as: "address",
							include: [
								{ model: models.City, as: "city", include: [{ model: models.Country, as: "country" }] },
							],
						},
						{ model: models.Interest, as: "interests" },
					],
				});
				// if not user found throw an error
				if (!user) {
					throw new Error(`User with this id : ${id} not Found !`);
				}
				// if we have a user return it to the client
				return user;
			} catch (error) {
				return new ApolloError(error.message);
			}
		},
	},
	Mutation: {
		createUser: async (_, { createUserInput }, { models, connection }) => {
			const transaction = await connection.transaction(); // Start transaction
			try {
				// validate createUserInput using User schema before insert data to the database
				await CreateUserInputSchema.validate(createUserInput, { abortEarly: true });
				// insert createUserInput to the database
				const user = await models.User.create(createUserInput, {
					include: [
						{ model: models.UserInterests, as: "userInterests" },
						{ model: models.Address, as: "address" },
						{ model: models.Interest, as: "interests" },
					],
					transaction,
				});
				await transaction.commit();
				// reload the new created record user to match the expected output
				return await user.reload({
					include: [
						{
							model: models.Address,
							as: "address",
							include: [
								{ model: models.City, as: "city", include: [{ model: models.Country, as: "country" }] },
							],
						},
						{ model: models.Interest, as: "interests" },
					],
				});
			} catch (error) {
				await transaction.rollback();
				return new ApolloError(error.message);
			}
		},
		updateUser: async (_, { updateUserInput, id }, { models, connection }) => {
			const transaction = await connection.transaction(); // Start transaction
			try {
				// validate the updateUserInput before perfomring any updating
				await UpdateUserInputSchema.validate(updateUserInput, { abortEarly: true });
				// try to find user by id if it's not found then raise an error
				const user = await models.User.findByPk(id);
				// if user not found raise an error
				if (!user) {
					throw new Error(`User with this id : ${id} not Found !`);
				}
				// create new UserInterests for the user
				await user.createUserInterests(updateUserInput.userInterests);
				// create new Addresses for the user
				await user.createAddresses(updateUserInput.address);
				// loop over interests , create new Interest and attach it to the user
				for (const newInterest of updateUserInput.interests) {
					await user.createInterest(newInterest);
				}
				await user.update(updateUserInput);
				return await user.reload({
					include: [
						{
							model: models.Address,
							as: "address",
							include: [
								{ model: models.City, as: "city", include: [{ model: models.Country, as: "country" }] },
							],
						},
						{ model: models.Interest, as: "interests" },
					],
				});
			} catch (error) {
				await transaction.rollback();
				return new ApolloError(error.message);
			}
		},
		deleteUser: async (_, { id }, { models }) => {
			try {
				// try to find user by id if it's not found then raise an error
				const user = await models.User.findByPk(id);
				// if user not found raise an error
				if (!user) {
					throw new Error(`User with this id : ${id} not Found !`);
				}
				// delete the record user
				await user.destroy();
				// return the deleted record id
				return user.id;
			} catch (error) {
				return new ApolloError(error.message);
			}
		},
	},
};
export default UserResolver;
