# Cygnus LP Oracle - Balancer Metastable Pools

A fair reserves LP Oracle for Balancer Metastable Pools.

From BeethovenX's docs (https://docs.beets.fi/boundless-opportunity/metastable):

>A MetaStable pool is the most efficient pool type for two highly correlated tokens. Instead of containing two pegged assets like a stable pool, the pool includes >two tokens that are closely related. Often, this incorporates a base token and a staked derivative such as ETH and stETH, but it can also include any token >integrated into a yield-generating market. Unlike a typical stable pool, MetaStable pools host a unique and innovative feature set that ensures investors and >traders unlock the full power of Interest-Bearing assets.

### How does the oracle work?

The oracle returns the price of 1 BPT (Balancer Pool Tokens) in the denomination token, in our case USDC. 

Instead of obtaining the price by querying the reserves of the BPT, we derive the price from the Last Invariant of the pool and the min price of the assets in the pool. Since Metastable pools have correlated assets, we get the price of each asset from Chainlink and find which asset has the lowest price. By not deriving the price of the BPT from the reserves directly and using only the min price of the assets, it ensures that the oracle is resistant to any kind of manipulation or flash loan attack.
