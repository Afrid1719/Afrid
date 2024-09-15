import { ISkill } from "@/interfaces/i-home";
import { getSkills, updateSkill } from "@/models/Skill";
import { remote } from "@/utils/image-placeholder";
import { NextRequest } from "next/server";
import { authorizedController } from "../../controller";
import { noContent } from "@/utils/response";

export async function PATCH(req: NextRequest) {
  const fn = async () => {
    const skills: ISkill[] = await getSkills();
    for (const skill of skills) {
      if (!skill.blurDataUrl) {
        let res = await remote(skill.icon);
        await updateSkill(skill._id.toString(), {
          blurDataUrl: (res as any)?.base64
        });
      }
    }
    return noContent();
  };
  return await authorizedController(req, fn);
}
