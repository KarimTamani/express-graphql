import { ApolloError } from "apollo-server-express";
import { CreateCityInputSchema, UpdateCityInputSchema } from "../../schema/city";
const CityResolver = {
	Query: {
		getCitybyId: async (_, { id }, { models }) => {
			try {
				// type to find City by id
				const city = await models.City.findByPk(id, { include: [{ model: models.Country, as: "country" }] });
				// if not city found throw an error
				if (!city) {
					throw new Error(`City with this id : ${id} not Found !`);
				}
				// if we have a city return it to the client
				return city;
			} catch (error) {
				return new ApolloError(error.message);
			}
		},
		getCities: async (_, { }, { models }) => {
			try {
				// fetching all cities that match the filters ()
				return await models.City.findAll({ include: [{ model: models.Country, as: "country" }] });
			} catch (error) {
				return new ApolloError(error.message);
			}
		},
	},
	Mutation: {
		createCity: async (_, { createCityInput }, { models, connection }) => {
			const transaction = await connection.transaction(); // Start transaction
			try {
				// validate createCityInput using City schema before insert data to the database
				await Promise.all(
					createCityInput.map((city) => CreateCityInputSchema.validate(city, { abortEarly: true })),
				);
				// insert createCityInput to the database
				const cities = await models.City.bulkCreate(createCityInput, { transaction });
				await transaction.commit();
				// reload the new created record cities to match the expected output
				const reloadedCities = cities.map((city) => city.id);
				return await models.City.findAll({
					where: { id: reloadedCities },
					include: [{ model: models.Country, as: "country" }],
				});
			} catch (error) {
				await transaction.rollback();
				return new ApolloError(error.message);
			}
		},
		deleteCity: async (_, { id }, { models }) => {
			try {
				// try to find city by id if it's not found then raise an error
				const city = await models.City.findByPk(id);
				// if city not found raise an error
				if (!city) {
					throw new Error(`City with this id : ${id} not Found !`);
				}
				// delete the record city
				await city.destroy();
				// return the deleted record id
				return city.id;
			} catch (error) {
				return new ApolloError(error.message);
			}
		},
		updateCity: async (_, { id, updateCityInput }, { models }) => {
			try {
				// validate the updateCityInput before perfomring any updating
				await UpdateCityInputSchema.validate(updateCityInput, { abortEarly: true });
				// try to find city by id if it's not found then raise an error
				const city = await models.City.findByPk(id);
				// if city not found raise an error
				if (!city) {
					throw new Error(`City with this id : ${id} not Found !`);
				}
				if (updateCityInput.countryId) {
					// check if the foeign key countryId really exists in the countries table
					const country = await models.Country.findByPk(updateCityInput.countryId);
					if (!country) {
						throw new Error(`Country with this id : ${updateCityInput.countryId} not Found !`);
					}
				}
				await city.update(updateCityInput);
				return await city.reload({ include: [{ model: models.Country, as: "country" }] });
			} catch (error) {
				return new ApolloError(error.message);
			}
		},
	},
};
export default CityResolver;
