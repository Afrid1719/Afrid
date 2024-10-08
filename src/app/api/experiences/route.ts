import { createExperience, getAllExperiences } from "@/models/Experience";
import { success } from "@/utils/response";
import { unauthorizedController } from "../controller";
import { NextRequest } from "next/server";

export async function GET() {
  const fn = async function () {
    const data = await getAllExperiences();
    return success(data);
  };
  return await unauthorizedController(fn);
}

export async function POST(req: NextRequest) {
  const fn = async function () {
    const data = await req.json();
    const res = await createExperience(data);
    return success(res);
  };
  return await unauthorizedController(fn);
}
