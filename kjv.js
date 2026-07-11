import 'dart:async';
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

import '../services/user_service.dart';

class PaymentStatusScreen extends StatefulWidget {
  final String checkoutRequestId;
  final Map plan;

  const PaymentStatusScreen({
    super.key,
    required this.checkoutRequestId,
    required this.plan,
  });

  @override
  State<PaymentStatusScreen> createState() =>
      _PaymentStatusScreenState();
}

class _PaymentStatusScreenState
    extends State<PaymentStatusScreen> {
  Timer? timer;

  String status = "Waiting for payment...";

  @override
  void initState() {
    super.initState();

    timer = Timer.periodic(
      const Duration(seconds: 5),
      (_) => checkPayment(),
    );
  }

  Future<void> checkPayment() async {
    try {
      final response = await http.get(
        Uri.parse(
          "YOUR_BACKEND_URL/status/${widget.checkoutRequestId}",
        ),
      );

      final data = jsonDecode(response.body);

      if (data["status"] == "completed") {
        timer?.cancel();

        await UserService.activatePremium(
          plan: widget.plan["title"],
          months: widget.plan["months"],
        );

        if (!mounted) return;

        showDialog(
          context: context,
          barrierDismissible: false,
          builder: (_) {
            return AlertDialog(
              title: const Text("Payment Successful"),
              content: Text(
                "Your ${widget.plan["title"]} subscription has been activated successfully.",
              ),
              actions: [
                TextButton(
                  onPressed: () {
                    Navigator.pop(context);
                    Navigator.popUntil(
                      context,
                      (route) => route.isFirst,
                    );
                  },
                  child: const Text("Continue"),
                ),
              ],
            );
          },
        );
      } else if (data["status"] == "failed") {
        timer?.cancel();

        setState(() {
          status = "Payment Failed";
        });
      } else if (data["status"] == "cancelled") {
        timer?.cancel();

        setState(() {
          status = "Payment Cancelled";
        });
      } else {
        setState(() {
          status = "Waiting for M-Pesa confirmation...";
        });
      }
    } catch (e) {
      setState(() {
        status = "Checking payment...";
      });
    }
  }

  @override
  void dispose() {
    timer?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Processing Payment"),
      ),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(25),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const CircularProgressIndicator(),

              const SizedBox(height: 25),

              Text(
                status,
                textAlign: TextAlign.center,
                style: const TextStyle(
                  fontSize: 18,
                ),
              ),

              const SizedBox(height: 20),

              const Text(
                "Complete the M-Pesa prompt on your phone.",
                textAlign: TextAlign.center,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
