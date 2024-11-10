export type TAttributes = Record<string, string>;

export interface IParseWrapper {
    tagName: string;
    attributes?: TAttributes;
    body: string;
}
