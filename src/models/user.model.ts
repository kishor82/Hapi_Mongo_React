import bcrypt from 'bcryptjs';
import { Mongoose, Schema } from 'mongoose';

const makeUserModelConnetion = ({ dbConnection }: { dbConnection: Mongoose }) => {
  try {
    return dbConnection.model('User');
  } catch (e) {
    const userSchema: Schema = new Schema(
      {
        name: { type: String, trim: true, required: true },
        email: { type: String, trim: true, required: true, unique: true },
        password: { type: String, trim: true, required: true },
        isAdmin: { type: Boolean, required: true, default: false },
      },
      { timestamps: true }
    );

    userSchema.methods.matchPassword = async function (enteredPassword: string) {
      return await bcrypt.compare(enteredPassword, this.password as unknown as string);
    };

    /**
     * @middleware
     * Hash password before saving
     */
    userSchema.pre<any>('save', async function (next: Function) {
      if (!this.isModified('password')) {
        next();
      }
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    });
    return dbConnection.model('User', userSchema);
  }
};

export default makeUserModelConnetion;
