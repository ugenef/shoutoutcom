export class EnvVarsProvider{
    getVar(name: string): string{
        const val = process.env[name];
        if(val){
            return val;
        }

        throw new Error(`Env ${name} is not set`);
    }
}