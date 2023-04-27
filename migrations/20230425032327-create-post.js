"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Posts", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            user_id: {
                type: Sequelize.INTEGER,
                references: { model: "users", key: "id" }
            },

            title: {
                type: Sequelize.STRING
            },
            description: {
                type: Sequelize.TEXT
            },
            status: { type: Sequelize.INTEGER, defaultValue: 1 },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal("NOW()")
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal("NOW()")
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Posts");
    }
};
