import 'package:flutter/material.dart';

import '../models/user_model.dart';
import '../services/api_service.dart';
import '../services/user_service.dart';

class CreateAccountScreen extends StatefulWidget {
  const CreateAccountScreen({super.key});

  @override
  State<CreateAccountScreen> createState() =>
      _CreateAccountScreenState();
}

class _CreateAccountScreenState
    extends State<CreateAccountScreen> {

  final nameController = TextEditingController();
  final emailController = TextEditingController();
  final phoneController = TextEditingController();
  final passwordController = TextEditingController();

  bool loading = false;
  bool obscurePassword = true;

Future<void> createAccount() async {
  if (nameController.text.isEmpty ||
      emailController.text.isEmpty ||
      phoneController.text.isEmpty ||
      passwordController.text.isEmpty) {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text("Please fill all fields."),
      ),
    );
    return;
  }

  setState(() {
    loading = true;
  });

  try {
    final success = await ApiService.register(
      name: nameController.text.trim(),
      email: emailController.text.trim(),
      phone: phoneController.text.trim(),
    );

    if (!success) {
      throw Exception(
        "Failed to create account on server.",
      );
    }

    final id =
        "PMB${DateTime.now().millisecondsSinceEpoch}";

    final user = UserModel(
      id: id,
      fullName: nameController.text.trim(),
      email: emailController.text.trim(),
      phone: phoneController.text.trim(),
      password: passwordController.text,
    );

    await UserService.saveUser(user);

    if (!mounted) return;

    setState(() {
      loading = false;
    });

    Navigator.pop(context, true);

    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text(
          "Account created successfully.",
        ),
      ),
    );
  } catch (e) {
    if (!mounted) return;

    setState(() {
      loading = false;
    });

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(e.toString()),
      ),
    );
  }
}

  @override
  void dispose() {
    nameController.dispose();
    emailController.dispose();
    phoneController.dispose();
    passwordController.dispose();
    super.dispose();
  }

  InputDecoration inputDecoration({
    required String label,
    required IconData icon,
    Widget? suffixIcon,
  }) {
    return InputDecoration(
      filled: true,
      fillColor: Colors.white,
      prefixIcon: Icon(
        icon,
        color: Colors.deepPurple,
      ),
      suffixIcon: suffixIcon,
      labelText: label,
      labelStyle: const TextStyle(
        color: Colors.deepPurple,
      ),
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(18),
        borderSide: BorderSide.none,
      ),
      enabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(18),
        borderSide: BorderSide.none,
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(18),
        borderSide: const BorderSide(
          color: Colors.deepPurple,
          width: 2,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {

    return Scaffold(

      body: Container(

        decoration: const BoxDecoration(

          gradient: LinearGradient(

            colors: [

              Color(0xff5B2EFF),

              Color(0xff2F80ED),

              Color(0xff56CCF2),

            ],

            begin: Alignment.topLeft,

            end: Alignment.bottomRight,

          ),

        ),

        child: SafeArea(

          child: ListView(

            padding: const EdgeInsets.all(24),

            children: [

              const SizedBox(height: 20),

              Center(

                child: Image.asset(

                  "assets/images/peace_m_logo.png",

                  height: 110,

                ),

              ),

              const SizedBox(height: 20),

              const Center(

                child: Text(

                  "Create Account",

                  style: TextStyle(

                    color: Colors.white,

                    fontSize: 30,

                    fontWeight: FontWeight.bold,

                  ),

                ),

              ),

              const SizedBox(height: 10),

              const Center(

                child: Text(

                  "Join the Peace M Bible family\nand grow spiritually every day.",

                  textAlign: TextAlign.center,

                  style: TextStyle(

                    color: Colors.white70,

                    fontSize: 16,

                    height: 1.5,

                  ),

                ),

              ),

              const SizedBox(height: 35),

              Container(

                padding: const EdgeInsets.all(22),

                decoration: BoxDecoration(

                  color: Colors.white.withOpacity(.15),

                  borderRadius: BorderRadius.circular(28),

                ),

                child: Column(

                  children: [
                    TextField(
                      controller: nameController,
                      decoration: inputDecoration(
                        label: "Full Name",
                        icon: Icons.person,
                      ),
                      textCapitalization:
                          TextCapitalization.words,
                    ),

                    const SizedBox(height: 18),

                    TextField(
                      controller: emailController,
                      keyboardType:
                          TextInputType.emailAddress,
                      decoration: inputDecoration(
                        label: "Email Address",
                        icon: Icons.email,
                      ),
                    ),

                    const SizedBox(height: 18),

                    TextField(
                      controller: phoneController,
                      keyboardType:
                          TextInputType.phone,
                      decoration: inputDecoration(
                        label: "Phone Number",
                        icon: Icons.phone,
                      ).copyWith(
                        hintText: "2547XXXXXXXX",
                      ),
                    ),

                    const SizedBox(height: 18),

                    TextField(
                      controller: passwordController,
                      obscureText: obscurePassword,
                      decoration: inputDecoration(
                        label: "Password",
                        icon: Icons.lock,
                        suffixIcon: IconButton(
                          icon: Icon(
                            obscurePassword
                                ? Icons.visibility
                                : Icons.visibility_off,
                            color: Colors.deepPurple,
                          ),
                          onPressed: () {
                            setState(() {
                              obscurePassword =
                                  !obscurePassword;
                            });
                          },
                        ),
                      ),
                    ),

                    const SizedBox(height: 30),

                    SizedBox(
                      width: double.infinity,
                      height: 58,
                      child: ElevatedButton.icon(
                        onPressed:
                            loading ? null : createAccount,
                        icon: loading
                            ? const SizedBox(
                                width: 22,
                                height: 22,
                                child:
                                    CircularProgressIndicator(
                                  strokeWidth: 2.5,
                                  color: Colors.white,
                                ),
                              )
                            : const Icon(
                                Icons.person_add,
                                color: Colors.white,
                              ),
                        label: Text(
                          loading
                              ? "Creating Account..."
                              : "Create Account",
                          style: const TextStyle(
                            fontSize: 18,
                            fontWeight:
                                FontWeight.bold,
                          ),
                        ),
                        style:
                            ElevatedButton.styleFrom(
                          backgroundColor:
                              Colors.deepPurple,
                          foregroundColor:
                              Colors.white,
                          elevation: 8,
                          shape:
                              RoundedRectangleBorder(
                            borderRadius:
                                BorderRadius.circular(
                                    18),
                          ),
                        ),
                      ),
                    ),

                    const SizedBox(height: 20),

                    const Text(
                      "By creating an account, you agree to our\nTerms & Conditions and Privacy Policy.",
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 13,
                        height: 1.5,
                      ),
                    ),

                  ],
                ),
              ),

              const SizedBox(height: 25),
              const Center(
                child: Text(
                  "Read • Pray • Grow",
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 18,
                    fontStyle: FontStyle.italic,
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ),

              const SizedBox(height: 10),

              const Center(
                child: Text(
                  "Create your account to unlock a personalized\nBible reading experience.",
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    color: Colors.white70,
                    fontSize: 14,
                    height: 1.5,
                  ),
                ),
              ),

              const SizedBox(height: 35),

              Container(
                padding: const EdgeInsets.all(18),
                decoration: BoxDecoration(
                  color: Colors.white.withOpacity(.12),
                  borderRadius: BorderRadius.circular(20),
                ),
                child: const Column(
                  children: [

                    Text(
                      "Peace M Bible",
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 22,
                        fontWeight: FontWeight.bold,
                      ),
                    ),

                    SizedBox(height: 8),

                    Text(
                      "Version 1.0.0",
                      style: TextStyle(
                        color: Colors.white70,
                      ),
                    ),

                    SizedBox(height: 15),

                    Divider(
                      color: Colors.white30,
                    ),

                    SizedBox(height: 15),

                    Text(
                      "Developed with ❤️ by Peacemaker",
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        color: Colors.white,
                        fontWeight: FontWeight.w600,
                      ),
                    ),

                    SizedBox(height: 8),

                    Text(
                      "© 2026 Peace M Bible\nAll Rights Reserved.",
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        color: Colors.white70,
                        fontSize: 13,
                        height: 1.5,
                      ),
                    ),

                  ],
                ),
              ),

              const SizedBox(height: 30),

            ],
          ),
        ),
      ),
    );
  }
}
