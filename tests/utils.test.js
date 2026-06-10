import { describe, test, expect } from "vitest"; 
import {
    validateMessage,
    extractResponseText,
    limitHistory
} from "../src/utils";

describe("utils.js", () => {

    test("validateMessage devuelve false si el mensaje está vacío", () => {
        expect(validateMessage("")).toBe(false);
    });

    test("validateMessage devuelve false si solo hay espacios en blanco", () => {
        expect(validateMessage("    ")).toBe(false);
    });

    test("validateMessage devuelve true para un mensaje de texto válido", () => {
        expect(validateMessage("Hola Edward, ¿cómo estás?")).toBe(true);
    });

    test("limitHistory mantiene solo los últimos mensajes según el límite", () => {
        const history = [
            { content: "Message 1" },
            { content: "Message 2" },
            { content: "Message 3" },
        ];
        expect(limitHistory(history, 2)).toEqual([
            { content: "Message 2" },
            { content: "Message 3" }
        ]);
    });

    test("extractResponseText extrae la propiedad 'reply' correctamente", () => {
        const data = { 
            reply: "No esperaba tu visita en Forks"
        };

        expect(extractResponseText(data)).toBe("No esperaba tu visita en Forks");
    });
    
    test("extractResponseText devuelve un fallback seguro ante un payload inválido o nulo", () => {
        const badData = { error: "Error en el servidor" };
        const nullData = null;

        expect(extractResponseText(badData)).toBe("No obtuve respuesta del personaje.");
        expect(extractResponseText(nullData)).toBe("No obtuve respuesta del personaje.");
    });
})