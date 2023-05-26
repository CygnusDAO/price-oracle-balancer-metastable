// Hardhat
const hre = require("hardhat");
const ethers = hre.ethers;

const metastableOracle = async () => {
    // LP: WSTETH - ETH
    const lpTokenAddress = "0x7B50775383d3D6f0215A8F290f2C9e2eEBBEceb2";

    // Set the USDC address on this chain
    const usdcAddress = "0x7F5c764cBc14f9669B88837ca1490cCa17c31607";

    // Set the Chainlink aggregator addresses for USDC
    const usdcAggregator = "0x16a9FA2FDa030272Ce99B29CF780dFA30361E0f3";

    // ETH + WSTETH
    // https://docs.chain.link/data-feeds/price-feeds/addresses/?network=optimism
    const aggregators = ["0x698B585CbC4407e2D54aa898B2600B53C68958f7", "0x13e3Ee699D1909E989722E753853AE30b17e08c5"];

    // Create a CygnusNebulaOracle contract instance with the address of the denomination token (USDC) and its Chainlink aggregator
    const Oracle = await ethers.getContractFactory("CygnusNebulaOracle");
    const oracle = await Oracle.deploy(usdcAddress, usdcAggregator);

    // Initialize the oracle for the LP token, which is necessary for the deployment of this lending pool to succeed
    await oracle.initializeNebula(lpTokenAddress, aggregators);

    console.log("----------------------------------------------------------------------------------------------");
    console.log("Cygnus LP Oracle   | %s", oracle.address);
    console.log("----------------------------------------------------------------------------------------------");

    // Price of 1 LP Token
    const oneLPToken = (await oracle.lpTokenPriceUsd(lpTokenAddress)) / 1e6;

    console.log("----------------------------------------------------------------------------------------------");
    console.log("PRICE OF 1 LP TOKEN                            | %s USDC", oneLPToken);
    console.log("----------------------------------------------------------------------------------------------");
};

metastableOracle();
