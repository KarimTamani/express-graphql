import { ApolloError } from "apollo-server-express";
import { CreateCountryInputSchema, UpdateCountryInputSchema } from "../../schema/country";


const CountryResolver = {
	Query: {
		getCountrybyId: async (_, { id }, { models }) => {
			try {
				// type to find Country by id
				const country = await models.Country.findByPk(id);
				// if not country found throw an error
				if (!country) {
					throw new Error(`Country with this id : ${id} not Found !`);
				}
				// if we have a country return it to the client
				return country;
			} catch (error) {
				return new ApolloError(error.message);
			}
		},
		getCountries: async (_, {}, { models }) => {
			try {
				// fetching all countries that match the filters ()
				return await models.Country.findAll({});
			} catch (error) {
				return new ApolloError(error.message);
			}
		},
	},
	Mutation: {
		deleteCountry: async (_, { id }, { models }) => {
			try {
				// try to find country by id if it's not found then raise an error
				const country = await models.Country.findByPk(id);
				// if country not found raise an error
				if (!country) {
					throw new Error(`Country with this id : ${id} not Found !`);
				}
				// delete the record country
				await country.destroy();
				// return the deleted record id
				return country.id;
			} catch (error) {
				return new ApolloError(error.message);
			}
		},
		createCountry: async (_, { createCountryInput }, { models, connection }) => {
			const transaction = await connection.transaction(); // Start transaction
			try {
				// validate createCountryInput using Country schema before insert data to the database
				await Promise.all(
					createCountryInput.map((country) =>
						CreateCountryInputSchema.validate(country, { abortEarly: true }),
					),
				);
				// insert createCountryInput to the database
				const countries = await models.Country.bulkCreate(createCountryInput, {
					include: [{ model: models.City, as: "cities" }],
					transaction,
				});
				await transaction.commit();
				// reload the new created record countries to match the expected output
				const reloadedCountries = countries.map((country) => country.id);
				return await models.Country.findAll({ where: { id: reloadedCountries } });
			} catch (error) {
				await transaction.rollback();
				return new ApolloError(error.message);
			}
		},
		updateCountry: async (_, { id, updateCountryInput }, { models }) => {
			try {
				// validate the updateCountryInput before perfomring any updating
				await UpdateCountryInputSchema.validate(updateCountryInput, { abortEarly: true });
				// try to find country by id if it's not found then raise an error
				const country = await models.Country.findByPk(id);
				// if country not found raise an error
				if (!country) {
					throw new Error(`Country with this id : ${id} not Found !`);
				}
				await country.update(updateCountryInput);
				return await country.reload();
			} catch (error) {
				return new ApolloError(error.message);
			}
		},
	},
};
export default CountryResolver;
