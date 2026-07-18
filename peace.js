import 'dart:async';

import 'package:flutter/material.dart';

import '../services/api_service.dart';
import '../services/user_service.dart';

class PaymentStatusScreen extends StatefulWidget {
  final String checkoutRequestId;
  final String phone;
  final String plan;
  final int months;

  const PaymentStatusScreen({
    super.key,
    required this.checkoutRequestId,
    required this.phone,
    required this.plan,
    required this.months,
  });

  @override
  State<PaymentStatusScreen> createState() =>
      _PaymentStatusScreenState();
}

class _PaymentStatusScreenState
    extends State<PaymentStatusScreen> {
  Timer? timer;

  String status = "Waiting for M-PESA payment...";

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
      final data = await ApiService.paymentStatus(
        widget.checkoutRequestId,
      );

      if (data["status"] == "completed") {
        timer?.cancel();

        // Activate premium on server
        await ApiService.activatePremium(
          phone: widget.phone,
          plan: widget.plan,
        );

        // Activate premium locally
        await UserService.activatePremium(
          plan: widget.plan,
          months: widget.months,
        );

        if (!mounted) return;

        showDialog(
          context: context,
          barrierDismissible: false,
          builder: (_) => AlertDialog(
            title: const Text("Payment Successful"),
            content: Text(
              "Your ${widget.plan} subscription has been activated successfully.",
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
          ),
        );

        return;
      }

      if (data["status"] == "failed") {
        timer?.cancel();

        setState(() {
          status = "Payment Failed";
        });

        return;
      }

      if (data["status"] == "cancelled") {
        timer?.cancel();

        setState(() {
          status = "Payment Cancelled";
        });

        return;
      }

      setState(() {
        status = "Waiting for M-PESA confirmation...";
      });
    } catch (e) {
      setState(() {
        status = "Checking payment...";
      });
    }
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

              const SizedBox(height: 30),

              Text(
                status,
                textAlign: TextAlign.center,
                style: const TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.w600,
                ),
              ),

              const SizedBox(height: 20),

              const Text(
                "Complete the M-PESA prompt on your phone.\n"
                "The payment status will be checked automatically every 5 seconds.",
                textAlign: TextAlign.center,
                style: TextStyle(
                  color: Colors.grey,
                ),
              ),

              const SizedBox(height: 35),

              SizedBox(
                width: double.infinity,
                height: 50,
                child: OutlinedButton.icon(
                  icon: const Icon(Icons.refresh),
                  label: const Text("Check Now"),
                  onPressed: checkPayment,
                ),
              ),

              const SizedBox(height: 15),

              SizedBox(
                width: double.infinity,
                height: 50,
                child: TextButton.icon(
                  icon: const Icon(Icons.close),
                  label: const Text("Cancel"),
                  onPressed: () {
                    timer?.cancel();
                    Navigator.pop(context);
                  },
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  @override
  void dispose() {
    timer?.cancel();
    super.dispose();
  }
}
