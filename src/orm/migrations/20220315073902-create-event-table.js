// eslint-disable-next-line @typescript-eslint/no-var-requires
const { AUDIT_COLUMN } = require('../orm-base.config');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('events', {
      event_id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      event_name: { type: Sequelize.STRING(160), allowNull: false },
      start_time: { type: Sequelize.DATE },
      duration: { type: Sequelize.FLOAT },
      ...AUDIT_COLUMN,
    });

    await queryInterface.addIndex('events', ['created_by']);
    await queryInterface.addIndex('events', ['updated_by']);
    await queryInterface.sequelize.query(
      'ALTER SEQUENCE events_event_id_seq RESTART WITH 1000',
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('events');
  },
};
