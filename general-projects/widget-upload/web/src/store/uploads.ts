import { CanceledError } from "axios";
import { enableMapSet } from "immer";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { useShallow } from "zustand/shallow";
import { uploadFileToStorage } from "../http/upload-file-to-storage";
import { compressImage } from "../utils/compress-image";

export interface Upload {
	name: string;
	file: File;
	status: "progress" | "success" | "error" | "canceled";
	abortController?: AbortController;
	originalSizeInBytes: number;
	compressedSizeInBytes?: number;
	uploadSizeInBytes: number;
	remoteUrl?: string;
}

type UploadState = {
	uploads: Map<string, Upload>;
	addUploads: (files: File[]) => void;
	cancelUpload: (uploadId: string) => void;
	retryUpload: (upload: string) => void;
};

enableMapSet();

export const useUploads = create<UploadState, [["zustand/immer", never]]>(
	immer((set, get) => {
		function updateUpload(uploadId: string, data: Partial<Upload>) {
			const upload = get().uploads.get(uploadId);

			if (!upload) {
				return;
			}

			set((state) => {
				state.uploads.set(uploadId, { ...upload, ...data });
			});
		}

		async function processUpload(uploadId: string) {
			const upload = get().uploads.get(uploadId);

			if (!upload) {
				return;
			}

			const abortController = new AbortController();

			updateUpload(uploadId, {
				uploadSizeInBytes: 0,
				remoteUrl: undefined,
				compressedSizeInBytes: undefined,
				abortController,
				status: "progress",
			});

			try {
				const compressedFile = await compressImage({
					file: upload.file,
					maxHeight: 200,
					maxWidth: 200,
					quality: 0.5,
				});

				updateUpload(uploadId, { compressedSizeInBytes: compressedFile.size });

				const { url } = await uploadFileToStorage(
					{
						file: compressedFile,
						onProgress(sizeInBytes) {
							updateUpload(uploadId, {
								uploadSizeInBytes: sizeInBytes,
							});
						},
					},
					{ signal: abortController?.signal },
				);

				updateUpload(uploadId, {
					status: "success",
					remoteUrl: url,
				});
			} catch (err) {
				if (err instanceof CanceledError) {
					updateUpload(uploadId, {
						status: "canceled",
					});

					return;
				} else {
					set((state) => {
						updateUpload(uploadId, {
							status: "error",
						});
					});
				}
			}
		}

		function cancelUpload(uploadId: string) {
			const upload = get().uploads.get(uploadId);

			if (!upload) {
				return;
			}

			upload.abortController?.abort();

			set((state) => {
				state.uploads.set(uploadId, {
					...upload,
					status: "canceled",
				});
			});
		}

		function addUploads(files: File[]) {
			for (const file of files) {
				const uploadId = crypto.randomUUID();

				const upload: Upload = {
					name: file.name,
					file,
					status: "progress",
					originalSizeInBytes: file.size,
					uploadSizeInBytes: 0,
				};

				set((state) => {
					state.uploads.set(uploadId, upload);
				});

				processUpload(uploadId);
			}
		}

		function retryUpload(uploadId: string) {
			processUpload(uploadId);
		}

		return {
			uploads: new Map(),
			addUploads,
			cancelUpload,
			retryUpload,
		};
	}),
);

export const usePendingUploads = () => {
	return useUploads(
		useShallow((store) => {
			const isThereAnyPendingUploads = Array.from(store.uploads.values()).some(
				(upload) => upload.status === "progress",
			);

			// to avoid unnecessary calculus
			if (!isThereAnyPendingUploads) {
				return { isThereAnyPendingUploads, globalPercentage: 100 };
			}

			const { total, uploaded } = Array.from(store.uploads.values()).reduce(
				(acc, upload) => {
					if (upload.compressedSizeInBytes) {
						acc.uploaded += upload.uploadSizeInBytes;
						acc.total += upload.compressedSizeInBytes;
					}

					return acc;
				},
				{
					total: 0,
					uploaded: 0,
				},
			);

			const globalPercentage = Math.min(
				Math.round((uploaded * 100) / total),
				100,
			);

			return {
				isThereAnyPendingUploads,
				globalPercentage,
			};
		}),
	);
};
