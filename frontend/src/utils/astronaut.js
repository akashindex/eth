import { Contract, BigNumber } from "ethers";
import { _getProvider } from "./ethereum";
import ASTRONAUT_ABI from "./abi/astronaut.abi";
import { ASTRONAUT_ADDRESS } from "./constants"

export const mint = async (tokens) => {
  const provider = _getProvider();
  if (!provider) throw new Error("Unable to connect to wallet");
  
  // Validate contract address
  if (!ASTRONAUT_ADDRESS || ASTRONAUT_ADDRESS === "0x0000000000000000000000000000000000000000") {
    throw new Error("Contract address not configured. Please set ASTRONAUT_ADDRESS in constants.js");
  }

  const signer = provider.getSigner();
  const contract = new Contract(ASTRONAUT_ADDRESS, ASTRONAUT_ABI, signer);

  const gasEstimate = await contract.estimateGas.mint(tokens, {
    value: BigNumber.from(0),
  });
  return await contract.mint(tokens, {
    gasLimit: gasEstimate.mul(BigNumber.from(12)).div(BigNumber.from(10)),
    value: BigNumber.from(0),
  });
};
