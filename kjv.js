import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../providers/settings_provider.dart';
import '../services/api_service.dart';
import '../services/user_service.dart';

import 'create_account_screen.dart';
import 'subscription_screen.dart';

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

    showDialog(
      context: context,
      builder: (_) => AlertDialog(
        title: const Text("Premium Active"),
        content: Text("Opening $feature..."),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text("Continue"),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
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
          openPremium(
            context,
            title,
          );
        },
      ),
    );
  }
}
