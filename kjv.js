import 'package:flutter/material.dart';

class VersionScreen extends StatelessWidget {
  const VersionScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xffF5F5F5),

      appBar: AppBar(
        title: const Text("Premium"),
        backgroundColor: Colors.deepPurple,
        foregroundColor: Colors.white,
        centerTitle: true,
      ),

      body: ListView(
        padding: const EdgeInsets.all(20),
        children: [

          Container(
            padding: const EdgeInsets.all(24),
            decoration: BoxDecoration(
              color: Colors.deepPurple,
              borderRadius: BorderRadius.circular(20),
            ),

            child: const Column(
              children: [

                Icon(
                  Icons.workspace_premium,
                  color: Colors.amber,
                  size: 70,
                ),

                SizedBox(height: 15),

                Text(
                  "Peace M Bible Premium",
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 25,
                    fontWeight: FontWeight.bold,
                  ),
                ),

                SizedBox(height: 10),

                Text(
                  "Unlock premium Bible translations and powerful study features.",
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    color: Colors.white70,
                    height: 1.5,
                    fontSize: 16,
                  ),
                ),
              ],
            ),
          ),

          const SizedBox(height: 25),
          premiumCard(
            context,
            icon: Icons.language,
            title: "English Bible (ENG)",
            subtitle:
                "Unlock the complete English Bible translation.",
          ),

          const SizedBox(height: 15),

          premiumCard(
            context,
            icon: Icons.public,
            title: "Kiswahili Bible (SWA)",
            subtitle:
                "Soma Biblia kwa Kiswahili.",
          ),

          const SizedBox(height: 15),

          premiumCard(
            context,
            icon: Icons.note_alt_outlined,
            title: "Bible Notes",
            subtitle:
                "Write and organize personal notes for every verse.",
          ),

          const SizedBox(height: 15),

          premiumCard(
            context,
            icon: Icons.headphones,
            title: "Audio Bible",
            subtitle:
                "Listen to the Bible anytime, anywhere.",
          ),

          const SizedBox(height: 35),

          SizedBox(
            width: double.infinity,
            height: 55,
            child: ElevatedButton.icon(
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.deepPurple,
                foregroundColor: Colors.white,
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
              label: const Text(
                "Upgrade to Premium",
                style: TextStyle(fontSize: 18),
              ),
            ),
          ),

          const SizedBox(height: 30),
        ],
      ),
    );
  }

  Widget premiumCard(
    BuildContext context, {
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
          backgroundColor: Colors.deepPurple.shade100,
          child: Icon(
            icon,
            color: Colors.deepPurple,
          ),
        ),
        title: Text(
          title,
          style: const TextStyle(
            fontWeight: FontWeight.bold,
            fontSize: 17,
          ),
        ),
        subtitle: Padding(
          padding: const EdgeInsets.only(top: 6),
          child: Text(subtitle),
        ),
        trailing: const Icon(
          Icons.lock,
          color: Colors.orange,
        ),
        onTap: () {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              content: Text("$title is available in Premium."),
            ),
          );
        },
      ),
    );
  }
}
