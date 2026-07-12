import 'package:flutter/material.dart';

class DailyDevotionalScreen extends StatelessWidget {
  const DailyDevotionalScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final devotionals = [
      {
        "title": "Walking by Faith",
        "verse": "2 Corinthians 5:7",
        "message":
            "Trust God even when you cannot see the whole path before you. Faith grows as we depend on Him daily."
      },
      {
        "title": "God's Love",
        "verse": "John 3:16",
        "message":
            "God's love is unconditional. Receive it, believe it and share it with others."
      },
      {
        "title": "Strength for Today",
        "verse": "Isaiah 41:10",
        "message":
            "Do not fear. God promises to strengthen and uphold everyone who trusts in Him."
      },
      {
        "title": "Peace of Christ",
        "verse": "Philippians 4:6-7",
        "message":
            "Prayer replaces anxiety with the peace that only Christ can give."
      },
      {
        "title": "Hope",
        "verse": "Romans 15:13",
        "message":
            "May God fill you with joy, peace and hope through the Holy Spirit."
      },
    ];

    return Scaffold(
      appBar: AppBar(
        title: const Text("Daily Devotionals"),
      ),
      body: ListView.builder(
        padding: const EdgeInsets.all(15),
        itemCount: devotionals.length,
        itemBuilder: (context, index) {
          final item = devotionals[index];

          return Card(
            elevation: 3,
            margin: const EdgeInsets.only(bottom: 15),
            child: Padding(
              padding: const EdgeInsets.all(18),
              child: Column(
                crossAxisAlignment:
                    CrossAxisAlignment.start,
                children: [
                  Text(
                    item["title"]!,
                    style: const TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    item["verse"]!,
                    style: const TextStyle(
                      color: Colors.purple,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 15),
                  Text(
                    item["message"]!,
                    style: const TextStyle(
                      height: 1.6,
                      fontSize: 16,
                    ),
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}
