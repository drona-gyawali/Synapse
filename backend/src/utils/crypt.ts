import { hash, genSalt, compare } from 'bcrypt-ts';

export const hashPassword = async (password: string): Promise<string> => {
  try {
    const salt = await genSalt(10);
    const hashed = await hash(password, salt);
    return hashed;
  } catch (error) {
    throw Error(`Error Occured in hashing | detail=${error}`);
  }
};

export const comparePassword = async (
  password: string,
  hashPassowrd: string
): Promise<boolean> => {
  try {
    const isValid = await compare(password, hashPassowrd);
    return isValid;
  } catch (error) {
    throw Error(`Error Occured in hashing | detail=${error}`);
  }
};
