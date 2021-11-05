import axios from 'axios';
import { Resolver as lac } from '@lacchain/did';
import ethr from 'ethr-did-resolver';
import web from 'web-did-resolver';
import DIDResolver from 'did-resolver';
import config from "./config.js";

export default class Resolver {

	async resolve( did ) {
		const ethrNetworks = config.ethr.networks.split( ',' ).map( n => ( {
			name: n.split( '|' )[0],
			registry: n.split( '|' )[1],
			rpcUrl: n.split( '|' )[2]
		} ) );
		const lacNetworks = config.lac.networks.split( ',' ).map( n => ( {
			name: n.split( '|' )[0],
			registry: n.split( '|' )[1],
			rpcUrl: n.split( '|' )[2]
		} ) );
		const lacDavid19Networks = config.david19.networks.split( ',' ).map( n => ( {
			name: n.split( '|' )[0],
			registry: n.split( '|' )[1],
			rpcUrl: n.split( '|' )[2]
		} ) );
		const lacResolver = config.lac.resolve ? lac.getResolver( { networks: lacNetworks, mode: 'explicit' } ) : {};
		const lacDavid19Resolver = config.david19.resolve ? lac.getResolver( { networks: lacDavid19Networks, mode: 'explicit' } ) : {};
		const ethrResolver = config.ethr.resolve ? ethr.getResolver( { networks: ethrNetworks } ) : {};
		const webResolver = config.web.resolve ? web.getResolver() : {};

		const resolver = new DIDResolver.Resolver( {
			...lacResolver,
			...lacDavid19Resolver,
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
		} );
		return await resolver.resolve( did );
	}

}