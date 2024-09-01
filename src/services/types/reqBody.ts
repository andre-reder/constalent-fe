interface UploadDocPayload {
  key: string;
  value: string | File | null | number | boolean | undefined;
}

export type ReqBodyType = string | UploadDocPayload[] | null;
