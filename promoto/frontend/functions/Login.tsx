const Login = async ({ email, password }) => {
  return await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      email,
      password,
    }),
  });
};

export default Login;
