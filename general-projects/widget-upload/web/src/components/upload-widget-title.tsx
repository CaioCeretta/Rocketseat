import { UploadCloud } from "lucide-react";

export function UpdateWidgetTitle() {
  const isThereAnyPendingUpload = true;
  const uploadGlobalPercentage = 66;


  return (
    <div className="flex gap-1.5 items-center text-sm font-medium">
      <UploadCloud className="size-4 text-zinc-400" strokeWidth={1.5} />
      {isThereAnyPendingUpload ? (
        <span className="text-sm">Uploading...{' '}
          <span className="text-tiny text-zinc-400 tabular-nums">
            {uploadGlobalPercentage}%
          </span>
        </span>
      ) : (
        <span className="text-sm">Upload files </span>
      )}

    </div>
  )
}