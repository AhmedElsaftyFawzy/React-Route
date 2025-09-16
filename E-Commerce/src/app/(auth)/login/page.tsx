"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { signIn } from "next-auth/react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useContext, useEffect } from "react"
import { cartContext } from "@/context/CartContext"
import Link from "next/link"

export default function Page() {
  const router = useRouter()
  const cart = useContext(cartContext)
  useEffect(() => {
    document.title = "Login"
  }, [])
  const loginSchema = z.object({
    email: z
      .string()
      .nonempty({ message: "Email is required" })
      .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
        message: "Invalid email format",
      }),

    password: z
      .string()
      .nonempty({ message: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/,
        {
          message:
            "Password must include uppercase, lowercase, number, and special character",
        }
      ),
  })

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(data: z.infer<typeof loginSchema>) {
    const respond = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    })
    if (respond?.ok) {
      toast(<div className="text-main">login Success</div>, {
        position: "top-center",
      })
      router.push("/")
      await cart?.getCart()
    } else {
      toast(<div className="text-red-700 capitalize">{respond?.error}</div>, {
        position: "top-center",
      })
    }
  }
  return (
    <div className="w-8/12 mx-auto my-10 shadow-2xl p-5 min-h-screen">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email:</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password:</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <Link href="/forgetpassword">
              Forget<span className="text-main"> Your Password ?</span>
            </Link>
          </div>
          <Button type="submit" className="bg-main cursor-pointer">
            Login
          </Button>
        </form>
      </Form>
    </div>
  )
}
