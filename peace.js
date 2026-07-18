import 'dart:convert';

import 'package:http/http.dart' as http;

class ApiService {
  static const String baseUrl =
      "https://peace-m-bible-backend.onrender.com";

  // ==========================
  // CREATE ACCOUNT
  // ==========================

  static Future<bool> register({
    required String name,
    required String email,
    required String phone,
  }) async {
    final response = await http.post(
      Uri.parse("$baseUrl/register"),
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonEncode({
        "name": name,
        "email": email,
        "phone": phone,
      }),
    );

    print("REGISTER: ${response.statusCode}");
    print(response.body);

    return response.statusCode == 200;
  }

  // ==========================
  // STK PUSH
  // ==========================

  static Future<Map<String, dynamic>> stkPush({
    required String phone,
    required int amount,
    required String plan,
  }) async {
    final response = await http.post(
      Uri.parse("$baseUrl/stkpush"),
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonEncode({
        "phoneNumber": phone,
        "amount": amount,
        "accountReference": "Peace M Bible",
        "transactionDesc": plan,
      }),
    );

    print("STK PUSH:");
    print(response.body);

    return jsonDecode(response.body);
  }

  // ==========================
  // PAYMENT STATUS
  // ==========================

  static Future<Map<String, dynamic>> paymentStatus(
      String checkoutId) async {
    final response = await http.get(
      Uri.parse("$baseUrl/status/$checkoutId"),
    );

    print("PAYMENT STATUS:");
    print(response.body);

    return jsonDecode(response.body);
  }

  // ==========================
  // ACTIVATE PREMIUM
  // ==========================

  static Future<void> activatePremium({
    required String phone,
    required String plan,
  }) async {
    final response = await http.post(
      Uri.parse("$baseUrl/activate"),
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonEncode({
        "phone": phone,
        "plan": plan,
      }),
    );

    print("ACTIVATE PREMIUM:");
    print(response.body);
  }

  // ==========================
  // CHECK PREMIUM
  // ==========================

  static Future<bool> premium(String phone) async {
    final response = await http.get(
      Uri.parse("$baseUrl/premium/$phone"),
    );

    print("CHECK PREMIUM:");
    print(response.body);

    final data = jsonDecode(response.body);

    return data["premium"] == true;
  }

  // ==========================
  // GET USER
  // ==========================

  static Future<Map<String, dynamic>> getUser(
      String phone) async {
    final response = await http.get(
      Uri.parse("$baseUrl/user/$phone"),
    );

    print("GET USER:");
    print(response.body);

    return jsonDecode(response.body);
  }
}
