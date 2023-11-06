export class LinkNotFoundError extends Error {
    constructor(token) {
        super(`Link with token ${token} not found`);
    }
}
