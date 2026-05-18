import { describe, expect, it } from "vitest";
import { generateCodeChallenge } from "./generateCodeChallenge.js";
import { generateCodeVerifier } from "./generateCodeVerifier.js";

describe("PKCE", () => {
    it("should generate verifier", () => {
        const verifier = generateCodeVerifier();

        expect(verifier).toBeDefined();
        expect(verifier.length).toBeGreaterThan(40);
    });

    it("should generate challenge", () => {
        const verifier = generateCodeVerifier();

        const challenge = generateCodeChallenge(verifier);

        expect(challenge).toBeDefined();
        expect(typeof challenge).toBe("string");
    });
});