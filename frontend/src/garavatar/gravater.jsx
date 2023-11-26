import md5 from "md5";

export const gravatarUrl = (email) => {
  if (!email) return "";
  const emailHash = md5(email);

  return `https://www.gravatar.com/avatar/${emailHash}?s=200`;
};
