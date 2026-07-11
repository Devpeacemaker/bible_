class UserModel {
  final String id;
  final String fullName;
  final String email;
  final String phone;
  final String password;

  final bool isPremium;

  final String plan;

  final DateTime? subscribedOn;
  final DateTime? expiryDate;

  UserModel({
    required this.id,
    required this.fullName,
    required this.email,
    required this.phone,
    required this.password,
    this.isPremium = false,
    this.plan = "",
    this.subscribedOn,
    this.expiryDate,
  });

  Map<String, dynamic> toJson() {
    return {
      "id": id,
      "fullName": fullName,
      "email": email,
      "phone": phone,
      "password": password,
      "isPremium": isPremium,
      "plan": plan,
      "subscribedOn": subscribedOn?.toIso8601String(),
      "expiryDate": expiryDate?.toIso8601String(),
    };
  }

  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
      id: json["id"],
      fullName: json["fullName"],
      email: json["email"],
      phone: json["phone"],
      password: json["password"],
      isPremium: json["isPremium"] ?? false,
      plan: json["plan"] ?? "",
      subscribedOn: json["subscribedOn"] != null
          ? DateTime.parse(json["subscribedOn"])
          : null,
      expiryDate: json["expiryDate"] != null
          ? DateTime.parse(json["expiryDate"])
          : null,
    );
  }

  UserModel copyWith({
    bool? isPremium,
    String? plan,
    DateTime? subscribedOn,
    DateTime? expiryDate,
  }) {
    return UserModel(
      id: id,
      fullName: fullName,
      email: email,
      phone: phone,
      password: password,
      isPremium: isPremium ?? this.isPremium,
      plan: plan ?? this.plan,
      subscribedOn: subscribedOn ?? this.subscribedOn,
      expiryDate: expiryDate ?? this.expiryDate,
    );
  }
}
