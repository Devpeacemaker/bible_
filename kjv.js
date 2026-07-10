import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../providers/settings_provider.dart';

class VersionScreen extends StatelessWidget {
  const VersionScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final settings = Provider.of<SettingsProvider>(context);

    return Scaffold(
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,

      appBar: AppBar(
        title: const Text("Premium"),
        centerTitle: true,
      ),

      body: ListView(
        padding: const EdgeInsets.all(20),
        children: [

          Container(
            padding: const EdgeInsets.all(24),
            decoration: BoxDecoration(
              color: Theme.of(context).colorScheme.primary,
              borderRadius: BorderRadius.circular(20),
            ),

            child: Column(
              children: [

                const Icon(
                  Icons.workspace_premium,
                  color: Colors.amber,
                  size: 70,
                ),

                const SizedBox(height: 15),

                Text(
                  "Peace M Bible Premium",
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: settings.fontSize + 7,
                    fontWeight: FontWeight.bold,
                  ),
                ),

                const SizedBox(height: 10),

                Text(
                  "Unlock premium Bible translations and powerful study features.",
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    color: Colors.white70,
                    height: 1.5,
                    fontSize: settings.fontSize - 2,
                  ),
                ),
              ],
            ),
          ),

          const SizedBox(height: 25),


premiumCard(
  context,
  settings,
  icon: Icons.language,
  title: "English Bible (ENG)",
  subtitle: "Unlock the complete English Bible translation.",
),

const SizedBox(height: 15),

premiumCard(
  context,
  settings,
  icon: Icons.public,
  title: "Kiswahili Bible (SWA)",
  subtitle: "Soma Biblia kwa Kiswahili.",
),

const SizedBox(height: 15),

premiumCard(
  context,
  settings,
  icon: Icons.note_alt_outlined,
  title: "Bible Notes",
  subtitle: "Write and organize personal notes for every verse.",
),

const SizedBox(height: 15),

premiumCard(
  context,
  settings,
  icon: Icons.headphones,
  title: "Audio Bible",
  subtitle: "Listen to the Bible anytime, anywhere.",
),

const SizedBox(height: 35),

SizedBox(
  width: double.infinity,
  height: 55,
  child: ElevatedButton.icon(
    style: ElevatedButton.styleFrom(
      backgroundColor: Theme.of(context).colorScheme.primary,
      foregroundColor: Theme.of(context).colorScheme.onPrimary,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(15),
      ),
    ),
    onPressed: () {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text(
            "Premium subscription coming soon.",
          ),
        ),
      );
    },
    icon: const Icon(Icons.workspace_premium),
    label: Text(
      "Upgrade to Premium",
      style: TextStyle(
        fontSize: settings.fontSize,
        fontWeight: FontWeight.bold,
      ),
    ),
  ),
),

const SizedBox(height: 30),
Widget premiumCard(
  BuildContext context,
  SettingsProvider settings, {
  required IconData icon,
  required String title,
  required String subtitle,
}) {
  return Card(
    elevation: 2,
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(18),
    ),
    child: ListTile(
      contentPadding: const EdgeInsets.all(16),

      leading: CircleAvatar(
        radius: 28,
        backgroundColor:
            Theme.of(context).colorScheme.primaryContainer,
        child: Icon(
          icon,
          color: Theme.of(context).colorScheme.primary,
        ),
      ),

      title: Text(
        title,
        style: TextStyle(
          fontWeight: FontWeight.bold,
          fontSize: settings.fontSize - 1,
        ),
      ),

      subtitle: Padding(
        padding: const EdgeInsets.only(top: 6),
        child: Text(
          subtitle,
          style: TextStyle(
            fontSize: settings.fontSize - 3,
          ),
        ),
      ),

      trailing: const Icon(
        Icons.lock,
        color: Colors.orange,
      ),

      onTap: () {
        showDialog(
          context: context,
          builder: (_) => AlertDialog(
            title: Text(
              title,
              style: TextStyle(
                fontSize: settings.fontSize + 1,
                fontWeight: FontWeight.bold,
              ),
            ),
            content: Text(
              "$title is available with Peace M Bible Premium.",
              style: TextStyle(
                fontSize: settings.fontSize - 1,
              ),
            ),
            actions: [
              TextButton(
                onPressed: () => Navigator.pop(context),
                child: const Text("Close"),
              ),
              ElevatedButton(
                onPressed: () {
                  Navigator.pop(context);

                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text(
                        "Premium subscription coming soon.",
                      ),
                    ),
                  );
                },
                child: const Text("Upgrade"),
              ),
            ],
          ),
        );
      },
    ),
  );
}
