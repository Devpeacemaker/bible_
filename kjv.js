import 'dart:convert';
import 'package:http/http.dart' as http;

class AIService {
  // Replace with your own Gemini API key in your local project.
  static const String apiKey = "AQ.Ab8RN6IZoVVsrvaLFF4YIM4pzrAtr_-bGizHVTEyh_P1sqfPsw";

  static Future<String> askBible(String question) async {
    final url = Uri.parse(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=$apiKey",
    );

    final response = await http.post(
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonEncode({
        "contents": [
          {
            "parts": [
              {
                "text":
                    "You are PEACE M Bible AI. Answer only Bible-related questions. Base your answers on Scripture. Quote relevant Bible verses where appropriate. If asked about non-Bible topics, politely explain that you are a Bible assistant.\n\nQuestion: $question"
              }
            ]
          }
        ]
      }),
    );

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      return data["candidates"][0]["content"]["parts"][0]["text"];
    }

    return "Unable to get a response from the AI service.";
  }
}
