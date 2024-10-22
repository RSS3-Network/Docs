---
id: worker
title: Worker
description: Understanding how a worker functions.
---

## Introduction

A worker is the most basic unit of a Node that includes a set of logics to index, structure, and store Open Information. Some logics are shared among different workers to reduce the code complexity.

## Workflow

A worker’s workflow is pretty simple:

The worker continuously monitors a specific Open Data Protocol (ODP). Access to the ODP is configured in the Node’s config.yaml.

The worker indexes Open Information from the ODP when there is an update.

The worker follows a rule-based interpretation to structure the indexed information.

The worker stores the structured data in the Node’s database.

## Available Workers

Here is a list of available workers.

<!-- network-worker table starts -->
| Network/Worker | arbitrum | arweave | avax | base | binance-smart-chain | crossbell | ethereum | farcaster | gnosis | linea | near | optimism | polygon | rsshub | vsl | x-layer |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **core**[1] | ✓ |   | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 1inch |   |   |   |   |   |   | ✓ |   |   |   |   |   |   |   |   |   |
| aave | ✓ |   | ✓ | ✓ |   |   | ✓ |   |   |   |   | ✓ | ✓ |   |   |   |
| aavegotchi |   |   |   |   |   |   |   |   |   |   |   |   | ✓ |   |   |   |
| arbitrum | ✓ |   |   |   |   |   | ✓ |   |   |   |   |   |   |   |   |   |
| base |   |   |   | ✓ |   |   | ✓ |   |   |   |   |   |   |   |   |   |
| cow |   |   |   |   |   |   | ✓ |   |   |   |   |   |   |   |   |   |
| crossbell |   |   |   |   |   | ✓ |   |   |   |   |   |   |   |   |   |   |
| curve | ✓ |   | ✓ |   |   |   | ✓ |   | ✓ |   |   | ✓ | ✓ |   |   |   |
| ens |   |   |   |   |   |   | ✓ |   |   |   |   |   |   |   |   |   |
| highlight | ✓ |   |   |   |   |   | ✓ |   |   |   |   | ✓ | ✓ |   |   |   |
| iqwiki |   |   |   |   |   |   |   |   |   |   |   |   | ✓ |   |   |   |
| kiwistand |   |   |   |   |   |   |   |   |   |   |   | ✓ |   |   |   |   |
| lens |   |   |   |   |   |   |   |   |   |   |   |   | ✓ |   |   |   |
| lido |   |   |   |   |   |   | ✓ |   |   |   |   |   |   |   |   |   |
| linea |   |   |   |   |   |   | ✓ |   |   | ✓ |   |   |   |   |   |   |
| linear |   |   |   |   |   |   |   |   |   |   | ✓ |   |   |   |   |   |
| looksrare |   |   |   |   |   |   | ✓ |   |   |   |   |   |   |   |   |   |
| matters |   |   |   |   |   |   |   |   |   |   |   | ✓ |   |   |   |   |
| mirror |   | ✓ |   |   |   |   |   |   |   |   |   |   |   |   |   |   |
| momoka |   | ✓ |   |   |   |   |   |   |   |   |   |   |   |   |   |   |
| nearsocial |   |   |   |   |   |   |   |   |   |   | ✓ |   |   |   |   |   |
| nouns |   |   |   |   |   |   | ✓ |   |   |   |   |   |   |   |   |   |
| opensea |   |   |   |   |   |   | ✓ |   |   |   |   |   |   |   |   |   |
| optimism |   |   |   |   |   |   | ✓ |   |   |   |   | ✓ |   |   |   |   |
| paragraph |   | ✓ |   |   |   |   |   |   |   |   |   |   |   |   |   |   |
| paraswap |   |   |   |   |   |   | ✓ |   |   |   |   |   |   |   |   |   |
| polymarket |   |   |   |   |   |   |   |   |   |   |   |   | ✓ |   |   |   |
| rainbow | ✓ |   | ✓ | ✓ | ✓ |   | ✓ |   |   | ✓ |   | ✓ | ✓ |   |   |   |
| rss3 |   |   |   |   |   |   | ✓ |   |   |   |   |   |   |   |   |   |
| stargate | ✓ |   | ✓ | ✓ | ✓ |   | ✓ |   |   | ✓ |   | ✓ | ✓ |   |   |   |
| uniswap |   |   |   |   |   |   | ✓ |   |   | ✓ |   |   |   |   |   |   |
| vsl |   |   |   |   |   |   | ✓ |   |   |   |   |   |   |   |   |   |
| zerion | ✓ |   | ✓ | ✓ | ✓ |   |   |   | ✓ | ✓ |   | ✓ | ✓ |   |   | ✓ |
| **Subtotal** | 8 | 3 | 6 | 6 | 4 | 2 | 21 | 1 | 3 | 6 | 3 | 10 | 11 | 1 | 1 | 2 |
<!-- network-worker table ends -->

[1] A core worker covers all the data on the open data protocol where it operates, except for the data already covered by other workers.

## Contribution

Workers are maintained by the community.

If you didn’t find the worker you need, you are welcome to fork our repository and submit pull requests for contributions, or open an issue.

<Callout>
  Begin your Open Web contributions by visiting: https://github.com/RSS3-Network/Node
</Callout>
