const groq = require("../config/groq");

const {
  detectLanguage,
} = require("../utils/languageDetector");

const generateMedicalResponse =
  async (transcript) => {
    try {
      console.log(
        "━━━━━━━━━━━━━━━━━━━━━━"
      );

      console.log(
        "GENERATING AI RESPONSE"
      );

      console.log(
        "━━━━━━━━━━━━━━━━━━━━━━"
      );

      // DETECT LANGUAGE
      const detectedLanguage =
        detectLanguage(
          transcript
        ) || "English";

      console.log(
        "Detected Language:",
        detectedLanguage
      );

      const completion =
        await groq.chat.completions.create({
          model:
            "llama-3.3-70b-versatile",

          messages: [
            {
              role: "system",

              content: `
You are SakhiAI, a safe healthcare AI assistant.

IMPORTANT:
You MUST return ONLY valid JSON.

DO NOT return markdown.
DO NOT return explanations.
DO NOT return text before JSON.
DO NOT return text after JSON.

STRICT JSON FORMAT:

{
  "risk_level": "LOW | MEDIUM | HIGH",
  "possible_concern": "short concern",
  "warning_signs": ["warning 1", "warning 2"],
  "recommended_action": "short action",
  "response_for_user": "patient-safe response"
}

RULES:
- Reply in ${detectedLanguage}
- Never diagnose
- Never prescribe medicines
- Keep response concise
- Use simple language
- If unclear, ask for more symptoms
`,
            },

            {
              role: "user",

              content: transcript,
            },
          ],

          temperature: 0.2,
        });

      const rawResponse =
        completion.choices?.[0]
          ?.message?.content || "";

      console.log(
        "RAW LLM RESPONSE:"
      );

      console.log(rawResponse);

      // EXTRACT JSON SAFELY
      const jsonMatch =
        rawResponse.match(
          /\{[\s\S]*\}/
        );

      if (!jsonMatch) {
        throw new Error(
          "No valid JSON found in LLM response"
        );
      }

      const parsedResponse =
        JSON.parse(
          jsonMatch[0]
        );

      return parsedResponse;

    } catch (error) {
      console.error(
        "LLM Error:",
        error
      );

      return {
        risk_level: "LOW",

        possible_concern:
          "Unable to determine symptoms clearly",

        warning_signs: [],

        recommended_action:
          "Please provide clearer symptoms",

        response_for_user:
          "I could not fully understand the symptoms. Please try speaking more clearly and provide more details.",
      };
    }
  };

module.exports = {
  generateMedicalResponse,
};