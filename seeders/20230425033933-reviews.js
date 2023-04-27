"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("Reviews", [
            {
                post_id: 1,
                user_id: null,
                comment: "Comentario 1"
            },
            {
                post_id: 1,
                user_id: 2,
                comment: "Comentario 2"
            },
            {
                post_id: 2,
                user_id: null,
                comment: "Comentario 3"
            },
            {
                post_id: 2,
                user_id: 1,
                comment: "Comentario 4"
            },
            {
                post_id: 3,
                user_id: null,
                comment: "Comentario 5"
            },
            {
                post_id: 3,
                user_id: null,
                comment: "Comentario 6"
            }
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Reviews", null, {});
    }
};
