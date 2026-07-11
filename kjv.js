import 'dart:convert';

import 'package:shared_preferences/shared_preferences.dart';

import '../models/user_model.dart';

class UserService {
  static const String _userKey = "peace_m_user";

  /// Save user
  static Future<void> saveUser(UserModel user) async {
    final prefs = await SharedPreferences.getInstance();

    await prefs.setString(
      _userKey,
      jsonEncode(user.toJson()),
    );
  }

  /// Get saved user
  static Future<UserModel?> getUser() async {
    final prefs = await SharedPreferences.getInstance();

    final data = prefs.getString(_userKey);

    if (data == null) return null;

    return UserModel.fromJson(
      jsonDecode(data),
    );
  }

  /// Check whether a user account exists
  static Future<bool> hasAccount() async {
    return await getUser() != null;
  }

  /// Delete account (Logout)
  static Future<void> deleteUser() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(_userKey);
  }

  /// Check if premium has expired
  static Future<bool> premiumExpired() async {
    final user = await getUser();

    if (user == null) return true;

    if (!user.isPremium) return true;

    if (user.expiryDate == null) return true;

    if (DateTime.now().isAfter(user.expiryDate!)) {
      final updated = user.copyWith(
        isPremium: false,
        plan: "",
        subscribedOn: null,
        expiryDate: null,
      );

      await saveUser(updated);

      return true;
    }

    return false;
  }

  /// Activate Premium
  static Future<void> activatePremium({
    required String plan,
    required int months,
  }) async {
    final user = await getUser();

    if (user == null) return;

    final start = DateTime.now();

    final expiry = DateTime(
      start.year,
      start.month + months,
      start.day,
    );

    final updated = user.copyWith(
      isPremium: true,
      plan: plan,
      subscribedOn: start,
      expiryDate: expiry,
    );

    await saveUser(updated);
  }
}
