import { ApolloError } from "apollo-server-express";
import { CreateUserInputSchema, UpdateUserInputSchema } from "../../schema/user";
import saveFile  from "../../helpers/saveFile" ; 
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
						{ model: models.UserInterests, as: "userInterests" },
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
		getUserById: async (_, { id }, { models }) => {
			try {
				// type to find User by id
				const user = await models.User.findByPk(id, {
					include: [
						{ model: models.UserInterests, as: "userInterests" },
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

				createUserInput.profilePicture = await saveFile (createUserInput.profilePicture , "uploads/users/profile-picture" )

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
						{ model: models.UserInterests, as: "userInterests" },
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
				return new ApolloError(error);
			}
		},
		updateUser: async (_, { id, updateUserInput, email }, { models, connection }) => {
			const transaction = await connection.transaction(); // Start transaction
			try {
				// validate the updateUserInput before perfomring any updating
				await UpdateUserInputSchema.validate(updateUserInput, { abortEarly: true });
				// since some of the filters are not required like (id,email) we have to check first if they are provided by the user
				let domain = {};
				if (id) {
					// add id to the domain
					domain = { id };
				}
				// add email to the domain
				if (email) {
					domain = { ...domain, email };
				}
				// try to find user by id,email if it's not found then raise an error
				const user = await models.User.findOne({ where: { ...domain } });
				// if user not found raise an error
				if (!user) {
					throw new Error(`User with this id : ${id} not Found !`);
				}
				if (Array.isArray(updateUserInput.userInterests) && updateUserInput.userInterests.length > 0) {
					// create new UserInterests for the user
					for (const userInterests of updateUserInput.userInterests) {
						await user.createUserInterest(userInterests, { transaction });
					}
				}
				if (updateUserInput.address) {
					const oldAddress = await user.getAddress({ transaction });
					// update or create address
					if (oldAddress) {
						const address = updateUserInput.address;
						await oldAddress.update(address, { transaction });
					} else {
						await user.createAddress(updateUserInput.address, { transaction });
					}
				}
				if (Array.isArray(updateUserInput.interests) && updateUserInput.interests.length > 0) {
					// loop over interests , create new Interest and attach it to the user
					for (const newInterest of updateUserInput.interests) {
						await user.createInterest(newInterest, { transaction });
					}
				}
				await user.update(updateUserInput, { transaction });
				await transaction.commit();
				return await user.reload({
					include: [
						{ model: models.UserInterests, as: "userInterests" },
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
