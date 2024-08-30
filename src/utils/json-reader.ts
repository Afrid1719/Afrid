import fs from "fs/promises";
async function readData(filePath: string) {
  const data = await fs.readFile(
    `${process.cwd()}/public/${filePath}`,
    "utf-8"
  );
  return JSON.parse(data);
}

export { readData };
