// backend/models/User.js
//
//  Represents a platform user (advertiser, admin, or superAdmin).
//
//  Fields
//  ------
//    id            PK (auto)
//    email         STRING   UNIQUE   – login / contact
//    passwordHash  STRING            – bcrypt-hashed password
//    role          ENUM              – 'advertiser' | 'admin' | 'superAdmin'
//    phone         STRING   UNIQUE   – E.164 format
//    phoneVerified BOOLEAN  default false
//    verified      BOOLEAN  default false (email-verified, if you add it)
//    createdAt / updatedAt – timestamps managed by Sequelize
//
//  Associations
//  ------------
//    • User.hasMany(Ad)       (uploader)
//    • User.hasMany(Payment)  (payer)
//    • User.hasMany(PhoneToken)
//
//  ENV: none
//
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      email: {
        type:      DataTypes.STRING,
        allowNull: false,
        unique:    true,
        validate:  { isEmail: true }
      },
      passwordHash: {
        type:      DataTypes.STRING,
        allowNull: false
      },
      role: {
        type:         DataTypes.ENUM('advertiser', 'admin', 'superAdmin'),
        defaultValue: 'advertiser'
      },
      phone: {
        type:   DataTypes.STRING,
        unique: true
      },
      phoneVerified: {
        type:         DataTypes.BOOLEAN,
        defaultValue: false
      },
      verified: {
        type:         DataTypes.BOOLEAN,
        defaultValue: false
      }
    });
  
    // ---------- Associations ----------
    User.associate = models => {
      User.hasMany(models.Ad,        { foreignKey: 'uploaderId' });
      User.hasMany(models.Payment,   { foreignKey: 'userId'     });
      User.hasMany(models.PhoneToken,{ foreignKey: 'userId'     });
    };
  
    return User;
  };
  