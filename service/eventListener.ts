
class EventListener {
    private listoners: {[key: string]: Function}

    constructor() {
        this.listoners = {};
    }

    addEvent(event: string, callback: Function) {
        console.log(`Added a new event ${event}`);
        this.listoners[event] = callback;
    }

    removeEvent(event: string) {
        if(!this.listoners[event]) {
            return;
        }

        delete this.listoners[event];
    }

    notifyListener(event: string, data: string[]) {
        //const event = data.cmd;

        if(!this.listoners[event]) {
            return;
        }

        console.log(`Notifying the event ${event}`)

        const callback = this.listoners[event];

        callback(data);
    }
}

export default EventListener;