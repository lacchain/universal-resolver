import express from 'express';
import http from 'http';
import https from "https";
import cors from 'cors';
import Resolver from "./resolver.js";
import fs from "fs";

const app = express();
const resolver = new Resolver();

app.use( cors() );
app.use( express.json( { limit: 152428800 } ) );
app.use( express.urlencoded( { extended: false } ) );

app.use( '/:did', async( req, res, next ) => {
	res.setHeader( 'Strict-Transport-Security', 'max-age=15724800; includeSubDomains' );
	try {
		const document = await resolver.resolve( req.params.did );
		res.send( 200, JSON.stringify( document, null, 2 ) );
	} catch( e ){
		res.send( 500, e.message );
	}
} );


const port = process.env.PORT || 80;
if( !process.env.SSL ) {
	const server = http.createServer( app );

	server.listen( port, () => {
		console.log( 'LACChain Universal Resolver | v1.0 HTTP port', port );
	} );
} else {
	const privateKey = fs.readFileSync( process.env.CERT_KEY, 'utf8' );
	const certificate = fs.readFileSync( process.env.CERT_CRT, 'utf8' );
	const credentials = { key: privateKey, cert: certificate };
	const ssl = https.createServer( credentials, app );

	ssl.listen( port, '0.0.0.0', () => {
		console.log( 'LACChain Universal Resolver | v1.0 HTTPS port', port );
	} );
}