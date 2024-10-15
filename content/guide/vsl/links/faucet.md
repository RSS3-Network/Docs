---
title: Faucet
description: Faucet on Ethereum Sepolia
---

## Faucet on Ethereum Sepolia

On Ethereum Sepolia, RSS3 ([0x3Ef1D5be1E2Ce46c583a0c8e511f015706A0ab23](https://sepolia.etherscan.io/address/0x3Ef1D5be1E2Ce46c583a0c8e511f015706A0ab23)) can be minted via:

1. Calling `mint()` function to receive 10,000 RSS3.

   ```bash
   cast send \
     0x3Ef1D5be1E2Ce46c583a0c8e511f015706A0ab23 \
     "mint()" \
     --private-key=$PRIV_KEY \
     --rpc-url=https://rpc.sepolia.org
   ```

2. Using etherscan to interact with the contract: https://sepolia.etherscan.io/address/0x3Ef1D5be1E2Ce46c583a0c8e511f015706A0ab23#writeProxyContract.
