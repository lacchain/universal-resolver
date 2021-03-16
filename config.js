export default {
	"web": process.env.DID_WEB_ENABLED || false,
	"btcr": {
		"resolve": process.env.DID_BTCR_ENABLED || false,
		"endpoint": process.env.DID_BTCR_ENDPOINT || ""
	},
	"sov": {
		"resolve": process.env.DID_SOV_ENABLED || false,
		"endpoint": process.env.DID_SOV_ENDPOINT || ""
	},
	"nacl": {
		"resolve": process.env.DID_NACL_ENABLED || false,
		"endpoint": process.env.DID_NACL_ENDPOINT || ""
	},
	"elem": {
		"resolve": process.env.DID_ELEM_ENABLED || false,
		"endpoint": process.env.DID_ELEM_ENDPOINT || ""
	},
	"elsi": {
		"resolve": process.env.DID_ELSI_ENABLED || false,
		"endpoint": process.env.DID_ELSI_ENDPOINT || ""
	},
	"ethr": {
		"resolve": process.env.DID_ETHR_ENABLED || false,
		"networks": process.env.DID_ETHR_NETWORKS || ""
	},
	"lac": {
		"resolve": process.env.DID_LAC_ENABLED || false,
		"networks": process.env.DID_LAC_NETWORKS || ""
	}
}