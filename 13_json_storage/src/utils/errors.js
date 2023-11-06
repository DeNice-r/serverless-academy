export class PathTakenError extends Error {
    constructor(path) {
        super(`Path ${path} is taken already`);
    }
}
