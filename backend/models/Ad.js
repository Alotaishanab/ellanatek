// backend/models/Ad.js
//
//  Sequelize model for Ads
//
//  Fields
//  -------
//    id            – PK (auto)
//    uploaderId    – FK → User.id
//    filename      – local file name under public/ads/
//    url           – absolute URL served to player boxes
//    duration      – seconds (int)
//    status        – ENUM: 'pending' | 'approved' | 'rejected'
//    active        – 1 (true) = eligible for booking / playback
//    rejectionReason – text, optional
//    approvedBy      – FK → User.id (admin who approved)
//    createdAt / updatedAt – timestamps (managed by Sequelize)
//
//  Associations
//  ------------
//    Ad.belongsTo(User,  { foreignKey: 'uploaderId' });
//    Ad.hasMany (Booking);
//
//  No extra ENV keys required for this file.
//

module.exports = (sequelize, DataTypes) => {
    const Ad = sequelize.define('Ad', {
      filename:       DataTypes.STRING,
      url:            DataTypes.STRING,
      duration:       DataTypes.INTEGER,
      status:         {
        type: DataTypes.ENUM('pending', 'approved', 'rejected'),
        defaultValue: 'pending'
      },
      active:         {                     // 1 = live, 0 = paused
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      rejectionReason: DataTypes.STRING,
      approvedBy:      DataTypes.INTEGER
    });
  
    Ad.associate = models => {
      Ad.belongsTo(models.User,   { foreignKey: 'uploaderId' });
      Ad.hasMany   (models.Booking);
    };
  
    return Ad;
  };
  