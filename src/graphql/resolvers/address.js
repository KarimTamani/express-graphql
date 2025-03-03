import { ApolloError } from "apollo-server-express";
import { CreateAddressSchema, UpdateAddressInputSchema } from "../../schema/address";

const AddressResolver = {
	Query: {
		getAddresses: async (_, {}, { models }) => {
			try {
				// fetching all addresses that match the filters ()
				return await models.Address.findAll({
					include: [{ model: models.City, as: "city", include: [{ model: models.Country, as: "country" }] }],
				});
			} catch (error) {
				return new ApolloError(error.message);
			}
		},
		getAddressbyId: async (_, { id }, { models }) => {
			try {
				// type to find Address by id
				const address = await models.Address.findByPk(id, {
					include: [{ model: models.City, as: "city", include: [{ model: models.Country, as: "country" }] }],
				});
				// if not address found throw an error
				if (!address) {
					throw new Error(`Address with this id : ${id} not Found !`);
				}
				// if we have a address return it to the client
				return address;
			} catch (error) {
				return new ApolloError(error.message);
			}
		},
	},
	Mutation: {
		deleteAddress: async (_, { id }, { models }) => {
			try {
				// try to find address by id if it's not found then raise an error
				const address = await models.Address.findByPk(id);
				// if address not found raise an error
				if (!address) {
					throw new Error(`Address with this id : ${id} not Found !`);
				}
				// delete the record address
				await address.destroy();
				// return the deleted record id
				return address.id;
			} catch (error) {
				return new ApolloError(error.message);
			}
		},
		createAddress: async (_, { createAddress }, { models }) => {
			try {
				// validate createAddress using Address schema before insert data to the database
				await CreateAddressSchema.validate(createAddress, { abortEarly: true });
				// check if the foeign key userId really exists in the users table
				const user = await models.User.findByPk(createAddress.userId);
				if (!user) {
					throw new Error(`User with this id : ${createAddress.userId} not Found !`);
				}
				// check if the foeign key cityId really exists in the cities table
				const city = await models.City.findByPk(createAddress.cityId);
				if (!city) {
					throw new Error(`City with this id : ${createAddress.cityId} not Found !`);
				}
				// insert createAddress to the database
				const address = await models.Address.create(createAddress);
				// reload the new created record address to match the expected output
				return await address.reload({
					include: [{ model: models.City, as: "city", include: [{ model: models.Country, as: "country" }] }],
				});
			} catch (error) {
				return new ApolloError(error.message);
			}
		},
		updateAddress: async (_, { id, updateAddressInput }, { models }) => {
			try {
				// validate the updateAddressInput before perfomring any updating
				await UpdateAddressInputSchema.validate(updateAddressInput, { abortEarly: true });
				// try to find address by id if it's not found then raise an error
				const address = await models.Address.findByPk(id);
				// if address not found raise an error
				if (!address) {
					throw new Error(`Address with this id : ${id} not Found !`);
				}
				// check if the foeign key userId really exists in the users table
				const user = await models.User.findByPk(updateAddressInput.userId);
				if (!user) {
					throw new Error(`User with this id : ${updateAddressInput.userId} not Found !`);
				}
				// check if the foeign key cityId really exists in the cities table
				const city = await models.City.findByPk(updateAddressInput.cityId);
				if (!city) {
					throw new Error(`City with this id : ${updateAddressInput.cityId} not Found !`);
				}
				await address.update(updateAddressInput);
				return await address.reload({
					include: [{ model: models.City, as: "city", include: [{ model: models.Country, as: "country" }] }],
				});
			} catch (error) {
				return new ApolloError(error.message);
			}
		},
	},
};
export default AddressResolver;
