import 'package:flutter/material.dart';

import '../models/user_model.dart';
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
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Create Account"),
      ),
      body: ListView(
        padding: const EdgeInsets.all(20),
        children: [
          TextField(
            controller: nameController,
            decoration: const InputDecoration(
              labelText: "Full Name",
            ),
          ),

          const SizedBox(height: 15),

          TextField(
            controller: emailController,
            decoration: const InputDecoration(
              labelText: "Email",
            ),
          ),

          const SizedBox(height: 15),

          TextField(
            controller: phoneController,
            keyboardType: TextInputType.phone,
            decoration: const InputDecoration(
              labelText: "Phone Number",
              hintText: "2547XXXXXXXX",
            ),
          ),

          const SizedBox(height: 15),

          TextField(
            controller: passwordController,
            obscureText: true,
            decoration: const InputDecoration(
              labelText: "Password",
            ),
          ),

          const SizedBox(height: 30),

          SizedBox(
            height: 55,
            child: ElevatedButton(
              onPressed: loading ? null : createAccount,
              child: loading
                  ? const CircularProgressIndicator()
                  : const Text(
                      "Create Account",
                    ),
            ),
          ),
        ],
      ),
    );
  }
}
