import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../providers/settings_provider.dart';

class SettingsScreen extends StatelessWidget {
  const SettingsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final settings = Provider.of<SettingsProvider>(context);

    return Scaffold(
      appBar: AppBar(
        title: const Text("Settings"),
      ),

      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [

          const Text(
            "Appearance",
            style: TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
            ),
          ),

          const SizedBox(height: 15),

          Card(
            child: ListTile(
              leading: const Icon(Icons.light_mode),
              title: const Text("Theme"),
              subtitle: Text(settings.themeMode.name),

              onTap: () {
                showModalBottomSheet(
                  context: context,
                  builder: (_) {
                    return SafeArea(
                      child: Column(
                        mainAxisSize: MainAxisSize.min,
                        children: [

                          ListTile(
                            leading: const Icon(Icons.phone_android),
                            title: const Text("System"),
                            onTap: () {
                              settings.setThemeMode(ThemeMode.system);
                              Navigator.pop(context);
                            },
                          ),

                          ListTile(
                            leading: const Icon(Icons.light_mode),
                            title: const Text("Light"),
                            onTap: () {
                              settings.setThemeMode(ThemeMode.light);
                              Navigator.pop(context);
                            },
                          ),

                          ListTile(
                            leading: const Icon(Icons.dark_mode),
                            title: const Text("Dark"),
                            onTap: () {
                              settings.setThemeMode(ThemeMode.dark);
                              Navigator.pop(context);
                            },
                          ),
                        ],
                      ),
                    );
                  },
                );
              },
            ),
          ),

          const SizedBox(height: 20),

          Card(
            child: ListTile(
              leading: const Icon(Icons.format_size),
              title: const Text("Bible Font Size"),
              subtitle: Text("${settings.fontSize.toInt()}"),
            ),
          ),

          Slider(
            value: settings.fontSize,
            min: 14,
            max: 30,
            divisions: 16,
            label: settings.fontSize.toInt().toString(),
            onChanged: (value) {
              settings.setFontSize(value);
            },
          ),

          const SizedBox(height: 30),

          const Divider(),

          SwitchListTile(
            secondary: const Icon(Icons.notifications),
            title: const Text("Daily Verse Notification"),
            subtitle: const Text("Receive one verse every day"),
            value: settings.dailyVerse,
            onChanged: (value) {
              settings.setDailyVerse(value);
            },
          ),

          SwitchListTile(
            secondary: const Icon(Icons.volume_up),
            title: const Text("Reading Sounds"),
            subtitle: const Text("Play tap sounds"),
            value: settings.soundEnabled,
            onChanged: (value) {
              settings.setSoundEnabled(value);
            },
          ),

          SwitchListTile(
            secondary: const Icon(Icons.screen_lock_portrait),
            title: const Text("Keep Screen Awake"),
            subtitle: const Text("While reading"),
            value: settings.keepScreenOn,
            onChanged: (value) {
              settings.setKeepScreenOn(value);
            },
          ),

          const SizedBox(height: 25),

          const Text(
            "About",
            style: TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
            ),
          ),

          const SizedBox(height: 10),

          const Card(
            child: ListTile(
              leading: Icon(Icons.menu_book),
              title: Text("Peace M Bible"),
              subtitle: Text("Version 1.0.0"),
            ),
          ),
        ],
      ),
    );
  }
}
