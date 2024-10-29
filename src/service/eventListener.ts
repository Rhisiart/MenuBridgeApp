
class EventListener {
    private listoners: {[key: string]: Function}

    constructor() {
        this.listoners = {};
    }

    addEvent(event: string, callback: Function) {
        this.listoners[event] = callback;
    }

    removeEvent(event: string) {
        if(!this.listoners[event]) {
            return;
        }

        delete this.listoners[event];
    }

    notifyListener(event: string, data: Uint8Array) {
        if(!this.listoners[event]) {
            return;
        }

        const callback = this.listoners[event];

        callback(data);
    }
}

export default EventListener;