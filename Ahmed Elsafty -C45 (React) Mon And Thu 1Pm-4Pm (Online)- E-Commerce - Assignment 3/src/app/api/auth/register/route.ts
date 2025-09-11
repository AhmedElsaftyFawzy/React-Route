export async function POST(req: Request) {
  const values = await req.json()
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup`,
    {
      method: "POST",
      body: JSON.stringify({
        name: values?.name,
        email: values?.email,
        password: values?.password,
        rePassword: values?.rePassword,
        phone: values?.phone,
      }),
      headers: { "content-type": "application/json" },
    }
  )
  const data = await res.json()

  return Response.json(data)
}
