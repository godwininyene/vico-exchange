export const detectNetworkFromPhone = (phone) => {
  const normalized = phone.replace(/\s+/g, "").replace(/^234/, "0");

  const prefixes = {
    mtn: ["0703", "0706", "0803", "0806", "0813", "0816", "0810", "0814", "0903", "0906", "0913"],
    airtel: ["0701", "0708", "0802", "0808", "0812", "0901", "0902", "0904", "0907", "0912"],
    glo: ["0705", "0805", "0807", "0811", "0815", "0905", "0915"],
    etisalat: ["0809", "0817", "0818", "0908", "0909"],
  };

  const prefix = normalized.slice(0, 4);

  for (const [network, list] of Object.entries(prefixes)) {
    if (list.includes(prefix)) {
      return network;
    }
  }

  return null;
};
