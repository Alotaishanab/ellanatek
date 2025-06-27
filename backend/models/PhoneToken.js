// backend/models/PhoneToken.js
//
//  Stores one-time SMS verification codes.
//
//  Fields
//  ------
//    id        PK
//    userId    FK → User.id
//    code      STRING(6)
//    expiresAt DATETIME
//    used      BOOLEAN default false
//
module.exports = (sequelize, DataTypes) => {
    const PhoneToken = sequelize.define('PhoneToken', {
      code:      DataTypes.STRING(6),
      expiresAt: DataTypes.DATE,
      used:      { type: DataTypes.BOOLEAN, defaultValue: false }
    });
  
    PhoneToken.associate = models => {
      PhoneToken.belongsTo(models.User, { foreignKey: 'userId' });
    };
  
    return PhoneToken;
  };
  