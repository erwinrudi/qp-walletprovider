import EventEmitter from 'eventemitter3';
import bs58 from 'bs58';

let requestQueue = 1
let handlerAdded = false

export default class Wallet extends EventEmitter {
    constructor() {
        super();
        window.addEventListener('qoinpay_message_callback', this.handleMessage);
    }

    connect = async () => {
        return new Promise((resolve, reject) => {
            this.#handleCall('connect');
            this.on('connect', (res) => {
                if (res.status === 1) {
                    resolve(res.data)
                }
                else {
                    reject(res.message)
                }
            });
        });
    }

    disconnect = async () => {
        return new Promise((resolve, reject) => {
            this.#handleCall('disconnect');
            this.on('disconnect', (res) => {
                if (res.status === 1) {
                    resolve(res.message)
                }
                else {
                    reject(res.message)
                }
            });
        });
    }

    getAccount = async () => {
        return new Promise((resolve, reject) => {
            this.#handleCall('getAccount');
            this.on('getAccount', (res) => {
                if (res.status === 1) {
                    resolve(res.data)
                }
                else {
                    reject(res.message)
                }
            });
        });
    }




    #handleCall = async (param) => {
        return new Promise((resolve) => {
            this.#sendRequest(param, {});
            resolve();
        });
    }

    #sendRequest = async (method, params) => {
        if (window.qoinpay) {
            const requestId = requestQueue
            ++requestQueue;

            window.qoinpay.call({
                id: requestId,
                method: method,
                params: {
                    ...params,
                },
            });
        }
        else {
            this.emit(method, "Please Intall Qoinpay extension");
        }
    }

    handleMessage = (e) => {
        if (e.detail.method === 'connect') {
            this.emit(e.detail.method, e.detail.params);
        }
        else if (e.detail.method === 'getAccount') {
            this.emit(e.detail.method, e.detail.params);
        }
        else if (e.detail.method === 'disconnect') {
            this.emit(e.detail.method, e.detail.params);
        }
    }
}