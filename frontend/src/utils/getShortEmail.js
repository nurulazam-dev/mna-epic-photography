export const getShortEmail = (email) => {
  if (!email) return "";
  const [name, domain] = email.split("@");
  const [domainName, domainExt] = domain.split(".");

  const shortDomain =
    domainName.length > 1 ? `${domainName.slice(0, 1)}...` : domainName;

  return `${name}@${shortDomain}.${domainExt}`;
};
