import * as Progress from "@radix-ui/react-progress";
import { Download, ImageUp, Link2, RefreshCcw, X } from "lucide-react";
import { motion } from "motion/react";
import { type Upload, useUploads } from "../store/uploads";
import { formatBytes } from "../utils/format-bytes.";
import { Button } from "./ui/button";

interface UploadWidgetItemProps {
  upload: Upload;
  uploadId: string;
}

export function UploadWidgetUploadItem({
  upload,
  uploadId,
}: UploadWidgetItemProps) {
  const cancelUpload = useUploads((store) => store.cancelUpload);

  return (
    <motion.div
      className="p-3 rounded-lg flex flex-col gap-3 shadow-shape-content bg-white/[0.02]
    relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.2,
      }}
    >
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium flex items-center gap-1">
          <ImageUp className="size-3 text-zinc-300" strokeWidth={1.5} />
          <span>{upload.name}</span>
        </span>

        <span className="text-xxs text-zinc-400 flex gap-1.5 items-center">
          <span className="line-through ">{formatBytes(upload.file.size)}</span>
          <div className="size-1 rounded-full bg-zinc-700" />
          <span>
            300KB
            <span className="text-green-400 ml-1">- 94%</span>
          </span>
          <div className="size-1 rounded-full bg-zinc-700" />
          <span>43%</span>
          {upload.status === "progress" && <span>45%</span>}
          {upload.status === "error" && <span className="text-red-400">Error</span>}
          {upload.status === "canceled" && <span className="text-yellow-400">Canceled</span>}
        </span>

        <Progress.Root
          className="group bg-zinc-800 rounded-full h-1 overflow-hidden"
          data-status={upload.status}
        >
          <Progress.Indicator
            className="bg-indigo-500 h-1 w-[43%]
             group-data-[status=success]:bg-green-400
             group-data-[status=canceled]:bg-yellow-400
             group-data-[status=error]:bg-red-400"
            style={{ width: upload.status === 'progress' ? '43%' : '100%' }} />
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

          <Button
            disabled={['canceled', 'error'].includes(upload.status)}
            size="small">
            <RefreshCcw className="size-4" strokeWidth="1.5" />
            <span className="sr-only">Retry upload</span>
          </Button>


          <Button
            disabled={upload.status !== 'progress'} size="small" onClick={() => cancelUpload(uploadId)}>
            <X className="size-4" strokeWidth="1.5" />
            <span className="sr-only">Cancel Upload</span>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
