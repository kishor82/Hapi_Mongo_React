const makeUserModelConnetion = ({ dbConnection }: any) => {
  try {
    return dbConnection.model('User');
  } catch (e) {
    const userSchema = dbConnection.Schema(
      {
        name: { type: String, trim: true, required: true },
        email: { type: String, trim: true, required: true, unique: true },
        password: { type: String, trim: true, required: true },
        isAdmin: { type: Boolean, required: true, default: false },
      },
      { timestamps: true }
    );
    return dbConnection.model('User', userSchema);
  }
};

export default makeUserModelConnetion;
