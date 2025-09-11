"use server"

export async function submitForget(values: { email: string }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_Base_URL}/api/v1/auth/forgotPasswords`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(values),
    }
  )
  const data = await res.json()

  return data
}

export async function submitCode(code: { pin: string }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_Base_URL}/api/v1/auth/verifyResetCode`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ resetCode: code.pin }),
    }
  )
  const data = await res.json()

  return data
}

export async function reset(values: { email: string; newPassword: string }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_Base_URL}/api/v1/auth/resetPassword`,
    {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(values),
    }
  )
  const data = await res.json()

  return data
}
