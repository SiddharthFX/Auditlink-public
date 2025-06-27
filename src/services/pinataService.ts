const PINATA_API_KEY = import.meta.env.VITE_PINATA_API_KEY;
const PINATA_API_SECRET = import.meta.env.VITE_PINATA_API_SECRET;

function rewriteIpfsGateways(obj: any): any {
  if (typeof obj === 'string') {
    // Replace Pinata or other gateways with ipfs.io
    return obj.replace(
      /https?:\/\/(gateway\.pinata\.cloud|cloudflare-ipfs\.com|ipfs\.io)\/ipfs\//g,
      'https://ipfs.io/ipfs/'
    );
  } else if (Array.isArray(obj)) {
    return obj.map(rewriteIpfsGateways);
  } else if (typeof obj === 'object' && obj !== null) {
    const newObj: any = {};
    for (const key in obj) {
      newObj[key] = rewriteIpfsGateways(obj[key]);
    }
    return newObj;
  }
  return obj;
}

export async function uploadJSONToPinata(jsonObj: any): Promise<string> {
  // Rewrite all IPFS gateway URLs to use ipfs.io
  const rewritten = rewriteIpfsGateways(jsonObj);
  const res = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      pinata_api_key: PINATA_API_KEY,
      pinata_secret_api_key: PINATA_API_SECRET,
    },
    body: JSON.stringify(rewritten),
  });
  if (!res.ok) throw new Error("Failed to upload JSON to Pinata");
  const json = await res.json();
  return `https://ipfs.io/ipfs/${json.IpfsHash}`;
} 