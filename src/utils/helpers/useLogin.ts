import { useMutation } from "@tanstack/react-query";

type LoginPayload = {
  mobile: string;
  password: string;
};

async function loginFn(payload: LoginPayload) {
  const response = await fetch("https://manarbe.oetest.tech/api/v1/ar/auth/login", {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      data: {
        type: "user",
        attributes: payload,
        id: "null",
      },
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.message || "Invalid mobile number or password");
  }
  return data;
}

export function useLogin(onSuccess?: (data: any) => void, onError?: (err: any) => void) {
  return useMutation({
    mutationFn: loginFn,
    onSuccess,
    onError,
  });
}
