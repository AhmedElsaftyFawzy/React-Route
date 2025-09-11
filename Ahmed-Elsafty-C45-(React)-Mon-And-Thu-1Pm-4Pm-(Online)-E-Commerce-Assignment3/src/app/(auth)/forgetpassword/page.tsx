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
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { submitForget } from "@/services/forget.services"

export default function Page() {
  const router = useRouter()
  useEffect(() => {
    document.title = "Forget Password"
  }, [])
  const forgetSchema = z.object({
    email: z
      .string()
      .nonempty({ message: "Email is required" })
      .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
        message: "Invalid email format",
      }),
  })

  const form = useForm<z.infer<typeof forgetSchema>>({
    resolver: zodResolver(forgetSchema),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit(data: z.infer<typeof forgetSchema>) {
    const res = await submitForget(data)
    if (res.statusMsg == "success") {
      toast(<div className="text-main">{res?.message}</div>, {
        position: "top-center",
      })

      router.push("/verifycode")
    } else {
      toast(
        <div className="text-red-700 capitalize">
          {res?.message || "Error Had Happened"}
        </div>,
        {
          position: "top-center",
        }
      )
    }
  }
  return (
    <div className="w-8/12 mx-auto my-10 shadow-2xl p-5">
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

          <Button type="submit" className="bg-main cursor-pointer">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  )
}
