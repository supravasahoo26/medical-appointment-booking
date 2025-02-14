module.exports = (sequelize, DataTypes) => {
    const Appointment = sequelize.define('Appointment', {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      doctor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      appointment_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: 'Pending',
      },
    });
  
    return Appointment;
  };
  