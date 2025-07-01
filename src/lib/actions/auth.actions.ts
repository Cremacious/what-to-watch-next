'use server';

import { z } from 'zod';
import {
  signUpFormSchema,
  signInFormSchema,
} from '../validators/auth.validator';
import { signUp, signIn } from '../auth-client';

export const signUpAction = async (data: z.infer<typeof signUpFormSchema>) => {
  try {
    const user = signUpFormSchema.parse(data);
    await signUp.email({
      email: user.email,
      name: user.username,
      password: user.password,
    });

    console.log('Signing up with data:', data);
    return { success: true, message: 'Sign up successful!' };
  } catch (error) {
    console.error('Sign up error:', error);
    return { success: false, message: 'Sign up failed. Please try again.' };
  }
};

export const signInAction = async (data: z.infer<typeof signInFormSchema>) => {
  try {
    const user = signInFormSchema.parse(data);
    await signIn.email({
      email: user.email,
      password: user.password,
    });
    return { success: true, message: 'Sign in successful!' };
  } catch (error) {
    console.error('Sign in error:', error);
    return { success: false, message: 'Sign in failed. Please try again.' };
  }
};
