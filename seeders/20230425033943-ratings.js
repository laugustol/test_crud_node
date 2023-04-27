"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("Ratings", [
            {
                post_id: 1,
                user_id: null,
                rating: "1"
            },
            {
                post_id: 1,
                user_id: 2,
                rating: "2"
            },
            {
                post_id: 2,
                user_id: null,
                rating: "2"
            },
            {
                post_id: 2,
                user_id: 1,
                rating: "3"
            },
            {
                post_id: 3,
                user_id: null,
                rating: "1"
            },
            {
                post_id: 3,
                user_id: null,
                rating: "5"
            }
        ]);
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete("Ratings", null, {});
    }
};
