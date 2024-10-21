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

        //Object.keys()
    }

    notifyListener() {

    }
}