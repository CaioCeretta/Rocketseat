import * as Progress from "@radix-ui/react-progress";
import { Download, ImageUp, Link2, RefreshCcw, X } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "./ui/button";

export function UploadWidgetUploadItem() {
  return (
    <motion.div
      className="p-3 rounded-lg flex flex-col gap-3 shadow-shape-content bg-white/[0.02]
    relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.2
      }}
    >
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium flex items-center gap-1">
          <ImageUp className="size-3 text-zinc-300" strokeWidth={1.5} />
          <span>screenshot.png</span>
        </span>

        <span className="text-xxs text-zinc-400 flex gap-1.5 items-center">
          <span className="line-through ">3 mb</span>
          <div className="size-1 rounded-full bg-zinc-700" />
          <span>
            300KB
            <span className="text-green-400 ml-1">- 94$</span>
          </span>
          <div className="size-1 rounded-full bg-zinc-700" />
          <span>43%</span>
        </span>

        <Progress.Root className="bg-zinc-800 rounded-full h-1 overflow-hidden">
          <Progress.Indicator className="bg-indigo-500 h-1 w-[43%]" />
        </Progress.Root>

        <div className="absolute top-2.5 right-2.5 flex items-center gap-1">
          <Button size="small">
            <Download className="size-4" strokeWidth="1.5" />
            <span className="sr-only">Download complete</span>
          </Button>

          <Button size="small">
            <Link2 className="size-4" strokeWidth="1.5" />
            <span className="sr-only">Copy remote URL</span>
          </Button>
          <Button size="small">
            <RefreshCcw className="size-4" strokeWidth="1.5" />
            <span className="sr-only">Retry upload</span>
          </Button>

          <Button size="small">
            <X className="size-4" strokeWidth="1.5" />
            <span className="sr-only">Cancel Upload</span>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
