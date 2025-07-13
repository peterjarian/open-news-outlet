import { err, ok } from 'neverthrow';

export function tryJSONParse<TData>(data: string) {
    try {
        const json = JSON.parse(data);
        return ok(json as TData);
    } catch (error) {
        return err(error as Error);
    }
}
