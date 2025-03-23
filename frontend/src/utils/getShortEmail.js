export const getShortEmail = (email) => {
  if (!email) return "";
  const [name, domain] = email.split("@");
  const [domainName, domainExt] = domain.split(".");

  const shortDomain =
    domainName.length > 2 ? `${domainName.slice(0, 2)}...` : domainName;

  return `${name}@${shortDomain}.${domainExt}`;
};
