import { ITool } from "@/interfaces/i-home";
import { remote } from "@/utils/image-placeholder";
import { NextRequest } from "next/server";
import { authorizedController } from "../../controller";
import { noContent } from "@/utils/response";
import { getTools, updateTool } from "@/models/Tool";

export async function PATCH(req: NextRequest) {
  const fn = async () => {
    const tools: ITool[] = await getTools();
    for (const tool of tools) {
      if (!tool.blurDataUrl) {
        let res = await remote(tool.icon);
        await updateTool(tool._id.toString(), {
          blurDataUrl: (res as any)?.base64
        });
      }
    }
    return noContent();
  };
  return await authorizedController(req, fn);
}
