import 'package:flutter/material.dart';

class PremiumDialog {
  static Future<void> show(
    BuildContext context, {
    required String feature,
  }) async {
    return showDialog(
      context: context,
      builder: (_) => AlertDialog(
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20),
        ),

        title: const Row(
          children: [
            Icon(
              Icons.workspace_premium,
              color: Colors.amber,
            ),
            SizedBox(width: 10),
            Text("Premium Feature"),
          ],
        ),

        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [

            Text(
              "$feature is available only in Peace M Bible Premium.",
            ),

            const SizedBox(height: 20),

            const Text(
              "Premium includes:",
              style: TextStyle(
                fontWeight: FontWeight.bold,
              ),
            ),

            const SizedBox(height: 10),

            const ListTile(
              leading: Icon(Icons.language),
              title: Text("English Bible (ENG)"),
            ),

            const ListTile(
              leading: Icon(Icons.public),
              title: Text("Kiswahili Bible (SWA)"),
            ),

            const ListTile(
              leading: Icon(Icons.note_alt),
              title: Text("Bible Notes"),
            ),

            const ListTile(
              leading: Icon(Icons.headphones),
              title: Text("Audio Bible"),
            ),
          ],
        ),

        actions: [

          TextButton(
            onPressed: () {
              Navigator.pop(context);
            },
            child: const Text("Later"),
          ),

          ElevatedButton.icon(
            icon: const Icon(Icons.payment),
            label: const Text("Upgrade"),

            onPressed: () {
              Navigator.pop(context);

              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (_) => const PremiumPaymentScreen(),
                ),
              );
            },
          ),
        ],
      ),
    );
  }
}

class PremiumPaymentScreen extends StatelessWidget {
  const PremiumPaymentScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Upgrade to Premium"),
      ),

      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [

            const Icon(
              Icons.workspace_premium,
              size: 90,
              color: Colors.amber,
            ),

            const SizedBox(height: 20),

            const Text(
              "Peace M Bible Premium",
              style: TextStyle(
                fontSize: 26,
                fontWeight: FontWeight.bold,
              ),
            ),

            const SizedBox(height: 20),

            const Text(
              "Unlock English Bible, Kiswahili Bible, Notes and Audio Bible.",
              textAlign: TextAlign.center,
            ),

            const SizedBox(height: 40),

            SizedBox(
              width: double.infinity,
              child: ElevatedButton.icon(
                icon: const Icon(Icons.phone_android),
                label: const Text("Pay with M-PESA"),

                onPressed: () {

                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text(
                        "Daraja integration will be connected here.",
                      ),
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
