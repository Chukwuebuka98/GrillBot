'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import Link from 'next/link';
import { toast } from 'sonner';
import FormField from './FormField';
import { useRouter } from 'next/navigation';

import { MoveRight } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { auth } from '@/firebase/client';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { signIn, signUp } from '@/lib/actions/auth.action';

const authFormSchema = (type: FormType) => {
  return z.object({
    name:
      type === 'sign-up'
        ? z.string().min(3, 'Name is required')
        : z.string().optional(),
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Invalid email address'),
    password: z.string().min(3, 'Password is required'),
  });
};
const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const formSchema = authFormSchema(type);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      if (type === 'sign-up') {
        // Sign up logic here
        const { name, email, password } = values;

        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const result = await signUp({
          uid: userCredential.user.uid,
          name: name!,
          email,
          password,
        });

        if (!result?.success) {
          toast.error(result?.message);
          return;
        }

        toast.success('Account created successful!');
        router.push('/sign-in');
      } else {
        // Sign in logic here
        const { email, password } = values;

        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const idToken = await userCredential.user.getIdToken();

        if (!idToken) {
          toast.error('Failed to log into an account');
          return;
        }

        await signIn({
          email,
          idToken,
        });

        toast.success('Sign in successful!');
        router.push('/');
      }
    } catch (error: any) {
      console.error(error);
      toast.error('Something went wrong. Please try again.' + error.message);
    }
  }

  const isSignIn = type === 'sign-in';

  return (
    <div className="card-border w-[300px] md:w-[700px] lg:w-[1000px] md:min-h-[600px] ">
      <div className="flex card overflow-clip">
        <div className="form-bg hidden md:flex flex-1 md:h-[600px] relative">
          <div className="absolute inset-0 bg-black/60" />

          <div className="flex flex-col justify-between z-10 text-white p-8 w-full">
            <div className="flex justify-between">
              <h2>GrillBot</h2>
              <Link href="/">
                <Button
                  type="button"
                  variant="secondary"
                  className="rounded-full"
                >
                  Back to home{' '}
                  <span>
                    <MoveRight size={20} />
                  </span>
                </Button>
              </Link>
            </div>
            <p className="text-center text-white">
              Practice job interview with AI
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-6 py-14 flex-1 ">
          <div className="px-10 space-y-3">
            {!isSignIn ? (
              <h2 className="text-primary-100">Create an account</h2>
            ) : (
              <h2 className="text-primary-100">Login</h2>
            )}

            <p className="font-thin text-sm text-muted-foreground">
              {isSignIn ? 'No account yet?' : 'Already have an account?'}
              <Link
                href={!isSignIn ? '/sign-in' : '/sign-up'}
                className="font-thin text-sm text-muted-foreground ml-1 underline"
              >
                {!isSignIn ? 'Sign in' : 'Sign up'}
              </Link>
            </p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6 mt-4 form px-10"
            >
              {!isSignIn && (
                <FormField
                  control={form.control}
                  name="name"
                  label="Name"
                  placeholder="Name"
                />
              )}
              <FormField
                control={form.control}
                name="email"
                label="Email"
                placeholder="Email"
                type="email"
              />
              <FormField
                control={form.control}
                name="password"
                label="Password"
                placeholder="Password"
                type="password"
              />
              <Button className="btn" type="submit">
                {isSignIn ? 'Sign in' : 'Create an account'}
              </Button>
            </form>

            {/* OAuth buttons go outside the <form> */}
            <div className="my-2 text-center text-sm font-thin text-muted-foreground">
              or continue with
            </div>
            <div className="flex justify-center gap-4 w-full">
              <Button variant="outline">
                <span>
                  <FcGoogle />
                </span>
                Google
              </Button>
              <Button variant="outline">
                <span>
                  <FaGithub />
                </span>
                GitHub
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
