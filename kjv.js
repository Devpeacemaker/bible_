import 'package:flutter/material.dart';

import '../services/api_service.dart';
import 'payment_screen.dart';

class SubscriptionScreen extends StatefulWidget {
  const SubscriptionScreen({super.key});

  @override
  State<SubscriptionScreen> createState() =>
      _SubscriptionScreenState();
}

class _SubscriptionScreenState
    extends State<SubscriptionScreen> {
  int selectedPlan = 0;

  bool loading = false;

  final plans = [
    {
      "title": "2 Months",
      "price": 40,
      "months": 2,
    },
    {
      "title": "6 Months",
      "price": 350,
      "months": 6,
    },
    {
      "title": "1 Year",
      "price": 500,
      "months": 12,
    },
  ];

  Future<void> continuePayment() async {
    final plan = plans[selectedPlan];

    await Navigator.push(
      context,
      MaterialPageRoute(
        builder: (_) => PaymentScreen(
          title: plan["title"].toString(),
          amount: plan["price"] as int,
          months: plan["months"] as int,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Choose Subscription"),
      ),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            const Text(
              "Select a Premium Plan",
              style: TextStyle(
                fontSize: 22,
                fontWeight: FontWeight.bold,
              ),
            ),

            const SizedBox(height: 25),

            Expanded(
              child: ListView.builder(
                itemCount: plans.length,
                itemBuilder: (context, index) {
                  return Card(
                    elevation: selectedPlan == index ? 6 : 2,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(15),
                      side: BorderSide(
                        color: selectedPlan == index
                            ? Colors.purple
                            : Colors.transparent,
                        width: 2,
                      ),
                    ),
                    child: RadioListTile<int>(
                      value: index,
                      groupValue: selectedPlan,
                      onChanged: (value) {
                        setState(() {
                          selectedPlan = value!;
                        });
                      },
                      title: Text(
                        plans[index]["title"].toString(),
                        style: const TextStyle(
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      subtitle: Text(
                        "KSh ${plans[index]["price"]}",
                      ),
                    ),
                  );
                },
              ),
            ),

            const SizedBox(height: 20),

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
                      ? "Please wait..."
                      : "Continue to Payment",
                  style: const TextStyle(fontSize: 18),
                ),
                onPressed: loading
                    ? null
                    : () async {
                        setState(() {
                          loading = true;
                        });

                        await continuePayment();

                        if (mounted) {
                          setState(() {
                            loading = false;
                          });
                        }
                      },
              ),
            ),

            const SizedBox(height: 20),
          ],
        ),
      ),
    );
  }
}
