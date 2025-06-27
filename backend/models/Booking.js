// backend/models/Booking.js
//
//  A booking reserves a time-window on a specific motorbike for a given Ad.
//  New column **paid** indicates whether the booking has been paid via Stripe.
//
//  Fields
//  ------
//    id           PK
//    motorbikeId  string   (box ID)
//    adId         FK → Ad.id
//    startTime    datetime
//    endTime      datetime
//    volume       int (0-100)  default 80
//    brightness   int (0-100)  default 100
//    paid         boolean      default false (0)
//
//  Associations
//    Booking.belongsTo(Ad)
//
//  ENV: none
//
module.exports = (sequelize, DataTypes) => {
    const Booking = sequelize.define('Booking', {
      motorbikeId: DataTypes.STRING,
      adId:        DataTypes.INTEGER,
      startTime:   DataTypes.DATE,
      endTime:     DataTypes.DATE,
      volume:      { type: DataTypes.INTEGER, defaultValue: 80 },
      brightness:  { type: DataTypes.INTEGER, defaultValue: 100 },
      paid:        { type: DataTypes.BOOLEAN, defaultValue: false }
    });
  
    Booking.associate = models => {
      Booking.belongsTo(models.Ad, { foreignKey: 'adId' });
    };
  
    return Booking;
  };
  