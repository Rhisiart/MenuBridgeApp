export interface IFrame {
    version: number,
    cmd: number,
    sequence: number,
    dataLength: number,
    data: Uint8Array
}