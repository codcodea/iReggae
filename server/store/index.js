
class ClientStore {
	constructor() {

		// Will store chat clients in a Map
		this.clients = new Map();

		// Bind this to methods
		this.setClient = this.setClient.bind(this);
	}

	// Forward a new message to all clients
	sendToAll(msg) {
		this.clients.forEach((client) => client.send(msg));
	}

	// Register client id (on registration)
	registerClientId(id) {
		if (!this.clients.has(id)) {
			console.log("client registered");
			this.clients.set(id, null);
		}
	}

	// Keep track of client id and instance (on connection)
	setClient(id, ws) {
		if (this.clients.has(id)) {
			const map = this.clients.set(id, ws);
			this.observeStore(map);
		}
	}

	// Remove client instance (on disconnection)
	closeClient(id) {
		if (this.clients.has(id)) {
			this.clients.delete(id);
			console.log("client disconnected");
		}
	}

	// Basic observer to safeguard against unintended use and memory leaks
	observeStore(store) {
		if (store.size > 20) {
			store.clear();
			console.log("store reached limit and is cleared");
		}
	}
}

const store = new ClientStore();

module.exports = store;
