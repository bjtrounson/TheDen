/// <reference types="next" />
/// <reference types="next/types/global" />

declare interface String {
    replaceAt(startIndex: number, endIndex: number, replacement: string): string;
}