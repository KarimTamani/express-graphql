import { ApolloError } from "apollo-server-express";
import { CreateInterestInputSchema, UpdateInterestInputSchema } from "../../schema/interest";
const InterestResolver = {
	Query: {
		getInterestbyId: async (_, { id }, { models }) => {
			try {
				// type to find Interest by id
				const interest = await models.Interest.findByPk(id);
				// if not interest found throw an error
				if (!interest) {
					throw new Error(`Interest with this id : ${id} not Found !`);
				}
				// if we have a interest return it to the client
				return interest;
			} catch (error) {
				return new ApolloError(error.message);
			}
		},
		getInterests: async (_, {}, { models }) => {
			try {
				// fetching all interests that match the filters ()
				return await models.Interest.findAll({});
			} catch (error) {
				return new ApolloError(error.message);
			}
		},
	},
	Mutation: {
        deleteInterest: async (_, { id }, { models, connection }) => {
			const transaction = await connection.transaction(); // Start transaction
			try {
				// first fetch interests to delete
				const interestsToDelete = await models.Interest.findAll({ where: { id } });
				const deletedIds = interestsToDelete.map((interest) => interest.id); // Extract IDs
				// delete the interests
				await models.Interest.destroy({ where: { id: deletedIds }, transaction });
				// commit delete transaction
				await transaction.commit();
				// return the deleted ids
				return deletedIds;
			} catch (error) {
				await transaction.rollback();
				return new ApolloError(error.message);
			}
		},
		createInterest: async (_, { createInterestInput }, { models, connection }) => {
			const transaction = await connection.transaction(); // Start transaction
			try {
				// validate createInterestInput using Interest schema before insert data to the database
				await Promise.all(
					createInterestInput.map((interest) =>
						CreateInterestInputSchema.validate(interest, { abortEarly: true }),
					),
				);
				// insert createInterestInput to the database and return it output
				const interests = await models.Interest.bulkCreate(createInterestInput, { transaction });
				await transaction.commit();
				return interests;
			} catch (error) {
				await transaction.rollback();
				return new ApolloError(error.message);
			}
		},
		updateInterest: async (_, { updateInterestInput, id }, { models }) => {
			try {
				// validate the updateInterestInput before perfomring any updating
				await UpdateInterestInputSchema.validate(updateInterestInput, { abortEarly: true });
				// try to find interest by id if it's not found then raise an error
				const interest = await models.Interest.findByPk(id);
				// if interest not found raise an error
				if (!interest) {
					throw new Error(`Interest with this id : ${id} not Found !`);
				}
				await interest.update(updateInterestInput);
				return await interest.reload();
			} catch (error) {
				return new ApolloError(error.message);
			}
		},
	},
};
export default InterestResolver;
