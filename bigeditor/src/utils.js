
export let getSubdomain = () => {
	let hostParts = window.location.host.split('.');
	if (hostParts.length === 1 || hostParts[0] === 'www' || hostParts[0] === '192') {
		return null;
	} else {
		return hostParts[0];
	}
}

export let kvPair = (key, val) => {
	let d = {};
	d[key] = val;
	return d;
}
