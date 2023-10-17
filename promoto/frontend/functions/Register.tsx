const Register = async (
  name: string,
  email: string,
  password: string,
  firstName: string,
  lastName: string
) => {
  return await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/api/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      email,
      password,
      firstName,
      lastName,
    }),
  });
};

export default Register;
