export const checkLength = (input: string, requiredLength: number): boolean => {
  return input.length > requiredLength;
};

export const hasSpecialCharacter = (input: string): boolean => {
  const regex = /[!@#$%^&*()_+\-=[\]{};':"|,.<>/?]/;
  return regex.test(input);
};

export const hasAlphabetCharacter = (input: string): boolean => {
  const regex = /[a-zA-Z]/;
  return regex.test(input);
};

export const hasNumber = (input: string): boolean => {
  const regex = /\d/;
  return regex.test(input);
};

export const isPasswordValid = (input: string): boolean => {
  return (
    checkLength(input, 8) &&
    hasSpecialCharacter(input) &&
    hasAlphabetCharacter(input) &&
    hasNumber(input)
  );
};

export const toggleUserLoggedIn = (value: string) => {
  localStorage.setItem("userLoggedin", value);
};

export const getUserStatus = () => {
  const status = localStorage.getItem("userLoggedin") === "true";
  return status;
};

export const logout = async (server_url: string) => {
  const response = await fetch(`${server_url}/auth/signout`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include"
  });
  toggleUserLoggedIn('false')
  if(!response.ok){
    throw new Error('Something went wrong')
  }
}
