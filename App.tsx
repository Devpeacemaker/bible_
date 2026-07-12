import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../providers/settings_provider.dart';
import '../services/api_service.dart';
import '../services/user_service.dart';

import 'create_account_screen.dart';
import 'subscription_screen.dart';
import 'notes_screen.dart';
import 'dictionary_screen.dart';
import 'audio_bible_screen.dart';
import 'concordance_screen.dart';
import 'cross_reference_screen.dart';
import 'reading_plan_screen.dart';
import 'daily_devotional_screen.dart';
import 'ai_bible_assistant_screen.dart';
import 'eng_books_screen.dart';

class VersionScreen extends StatelessWidget {
  const VersionScreen({super.key});

  Future<void> openPremium(
    BuildContext context,
    String feature,
  ) async {
    final hasAccount = await UserService.hasAccount();

    if (!context.mounted) return;

    if (!hasAccount) {
      final created = await Navigator.push(
        context,
        MaterialPageRoute(
          builder: (_) => const CreateAccountScreen(),
        ),
      );

      if (created == true && context.mounted) {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (_) => const SubscriptionScreen(),
          ),
        );
      }

      return;
    }

    final user = await UserService.getUser();

    if (user == null) return;

    final premium = await ApiService.premium(user.phone);

    if (!context.mounted) return;

    if (!premium) {
      Navigator.push(
        context,
        MaterialPageRoute(
          builder: (_) => const SubscriptionScreen(),
        ),
      );
      return;
    }

    // Navigation to premium features
    switch (feature) {
      case "English Bible (ENG)":
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (_) => EngBooksScreen(),
          ),
        );
        break;

      case "Kiswahili Bible (SWA)":
        Navigator.pop(context, "swa");
        break;

      case "Audio Bible":
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (_) => const AudioBibleScreen(),
          ),
        );
        break;

      case "Bible Notes":
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (_) => const NotesScreen(),
          ),
        );
        break;

      case "Bible Dictionary":
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (_) => const DictionaryScreen(),
          ),
        );
        break;

      case "Concordance":
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (_) => const ConcordanceScreen(),
          ),
        );
        break;

      case "Cross References":
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (_) => const CrossReferenceScreen(),
          ),
        );
        break;

      case "Reading Plans":
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (_) => const ReadingPlanScreen(),
          ),
        );
        break;

      case "Daily Devotionals":
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (_) => const DailyDevotionalScreen(),
          ),
        );
        break;

      case "AI Bible Assistant":
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (_) => const AIBibleAssistantScreen(),
          ),
        );
        break;
    }
  }
  Widget premiumCard(
    BuildContext context,
    SettingsProvider settings, {
    required IconData icon,
    required String title,
    required String subtitle,
  }) {
    return Card(
      elevation: 3,
      margin: const EdgeInsets.only(bottom: 15),
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
          Icons.arrow_forward_ios,
          size: 18,
        ),
        onTap: () {
          openPremium(context, title);
        },
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final settings = Provider.of<SettingsProvider>(context);

    return Scaffold(
      appBar: AppBar(
        title: const Text("Peace M Bible Premium"),
        centerTitle: true,
      ),
      body: ListView(
        padding: const EdgeInsets.all(20),
        children: [
          Container(
            padding: const EdgeInsets.all(24),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(20),
              gradient: const LinearGradient(
                colors: [
                  Colors.deepPurple,
                  Colors.purple,
                ],
              ),
            ),
            child: Column(
              children: [
                const Icon(
                  Icons.workspace_premium,
                  size: 80,
                  color: Colors.amber,
                ),
                const SizedBox(height: 15),
                Text(
                  "Peace M Bible Premium",
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: settings.fontSize + 8,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 10),
                const Text(
                  "Unlock every premium feature for an amazing Bible study experience.",
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    color: Colors.white70,
                    height: 1.5,
                  ),
                ),
              ],
            ),
          ),

          const SizedBox(height: 25),

          Text(
            "Bible Versions",
            style: TextStyle(
              fontSize: settings.fontSize + 2,
              fontWeight: FontWeight.bold,
            ),
          ),

          const SizedBox(height: 15),

          premiumCard(
            context,
            settings,
            icon: Icons.language,
            title: "English Bible (ENG)",
            subtitle: "Premium English translation.",
          ),

          premiumCard(
            context,
            settings,
            icon: Icons.public,
            title: "Kiswahili Bible (SWA)",
            subtitle: "Biblia Takatifu ya Kiswahili.",
          ),

          const SizedBox(height: 20),

          Text(
            "Study Tools",
            style: TextStyle(
              fontSize: settings.fontSize + 2,
              fontWeight: FontWeight.bold,
            ),
          ),

          const SizedBox(height: 15),
          premiumCard(
            context,
            settings,
            icon: Icons.headphones,
            title: "Audio Bible",
            subtitle: "Listen to the Bible anytime.",
          ),

          premiumCard(
            context,
            settings,
            icon: Icons.note_alt_outlined,
            title: "Bible Notes",
            subtitle: "Write and organize your personal notes.",
          ),

          premiumCard(
            context,
            settings,
            icon: Icons.menu_book,
            title: "Bible Dictionary",
            subtitle: "Understand biblical words and meanings.",
          ),

          premiumCard(
            context,
            settings,
            icon: Icons.search,
            title: "Concordance",
            subtitle: "Search words across the entire Bible.",
          ),

          premiumCard(
            context,
            settings,
            icon: Icons.link,
            title: "Cross References",
            subtitle: "Discover related Bible verses.",
          ),

          const SizedBox(height: 20),

          Text(
            "Growth",
            style: TextStyle(
              fontSize: settings.fontSize + 2,
              fontWeight: FontWeight.bold,
            ),
          ),

          const SizedBox(height: 15),

          premiumCard(
            context,
            settings,
            icon: Icons.calendar_today,
            title: "Reading Plans",
            subtitle: "Follow guided Bible reading plans.",
          ),

          premiumCard(
            context,
            settings,
            icon: Icons.wb_sunny,
            title: "Daily Devotionals",
            subtitle: "Read inspiring devotionals every day.",
          ),

          premiumCard(
            context,
            settings,
            icon: Icons.smart_toy,
            title: "AI Bible Assistant",
            subtitle: "Ask Bible questions and receive instant answers.",
          ),

          const SizedBox(height: 30),

          SizedBox(
            width: double.infinity,
            height: 55,
            child: ElevatedButton.icon(
              icon: const Icon(Icons.workspace_premium),
              label: const Text(
                "Upgrade to Premium",
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 18,
                ),
              ),
              onPressed: () {
                openPremium(
                  context,
                  "Peace M Bible Premium",
                );
              },
            ),
          ),

          const SizedBox(height: 30),
        ],
      ),
    );
  }
}
