import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

import '../services/user_service.dart';

class PaymentScreen extends StatefulWidget {
  final Map plan;

  const PaymentScreen({
    super.key,
    required this.plan,
  });

  @override
  State<PaymentScreen> createState() => _PaymentScreenState();
}

class _PaymentScreenState extends State<PaymentScreen> {
  final phoneController = TextEditingController();

  bool loading = false;

  @override
  void initState() {
    super.initState();
    loadPhone();
  }

  Future<void> loadPhone() async {
    final user = await UserService.getUser();

    if (user != null) {
      phoneController.text = user.phone;
      setState(() {});
    }
  }

  Future<void> payNow() async {
    setState(() {
      loading = true;
    });

    try {
      final response = await http.post(
        Uri.parse(
          "YOUR_BACKEND_URL/stkpush",
        ),
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonEncode({
          "phoneNumber": phoneController.text.trim(),
          "amount": widget.plan["price"],
          "accountReference": "Peace M Bible",
          "transactionDesc":
              widget.plan["title"],
        }),
      );

      final data = jsonDecode(response.body);

      if (!mounted) return;

      Navigator.pushNamed(
        context,
        "/payment-status",
        arguments: {
          "checkoutRequestId":
              data["checkoutRequestId"],
          "plan": widget.plan,
        },
      );
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(e.toString()),
        ),
      );
    }

    setState(() {
      loading = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Confirm Payment"),
      ),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            TextField(
              controller: phoneController,
              keyboardType: TextInputType.phone,
              decoration: const InputDecoration(
                labelText: "Phone Number",
              ),
            ),

            const SizedBox(height: 25),

            Card(
              child: ListTile(
                title: Text(widget.plan["title"]),
                subtitle:
                    Text("KSh ${widget.plan["price"]}"),
              ),
            ),

            const Spacer(),

            SizedBox(
              width: double.infinity,
              height: 55,
              child: ElevatedButton(
                onPressed:
                    loading ? null : payNow,
                child: loading
                    ? const CircularProgressIndicator()
                    : const Text(
                        "Pay via M-Pesa",
                      ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
