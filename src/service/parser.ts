
class Parser {
    readonly VERSION = 1;
    readonly HEADER_SIZE = 5;
    
    constructor() {}

    encodeToUintArray<T>(data: T): Uint8Array {
        if (typeof data === "string") {
            return new TextEncoder().encode(data);
        } else if (typeof data === "number") {
            const buffer = new ArrayBuffer(8);
            new DataView(buffer).setFloat64(0, data);

            return new Uint8Array(buffer);
        } else if (data instanceof ArrayBuffer) {
            return new Uint8Array(data);
        } else if (data instanceof Uint8Array) {
            return data;
        } else if (typeof data === "object") {
            return new TextEncoder().encode(JSON.stringify(data));
        }
    
        throw new Error("Unsupported data type");
    }

    encode (
        cmd: number, 
        sequence: number, 
        data: Uint8Array): Uint8Array {
        const dataLength = data.length;
        const buffer = new ArrayBuffer(this.HEADER_SIZE + dataLength);
        const view = new DataView(buffer);
    
        view.setUint8(0, this.VERSION);
        view.setUint8(1, cmd);
        view.setUint8(2, sequence);
        view.setUint16(3, dataLength, false);
    
        const uint8View = new Uint8Array(buffer);
    
        uint8View.set(data, 5);
    
        return uint8View;
    }
    
    decode (buffer: Uint8Array) {
        if (buffer.length < this.HEADER_SIZE) {
            throw new Error("Buffer too small to be a valid packet");
        }

        const view = new DataView(buffer.buffer);
        const version = view.getUint8(0);
        const cmd = view.getUint8(1);
        const sequence = view.getUint8(2);
        const dataLength = view.getUint16(3, false);

        if (buffer.length < 5 + dataLength) {
            throw new Error("Buffer does not contain enough bytes for the specified data length");
        }

        const data = buffer.slice(this.HEADER_SIZE, this.HEADER_SIZE + dataLength);

        return {
            version,
            cmd,
            sequence,
            dataLength,
            data
        };
    } 
}

export default Parser;