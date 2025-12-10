import { UploadCloud } from "lucide-react";
import { usePendingUploads } from "../store/uploads";

export function UpdateWidgetTitle() {
  const { globalPercentage, isThereAnyPendingUploads } = usePendingUploads();



  return (
    <div className="flex gap-1.5 items-center text-sm font-medium">
      <UploadCloud className="size-4 text-zinc-400" strokeWidth={1.5} />
      {isThereAnyPendingUploads ? (
        <span className="text-sm">Uploading...{' '}
          <span className="text-tiny text-zinc-400 tabular-nums">
            {globalPercentage}%
          </span>
        </span>
      ) : (
        <span className="text-sm">Upload files </span>
      )}

    </div>
  )
}