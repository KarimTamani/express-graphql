import { ApolloError } from "apollo-server-express";
import { Op } from "sequelize";




const CategoryResolver = {

    Query: {
        getCategoryById: async (_, { id }, { models }) => {
            try {
                const category = await models.Category.findByPk(id);

                if (!category)
                    throw Error("Category Not found!");

                return category;

            } catch (error) {
                return new ApolloError(error.message);
            }
        } , 

        getAllCategories  : async( _ , { keyword } , { models}) => {
            try {
                return await models.Category.findAll({
                    where : {
                        name : {
                            [Op.like] : `%${keyword}%`
                        }
                    }
                }) ; 
            }catch(error) { 
                return new ApolloError(error.message) ; 
            }
        }
    },

    Mutation: {
        createCategory: async (_, { input }, { models }) => {
            try {
                return await models.Category.create(input);
            } catch (error) {
                return new ApolloError(error.message);
            }
        } , 
        updateCategory: async (_, { id , input }, { models }) => {
            try {
   
                const category = await models.Category.findByPk(id ) ; 

                if ( !category ) 
                    throw Error ( "Category not found !") ; 

                return await category.update(input)                


            } catch (error) {
                return new ApolloError(error.message);
            }
        } , 
        deleteCategory: async (_, { id  }, { models }) => {
            try {
                const category = await models.Category.findByPk(id ) ; 

                if ( !category ) 
                    throw Error ( "Category not found !") ; 
               
                await category.destroy() ; 

                return id ; 
            } catch (error) {
                return new ApolloError(error.message);
            }
        }
    }
}


export default CategoryResolver; 