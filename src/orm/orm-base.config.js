// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
const csv = require('csvtojson');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { DataTypes } = require('sequelize');

const FactoryFilePath = 'src/orm/factories';
const CsvOption = {
  ignoreEmpty: true,
  trim: true,
  checkType: true,
};

module.exports = {
  AUDIT_COLUMN: {
    deleted_at: DataTypes.DATE,
    created_at: { type: DataTypes.DATE, allowNull: false },
    updated_at: { type: DataTypes.DATE, allowNull: false },
    created_by: DataTypes.BIGINT,
    updated_by: DataTypes.BIGINT,
  },

  async readFactoryFile(filename) {
    return csv(CsvOption).fromFile(
      path.join(FactoryFilePath, `${filename}.factory.csv`),
    );
  },
};
