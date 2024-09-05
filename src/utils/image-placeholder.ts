import fs from "node:fs/promises";
import { getPlaiceholder } from "plaiceholder";

export type ReturnType = "base64" | "css" | "color" | "svg" | "meta" | "pixels";

export async function local(filePath: string) {
  try {
    const file = await fs.readFile(`${process.cwd()}/public/${filePath}`);
    const obj = await getPlaiceholder(file);
    return obj;
  } catch (err) {
    console.log(err);
    return {};
  }
}

export async function remote(url: string) {
  try {
    const buffer = await fetch(url).then(async (res) =>
      Buffer.from(await res.arrayBuffer())
    );
    const obj = await getPlaiceholder(buffer);
    return obj;
  } catch (err) {
    console.log(err);
    return {};
  }
}
