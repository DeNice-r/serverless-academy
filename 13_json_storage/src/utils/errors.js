export class PathTakenError extends Error {
    constructor(path) {
        super(`Path ${path} is taken already`);
    }
}

export class PathNotFoundError extends Error {
    constructor(path) {
        super(`Path ${path} is not found`);
    }
}
