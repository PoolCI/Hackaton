import { GoogleGenerativeAI } from "@google/genai";

const genAI = new GoogleGenerativeAI("AIzaSyBPOU3nboyPqgMB5gAXZ1QjsSvO3i9IGD8");

// Elegís el modelo: gemini-pro (texto) o gemini-pro-vision (texto + imagen)
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const result = await model.generateContent("Explicame qué es una promesa en JS.");
const response = await result.response;
const text = response.text();

console.log(text);
