import { UploadCloud } from "lucide-react";

export function UpdateWidgetTitle() {
  return (
    <div className="flex gap-1.5 items-center text-sm font-medium">
      <UploadCloud className="size-4 text-zinc-400" strokeWidth={1.5} />
      <span className="text-sm">Upload files</span>
    </div>
  )
}