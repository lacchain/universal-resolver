
The Universal Resolver resolves Decentralized Identifiers (DIDs) across many different DID methods, it uses HTTP GET requests to get DID Document from each DID method.

This project also includes the LACChain DID method to resolve ```did:lac``` identifiers.

Currently, these are the following supported DID methods:


| Method                         |        Network              | Subnetwork |
| -------------------------------| ----------------------------|------------|
| lac                            |     LACChain                |  MainNet   |
| ethr                           |     LACChain                |  MainNet   |
| ethr                           |     Ethereum                |     *      |
| web                            |      *                      |     *      |
| btcr                           |      *                      |     *      |
| sov                            |      *                      |     *      |
| elem                           |      *                      |     *      |
| nacl                           |      *                      |     *      |
| elsi                           |      *                      |     *      |

## Usage

To resolve a DID Document, just call the following HTTP GET call:

```bash
curl https://resolver.lacchain.net/:did
```

Where **:did** represents the DID identifier, for example: ``did:lac:main:0x5c3968542ca976bec977270d3fe980dd4742865e`` or  ``did:ethr:0x53671bc6cb20882e45154a9d370d40e19d05125a`` 

## Run

It is also possible to deploy this resolver in any server using NodeJS.

**Pre-requisites**

- NodeJS  > 12.4

To start HTTP Server, run the following commands:

```bash
$ npm install
$ npm run
```

### Build Docker image

```
$ docker build -t universal-resolver . 
$ docker run universal-resolver
```

To use the official docker image:

```bash
docker pull ghcr.io/lacchain/universal-resolver:latest
```
