import { network } from "hardhat";
import { developmentChains, VERIFICATION_BLOCK_CONFIRMATIONS } from "../helper-hardhat-config";
import { verify } from "../utils/verify";

export default async function ({
    getNamedAccounts,
    deployments,
}: {
    getNamedAccounts: any;
    deployments: any;
}) {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const waitBlockConfirmations = developmentChains.includes(network.name)
        ? 1
        : VERIFICATION_BLOCK_CONFIRMATIONS;

    log("----------------------------------------------------");
    const agrs: any[] = [];
    const nftMarketplace = await deploy("NftMarketplace", {
        from: deployer,
        args: agrs,
        log: true,
        waitConfirmations: waitBlockConfirmations,
    });

    // Verify the deployment
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...");
        await verify(nftMarketplace.address, agrs);
    }
    log("----------------------------------------------------");
}

export const tags = ["all", "nftmarketplace"];
