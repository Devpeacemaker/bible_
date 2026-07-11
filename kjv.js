import 'package:flutter/material.dart';

import '../services/api_service.dart';
import '../services/user_service.dart';

class PaymentScreen extends StatefulWidget {
  final String title;
  final int amount;
  final int months;

  const PaymentScreen({
    super.key,
    required this.title,
    required this.amount,
    required this.months,
  });

  @override
  State<PaymentScreen> createState() =>
      _PaymentScreenState();
}

class _PaymentScreenState
    extends State<PaymentScreen> {
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
      final response = await ApiService.stkPush(
        phone: phoneController.text.trim(),
        amount: widget.amount,
        plan: widget.title,
      );

      if (!mounted) return;

      final checkoutId =
          response["checkoutRequestId"];

      Navigator.pushNamed(
        context,
        "/payment-status",
        arguments: {
          "checkoutRequestId": checkoutId,
          "phone": phoneController.text.trim(),
          "plan": widget.title,
          "months": widget.months,
        },
      );
    } catch (e) {
      if (!mounted) return;

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(e.toString()),
        ),
      );
    }

    if (mounted) {
      setState(() {
        loading = false;
      });
    }
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
                labelText: "M-PESA Phone Number",
                hintText: "2547XXXXXXXX",
                prefixIcon: Icon(Icons.phone),
                border: OutlineInputBorder(),
              ),
            ),

            const SizedBox(height: 25),

            Card(
              elevation: 3,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(15),
              ),
              child: ListTile(
                leading: const Icon(
                  Icons.workspace_premium,
                  color: Colors.amber,
                ),

                title: Text(
                  widget.title,
                  style: const TextStyle(
                    fontWeight: FontWeight.bold,
                  ),
                ),

                subtitle: Text(
                  "KSh ${widget.amount}\n"
                  "${widget.months} months premium access",
                ),
              ),
            ),

            const Spacer(),

            SizedBox(
              width: double.infinity,
              height: 55,
              child: ElevatedButton.icon(
                icon: loading
                    ? const SizedBox(
                        width: 22,
                        height: 22,
                        child: CircularProgressIndicator(
                          strokeWidth: 2,
                          color: Colors.white,
                        ),
                      )
                    : const Icon(Icons.payment),

                label: Text(
                  loading
                      ? "Sending Request..."
                      : "Pay via M-PESA",
                ),

                onPressed:
                    loading ? null : payNow,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
