const Register = async ({ name, email, password }) => {
  return await fetch("http://localhost:8000/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });
};

export default Register;
