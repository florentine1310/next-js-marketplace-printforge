import sjson from 'secure-json-parse';
import type { CartCookie } from '../app/models/[modelId]/actions';

export function parseJson(json: string) {
  if (!json) return undefined;
  try {
    return sjson(json) as CartCookie[];
  } catch {
    return undefined;
  }
}
