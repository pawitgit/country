import * as bcrypt from "bcrypt";

async function encrypt(password: string): Promise<string> {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    return hash;
}

async function decrypt(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
}

export {encrypt, decrypt};