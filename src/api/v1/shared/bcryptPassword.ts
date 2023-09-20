import * as bcrypt from "bcrypt";

async function encrypt(password: string) {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    return hash;
}

async function decrypt(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
}

export default {encrypt, decrypt};