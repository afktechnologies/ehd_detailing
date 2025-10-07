export const isEmailEnabled = () => {
  const { IS_EMAIL_ENABLED } = process.env;
  return IS_EMAIL_ENABLED === "true";
}