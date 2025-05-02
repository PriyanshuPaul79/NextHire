"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import Formfield from "./Formfield";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/client";
import { signIn, signUp } from "@/lib/actions/auth.action";

const AuthFormSchema = (type: FormType) => {
  return z.object({
    name:
      type === "sign-up" ? z.string().min(5).max(30) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(4).max(12),
  });
};


const Auth = ({ type }: { type: FormType }) => {

  const router = useRouter()
  const formSchema = AuthFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {

    try {
      if (type === "sign-in") {
        const{email,password} = values;
        const userCredential = await signInWithEmailAndPassword(auth,email,password);
        const idToken = await userCredential.user.getIdToken();
        if(!idToken){
          toast.error('Sign-in problem ')
          return;
        }
        await signIn({
          email,
          idToken
        })
        toast.success("Login successful! ")
        router.push('/')
      } else {
        // extract the vallues from the form values 
        const{name,email,password} = values;

        // this will just authenticate the user 
        const userCredential = await createUserWithEmailAndPassword(auth,email,password)

        const result = await signUp({
          uid : userCredential.user.uid,
          name:name!,
          email,
          password,
        })

        if(!result?.success){
          toast.error(result?.message);
          return;
        }

        toast.success("Account created successfully !!! ")
        router.push('/sign-in')
      }
    } catch (error) {
      console.log(error);
      toast.error(`There was an error: ${error}`);
    }
  }

  const isSignin = type === "sign-in";

  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-4 justify-center">
          <Image src="/logo5.png" alt="logo" width={52} height={58} />
          <h2 className="text-primary-100 mt-3">NextHire</h2>
        </div>
        <h3 className="lg:ml-20 ">Train today, triumph tomorrow.</h3>


        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 mt-4 form"
          >
            {!isSignin && (
              <Formfield
                control={form.control}
                name="name"
                label="Name"
                placeholder="Enter your name"
              />
            )}
            <Formfield
              control={form.control}
              name="email"
              label="Email"
              placeholder="Enter your email"
              type="email"
            />
            <Formfield
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your password"
              type="password"
            />
            <Button type="submit" className="btn">
              {isSignin ? "Sign-in" : "Sign-up "}
            </Button>
          </form>
        </Form>

        <p className="text-center">
          {isSignin ? "Don't have a account ?" : "Having an account ? "}
          <Link
            href={isSignin ? "/sign-up" : "/sign-in"}
            className="font-bold text-user-primary ml-1"
          >
            {isSignin ? "Sign-up" : "Sign-in"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Auth;
