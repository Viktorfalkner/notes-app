'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getErrorMessage } from "@/lib/utils";

import { createClient } from '@/utils/supabase/server'


export const loginAction = async (formData: FormData) => {
    try {
      const supabase = createClient()
  
      const formDataObj = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      }
    
      const { data, error: loginError } = await supabase.auth.signInWithPassword(formDataObj)      
  
  
      if (loginError) throw loginError;
      if (!data.session) throw new Error("No session");
  
      return { errorMessage: null };
    } catch (error) {
      return { errorMessage: getErrorMessage(error) };
    }
  };

  export const createAccountAction = async (formData: FormData) => {
    try {
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
  
      const supabase = createClient()
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
  
      const { data, error: loginError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });
  
  
      if (loginError) throw loginError;
      if (!data.session) throw new Error("No session");
  
      return { errorMessage: null };
    } catch (error) {
      return { errorMessage: getErrorMessage(error) };
    }
  };

export const logoutAction = async () => {
    try {
      const supabase = createClient()
  
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
  
      return { errorMessage: null };
    } catch (error) {
      return { errorMessage: getErrorMessage(error) };
    }
  };