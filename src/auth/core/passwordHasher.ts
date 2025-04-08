import crypto from "crypto";

export const passwordHasher = (
  password: string,
  salt: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    crypto.scrypt(password.normalize(), salt, 64, (err, hash) => {
      if (err) {
        reject(err);
      }
      resolve(hash.toString("hex").normalize() as string);
    });
  });
};

export async function comparePasswords({
  password,
  salt,
  hashedPassword,
}: {
  password: string;
  salt: string;
  hashedPassword: string;
}) {
  const inputHashedPassword = await passwordHasher(password, salt);

  return crypto.timingSafeEqual(
    Buffer.from(inputHashedPassword, "hex"),
    Buffer.from(hashedPassword, "hex")
  );
}

export function generateSalt() {
  return crypto.randomBytes(16).toString("hex");
}
