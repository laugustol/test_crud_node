"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("Users", [
            {
                first_name: "Augusto",
                last_name: "Alvarez",
                email: "augustoalvarez05@gmail.com",
                password:
                    "$2a$05$nt1q0CWflLmexUWnxuZh.uURvtzgMrAffkhaMVm0ddwYVUanYzZni", //1234
                permission: "ADMIN"
            },
            {
                first_name: "Joe",
                last_name: "Doe",
                email: "joedoe@gmail.com",
                password:
                    "$2a$05$nt1q0CWflLmexUWnxuZh.uURvtzgMrAffkhaMVm0ddwYVUanYzZni", //1234
                permission: "SUPERVISOR"
            }
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Users", null, {});
    }
};
