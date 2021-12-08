/**
 * To test:
 * node -e "require('./src/batchPromiseRunner')()"
 */

/**
 * Runs an (input) set of async operations in "batches" of an (input) size.
 * Use case is to avoid overloading an external API
 */
async function batchPromiseRunner( /** TODO */){
/** TODO */
}

async function logAsync(message, timeout){
	return new Promise((res) => {
		setTimeout(() => {
			console.log(message);
			res();
		}, timeout);
	});
}

// TODO modify this if you'd like to test at command line
async function doJob(){
	// [ '0', '1', '2', '3', '4',  ... ]
	const messages = Array(20).fill().map((x,i) => i.toString());

	/**
	 * This does them one at a time...
	 */
	for(let i = 0; i < messages.length; i++){
		await logAsync(messages[i], 500);
	}
	console.log('Done!');
}

module.exports = doJob;