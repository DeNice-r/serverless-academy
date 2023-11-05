export class EmailTakenError extends Error {
    constructor(message = "Email is taken already") {
        super(message);
    }
}

export class InvalidCredentialsError extends Error {
    constructor(message = "Invalid email or password") {
        super(message);
    }
}

export class InvalidIdError extends Error {
    constructor(message = "Invalid id") {
        super(message);
    }
}
