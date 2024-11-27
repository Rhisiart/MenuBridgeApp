import { Commands } from "../types/enum";

type CommandsStrings = keyof typeof Commands;
class EventListener {
    private listoners: {[key: string]: Function}

    constructor() {
        this.listoners = {};
    }

    addEvent(event: CommandsStrings, callback: Function) {
        this.listoners[event] = callback;
    }

    removeEvent(event: CommandsStrings) {
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