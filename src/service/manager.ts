import { Commands } from "../types/enum";
import EventListener from "./eventListener";
import Parser from "./parser";

class Manager {
    private static instance: Manager;
    private queue: Uint8Array[];
    private ws: WebSocket;
    private url: string;
    private parser: Parser;
    public eventListener: EventListener;

    private constructor(url: string) {
        this.parser = new Parser();
        this.url = url;
        this.eventListener = new EventListener();
        this.ws = this.connect();
        this.queue = [];
    }

    public static getInstance(url: string) {
        if(Manager.instance) {
            return Manager.instance;
        }

        return new Manager(url);
    }

    private connect() {
        const ws = new WebSocket(this.url);
        ws.binaryType = "arraybuffer";

        ws.onopen = () => {
            console.log('Connected to WebSocket');

            const data = new TextEncoder().encode("Hello World");
            const buf = this.parser.encode(0, 1, data);

            this.queue.push(buf);

            this.queue.map(msg => {
                ws.send(msg);
            });
        };

        ws.onmessage = (event: MessageEvent<ArrayBuffer>) => {
            const buffer = new Uint8Array(event.data);
            const frame = this.parser.decode(buffer);

           this.eventListener.notifyListener(Commands[frame.cmd], frame.data);
        };

        ws.onerror = (error) => {
            console.log('WebSocket error: ', error.type);
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
        };

        return ws;
    }

    send(
        cmd: number,
        sequence: number,
        data: Uint8Array
    ) {
        const msgEncoded = this.parser.encode(cmd, sequence, data);

        if(this.ws.readyState === this.ws.OPEN) {
            this.ws.send(msgEncoded);
        } else {
            console.log("The connection still to be establish...");
            
            this.queue.push(msgEncoded);
        }
    }
}

export default Manager;