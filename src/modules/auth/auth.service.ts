import { prisma } from "../../lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const SALT_ROUNDS = 10;

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined');
}

if (!process.env.JWT_EXPIRES_IN) {
  throw new Error('JWT_EXPIRES_IN is not defined');
}


export const registerUser = async (username: string, email: string, password: string) => {
    // Check if user with the same email or username already exists
    const existingUser = await prisma.user.findFirst({ 
        where: { 
            OR: [{ email }, { username }] 
        } 
    });

    if(existingUser){
        throw new Error("User with this email or username already exists");
    }

    // Hash the password
    const passwordHashString = await bcrypt.hash(password, SALT_ROUNDS);

    // Create the user
    const user = await prisma.user.create({
        data: {
            username,
            email,
            passwordHash: passwordHashString
        }
    });
    const { passwordHash, ...safeUser } = user;
    return safeUser;
};

export const loginUser = async (email: string, password: string) => {
    // Find the user by email
    const user = await prisma.user.findUnique({ where: { email } });

    if(!user){
        throw new Error("Invalid credentials");
    };
    // Check if the password is correct
    const valid = await bcrypt.compare(password, user.passwordHash);

    if(!valid){
        throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET!,
        { expiresIn: process.env.JWT_EXPIRES_IN! as any}
    );
    const { passwordHash, ...safeUser } = user;
    return { safeUser, token };
}