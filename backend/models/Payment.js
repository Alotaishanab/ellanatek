// backend/models/Payment.js
//
//  Persists every Stripe PaymentIntent we create.
//
//  Fields
//  ------
//    id        PK
//    amount    INT     (cents)
//    currency  TEXT    (usd, sar, etc.)
//    intentId  TEXT    UNIQUE (Stripe payment_intent ID)
//    status    TEXT    (requires_payment_method | succeeded | canceled ...)
//    userId    FK → User.id
//    bookingId FK → Booking.id  (optional)
//    createdAt DATETIME
//    updatedAt DATETIME
//
//  Associations
//    Payment.belongsTo(User)
//    Payment.belongsTo(Booking)
//
module.exports = (sequelize, DataTypes) => {
    const Payment = sequelize.define('Payment', {
      amount:    DataTypes.INTEGER,
      currency:  { type: DataTypes.STRING, defaultValue: 'usd' },
      intentId:  { type: DataTypes.STRING, unique: true },
      status:    DataTypes.STRING
    });
  
    Payment.associate = models => {
      Payment.belongsTo(models.User,    { foreignKey: 'userId' });
      Payment.belongsTo(models.Booking, { foreignKey: 'bookingId' });
    };
  
    return Payment;
  };
  