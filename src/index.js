import EventEmitter from 'eventemitter3';
import bs58 from 'bs58';

let requestQueue = 1
let handlerAdded = true

export default class Wallet extends EventEmitter {
    constructor() {
        super();
        window.addEventListener('qoinpay_message_callback', this.#handleMessage);
    }

    connect = async () => {
        return new Promise(resolve => {
            this.#handleConnect();
            this.on('connect', (res) => {
                resolve(res);
            });
        });
    }

    #handleConnect = async () => {
        return new Promise((resolve) => {
            this.#sendRequest('connect', {});
            resolve();
        });
    }

    #sendRequest = async (method, params) => {
        const requestId = requestQueue
        ++requestQueue;
        if (method == "connect") {
            window.qoinpay.connect({
                id: requestId,
                method,
                params: {
                    ...params,
                },
            });
        }
    }

    #handleMessage = (e) => {
        if (e.detail.method === 'connected') {
            let address = e.detail.params.address
            this.emit('connect', address);
        }
    }
}