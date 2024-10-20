import { cookies } from 'next/headers';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { redirect } from 'next/navigation';
import { getErrorMessage } from "@/lib/utils";

export const getUser = async () => {
   const auth = getSupabaseAuth();
   const user = (await auth.getUser()).data.user;
  
   if(!user) redirect("/login");

   return user;
}

export const getSupabaseAuth = () => {
   const cookieStore = cookies();

   const supabaseClient = createServerClient(
       process.env.SUPABASE_URL!,
       process.env.SUPABASE_ANON_KEY!,
       {
           cookies: {
               get(name: string) {
                   return cookieStore.get(name)?.value;
               },
               set(name: string, value: string, options: CookieOptions) {
                   try {
                       cookieStore.set({name, value, ...options})
                   } catch (error) {
                    getErrorMessage(error)
                    
                   }
               },
               remove (name: string, options: CookieOptions) {
                   try {
                       cookieStore.set({name, value: "", ...options})
                   } catch (error) {
                    getErrorMessage(error)

                       // The 'delete' method was called from a server component.
                       // This can be irgnored if you have middleware redreshing
                       // user sessions.
                   }
                },
           },
       },
   );


   return supabaseClient.auth;
}