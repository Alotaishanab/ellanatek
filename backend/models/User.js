// Represents a platform user (advertiser, admin, or superAdmin).

// Fields
// ------
// id PK (auto)
// firstName STRING – user's first name
// lastName STRING – user's last name  
// email STRING UNIQUE – login / contact
// passwordHash STRING – bcrypt-hashed password
// role ENUM – 'advertiser' | 'admin' | 'superAdmin'
// phone STRING UNIQUE – E.164 format
// phoneVerified BOOLEAN default false
// verified BOOLEAN default false (email-verified, if you add it)
// termsAccepted BOOLEAN default false – terms and conditions agreement
// privacyAccepted BOOLEAN default false – privacy policy agreement
// termsAcceptedAt DATETIME – when terms were accepted
// privacyAcceptedAt DATETIME – when privacy policy was accepted
// createdAt / updatedAt – timestamps managed by Sequelize

// Associations
// ------------
// • User.hasMany(Ad) (uploader)
// • User.hasMany(Payment) (payer)
// • User.hasMany(PhoneToken)

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 50]
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 50]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true }
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('advertiser', 'admin', 'superAdmin'),
      defaultValue: 'advertiser'
    },
    phone: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isPhoneNumber(value) {
          if (value && !value.match(/^\+[1-9]\d{1,14}$/)) {
            throw new Error('Phone must be in E.164 format (e.g., +966512345678)');
          }
        }
      }
    },
    phoneVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    termsAccepted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    privacyAccepted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    termsAcceptedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    privacyAcceptedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  });

  // Associations
  User.associate = models => {
    User.hasMany(models.Ad, { foreignKey: 'uploaderId' });
    User.hasMany(models.Payment, { foreignKey: 'userId' });
    User.hasMany(models.PhoneToken, { foreignKey: 'userId' });
  };

  // Instance Methods
  User.prototype.toJSON = function() {
    const values = Object.assign({}, this.get());
    delete values.passwordHash; // Never send password hash to frontend
    return values;
  };

  return User;
};
