import Parser from "./parser";

class Manager {
    private static instance: Manager;
    private ws: WebSocket;
    private url: string;
    private parser: Parser;
    private eventListener: EventListener;

    private constructor(url: string, parser: Parser) {
        this.parser = parser;
        this.url = url;
        this.eventListener = new EventListener();
        this.ws = this.connect();
    }

    public static getInstance(url: string, parser: Parser) {
        if(Manager.instance) {
            return Manager.instance;
        }

        return new Manager(url, parser);
    }

    private connect() {
        const ws = new WebSocket(this.url);
    
        ws.onopen = () => {
            console.log('Connected to WebSocket');

            const data = new TextEncoder().encode("Hello World");
            const buf = this.parser.encode(1, 1, data);

            ws.send(buf);
        };

        ws.onmessage = (event: MessageEvent<ArrayBuffer>) => {
            const buffer = new Uint8Array(event.data);
            const frame = this.parser.decode(buffer);
            
            console.log(frame);
        };

        ws.onerror = (error) => {
            console.log('WebSocket error: ', error.type);
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
        };

        ws.binaryType = "arraybuffer";

        return ws;
    }

    send(
        cmd: number,
        sequence: number,
        data: Uint8Array
    ) {
        this.ws.send(new Parser().encode(cmd, sequence, data))
    }
}

export default Manager;