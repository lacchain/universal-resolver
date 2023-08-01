import axios from 'axios';
import { Resolver as lac, Lac1Resolver as lac1 } from '@lacchain/did';
import ethr from 'ethr-did-resolver';
import web from 'web-did-resolver';
import DIDResolver from 'did-resolver';
import config from "./config.js";

export default class ResolverDID {

	async resolve( did ) {
		const ethrNetworks = config.ethr.networks.split( ',' ).map( n => ( {
			name: n.split( '|' )[0],
			registry: n.split( '|' )[1],
			rpcUrl: n.split( '|' )[2]
		} ) );
		const lacNetworks = config.lac.networks.split( ',' ).map( node => {
			const split = node.split('|');
			return {
				name: split[0],
				registry: split[1],
				rpcUrl: split[2],
				nodeAddress: split.length > 3 ? split[3] : undefined,
				expiration: split.length > 4 ? split[4] : undefined,
			}
		} );
		const lac1Networks = config.lac1.networks.split( ',' ).map( node => {
			const split = node.split('|');
			return {
				registry: split[0],
				rpcUrl: split[1],
				nodeAddress: split.length > 2 ? split[2] : undefined,
				chainId: split.length > 3 ? parseInt(split[3]) : undefined,
			}
		} );
		const lacResolver = config.lac.resolve ? lac( { networks: lacNetworks, mode: 'explicit' } ) : {};
		const lac1Resolver = config.lac1.resolve ? lac1( { networks: lac1Networks, mode: 'explicit' } ) : {};
		const ethrResolver = config.ethr.resolve ? ethr.getResolver( { networks: ethrNetworks } ) : {};
		const webResolver = config.web.resolve ? web.getResolver() : {};

		const resolver = new DIDResolver.Resolver(  {
				...lacResolver,    
				...lac1Resolver,
				...ethrResolver,
				...webResolver,
				...config.btcr.resolve ? {
					btcr: async( did, parsed ) => {
						const didDoc = await axios.get( `${config.btcr.endpoint}/${parsed.did}` );
						return didDoc.data;
					}
				} : {},
				...config.sov.resolve ? {
					sov: async( did, parsed ) => {
						const didDoc = await axios.get( `${config.sov.endpoint}/${parsed.did}` );
						return didDoc.data;
					}
				} : {},
				...config.nacl.resolve ? {
					nacl: async( did, parsed ) => {
						const didDoc = await axios.get( `${config.nacl.endpoint}/${parsed.did}` );
						return didDoc.data;
					}
				} : {},
				...config.elem.resolve ? {
					elem: async( did, parsed ) => {
						const didDoc = await axios.get( `${config.elem.endpoint}/${parsed.did}` );
						return didDoc.data;
					}
				} : {},
				...config.elsi.resolve ? {
					elsi: async( did, parsed ) => {
						const didDoc = await axios.get( `${config.elsi.endpoint}/${parsed.did}` );
						return didDoc.data.payload;
					}
				} : {}
			});
		return await resolver.resolve( did );
	}

}