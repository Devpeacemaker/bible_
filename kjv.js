import 'dart:convert';
import 'package:http/http.dart' as http;

class AIService {
  static const String baseUrl =
      "https://peace-m-bible-backend.onrender.com";

  static Future<String> askBible(String question) async {
    try {
      final response = await http.post(
        Uri.parse("$baseUrl/ai"),
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonEncode({
          "question": question,
        }),
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);

        if (data["success"] == true) {
          return data["answer"];
        }

        return data["message"] ?? "Unknown error";
      }

      return "Server Error: ${response.statusCode}";
    } catch (e) {
      return "Connection Error: $e";
    }
  }
}
