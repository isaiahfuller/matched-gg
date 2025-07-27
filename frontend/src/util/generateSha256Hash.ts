export async function generateSHA256Hash(input: string) {
  const sanitized = input.trim().toLowerCase();
  const encoder = new TextEncoder();
  const data = encoder.encode(sanitized);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}
