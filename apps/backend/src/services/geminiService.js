/**
 * services/geminiService.js — Gemini AI integration (PLACEHOLDER).
 *
 * Proposal ref: §5.4 (summaries), §5.5 (quizzes), §5.6 (planner), §7, §8.
 *
 * This is the single integration point where the AI provider is called. It is
 * NOT implemented yet and makes NO network calls. When implemented it will:
 *   - read the Gemini key/model via config/gemini.js (server-side only),
 *   - build prompts for summary / quiz / plan generation,
 *   - validate the model response against a schema (see validators/),
 *   - return structured results to controllers.
 *
 * SECURITY: The Gemini API key lives ONLY in backend/.env and is never sent
 * to the mobile app. Never log prompts containing private study content.
 */

'use strict';

const { getGeminiConfig } = require('../config/gemini');

/**
 * Generates a summary for the given study content — NOT IMPLEMENTED YET.
 * @param {{content: string}} _input
 * @throws {Error} always, until feature development implements it
 */
async function generateSummary(_input) {
  getGeminiConfig(); // surfaces a clear setup error if the key is missing
  throw new Error('Gemini summary generation is not implemented yet.');
}

/**
 * Generates a multiple-choice quiz — NOT IMPLEMENTED YET.
 * @param {{topic: string, difficulty: string}} _input
 * @throws {Error} always, until feature development implements it
 */
async function generateQuiz(_input) {
  getGeminiConfig();
  throw new Error('Gemini quiz generation is not implemented yet.');
}

/**
 * Suggests a study plan — NOT IMPLEMENTED YET.
 * @param {{topics: string[], examDate: string}} _input
 * @throws {Error} always, until feature development implements it
 */
async function generateStudyPlan(_input) {
  getGeminiConfig();
  throw new Error('Gemini study-plan generation is not implemented yet.');
}

module.exports = { generateSummary, generateQuiz, generateStudyPlan };
