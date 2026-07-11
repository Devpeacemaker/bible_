import 'package:flutter/material.dart';

class SubscriptionScreen extends StatefulWidget {
  const SubscriptionScreen({super.key});

  @override
  State<SubscriptionScreen> createState() => _SubscriptionScreenState();
}

class _SubscriptionScreenState extends State<SubscriptionScreen> {
  int selectedPlan = 0;

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
                    child: RadioListTile(
                      value: index,
                      groupValue: selectedPlan,
                      onChanged: (value) {
                        setState(() {
                          selectedPlan = value!;
                        });
                      },
                      title: Text(
                        plans[index]["title"].toString(),
                      ),
                      subtitle: Text(
                        "KSh ${plans[index]["price"]}",
                      ),
                    ),
                  );
                },
              ),
            ),

            SizedBox(
              width: double.infinity,
              height: 55,
              child: ElevatedButton(
                onPressed: () {
                  Navigator.pushNamed(
                    context,
                    "/payment",
                    arguments: plans[selectedPlan],
                  );
                },
                child: const Text(
                  "Continue",
                  style: TextStyle(fontSize: 18),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
