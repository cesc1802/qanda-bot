const credentials = JSON.parse(
  Buffer.from(process.env.GOOGLE_SHEET_CREDS_BASE64, "base64").toString("utf-8")
);

export const config = {
  EXAM_GROUP_ID: process.env.EXAM_GROUP_ID,
  DISCUSSION_TOPIC_ID: process.env.DISCUSSION_TOPIC_ID,
  GOOGLE_SHEET_CREDS: credentials,
  SHEET_ID: process.env.SHEET_ID,
  SERVICE_ENV: process.env.SERVICE_ENV,
};
