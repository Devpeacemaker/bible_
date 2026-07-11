import 'dart:convert';

import 'package:http/http.dart' as http;

class ApiService {
  // ==========================
  // LIVE BACKEND
  // ==========================

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

    return response.statusCode == 200;
  }

  // ==========================
  // START STK PUSH
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

    return jsonDecode(response.body);
  }

  // ==========================
  // ACTIVATE PREMIUM
  // ==========================

  static Future<void> activatePremium({
    required String phone,
    required String plan,
  }) async {
    await http.post(
      Uri.parse("$baseUrl/activate"),
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonEncode({
        "phone": phone,
        "plan": plan,
      }),
    );
  }

  // ==========================
  // CHECK PREMIUM
  // ==========================

  static Future<bool> premium(String phone) async {
    final response = await http.get(
      Uri.parse("$baseUrl/premium/$phone"),
    );

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

    return jsonDecode(response.body);
  }
}
