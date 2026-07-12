import 'package:flutter/material.dart';

class ReadingPlanScreen extends StatelessWidget {
  const ReadingPlanScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final plans = [
      {
        "title": "30 Days with Jesus",
        "duration": "30 Days",
        "description": "Read the life and teachings of Jesus."
      },
      {
        "title": "Read the New Testament",
        "duration": "90 Days",
        "description": "Complete the New Testament."
      },
      {
        "title": "Read the Bible in One Year",
        "duration": "365 Days",
        "description": "Read the entire Bible."
      },
      {
        "title": "Psalms & Proverbs",
        "duration": "60 Days",
        "description": "Daily wisdom and encouragement."
      },
      {
        "title": "Prayer & Faith",
        "duration": "21 Days",
        "description": "Grow your prayer life."
      },
    ];

    return Scaffold(
      appBar: AppBar(
        title: const Text("Reading Plans"),
      ),
      body: ListView.builder(
        padding: const EdgeInsets.all(12),
        itemCount: plans.length,
        itemBuilder: (context, index) {
          final plan = plans[index];

          return Card(
            child: ListTile(
              leading: const CircleAvatar(
                child: Icon(Icons.calendar_month),
              ),
              title: Text(
                plan["title"]!,
                style: const TextStyle(
                  fontWeight: FontWeight.bold,
                ),
              ),
              subtitle: Text(
                "${plan["duration"]}\n${plan["description"]}",
              ),
              isThreeLine: true,
              trailing: ElevatedButton(
                child: const Text("Start"),
                onPressed: () {
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(
                      content: Text(
                        "${plan["title"]} started.",
                      ),
                    ),
                  );
                },
              ),
            ),
          );
        },
      ),
    );
  }
}
