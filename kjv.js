import 'package:flutter/material.dart';
import '../services/settings_service.dart';

class SettingsScreen extends StatefulWidget {
  const SettingsScreen({super.key});

  @override
  State<SettingsScreen> createState() => _SettingsScreenState();
}

class _SettingsScreenState extends State<SettingsScreen> {
  ThemeMode themeMode = ThemeMode.system;
  double fontSize = 18;

  @override
  void initState() {
    super.initState();
    loadSettings();
  }

  Future<void> loadSettings() async {
    themeMode = await SettingsService.getThemeMode();
    fontSize = await SettingsService.getFontSize();

    setState(() {});
  }

  Future<void> changeTheme(ThemeMode mode) async {
    await SettingsService.saveThemeMode(mode);

    setState(() {
      themeMode = mode;
    });

    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text("Theme saved"),
      ),
    );
  }

  Future<void> changeFont(double size) async {
    await SettingsService.saveFontSize(size);

    setState(() {
      fontSize = size;
    });

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text("Font Size: ${size.toInt()}"),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xffF5F5F5),

      appBar: AppBar(
        title: const Text("Settings"),
        backgroundColor: Colors.deepPurple,
        foregroundColor: Colors.white,
      ),

      body: ListView(
        padding: const EdgeInsets.all(18),
        children: [

          const Text(
            "Appearance",
            style: TextStyle(
              fontSize: 22,
              fontWeight: FontWeight.bold,
            ),
          ),

          const SizedBox(height: 15),

          Card(
            child: ListTile(
              leading: const Icon(Icons.brightness_6),
              title: const Text("Theme"),
              subtitle: Text(themeMode.name),
              trailing: const Icon(Icons.arrow_drop_down),
              onTap: () {
                showModalBottomSheet(
                  context: context,
                  builder: (_) => Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [

                      ListTile(
                        leading: const Icon(Icons.phone_android),
                        title: const Text("System"),
                        onTap: () {
                          Navigator.pop(context);
                          changeTheme(ThemeMode.system);
                        },
                      ),

                      ListTile(
                        leading: const Icon(Icons.light_mode),
                        title: const Text("Light"),
                        onTap: () {
                          Navigator.pop(context);
                          changeTheme(ThemeMode.light);
                        },
                      ),

                      ListTile(
                        leading: const Icon(Icons.dark_mode),
                        title: const Text("Dark"),
                        onTap: () {
                          Navigator.pop(context);
                          changeTheme(ThemeMode.dark);
                        },
                      ),
                    ],
                  ),
                );
              },
            ),
          ),

          Card(
            child: ListTile(
              leading: const Icon(Icons.format_size),
              title: const Text("Bible Font Size"),
              subtitle: Text("${fontSize.toInt()}"),
            ),
          ),

          Slider(
            value: fontSize,
            min: 14,
            max: 30,
            divisions: 8,
            label: fontSize.toInt().toString(),
            onChanged: (value) {
              changeFont(value);
            },
          ),

          const SizedBox(height: 25),

          const Text(
            "About",
            style: TextStyle(
              fontSize: 22,
              fontWeight: FontWeight.bold,
            ),
          ),

          const SizedBox(height: 15),

          const Card(
            child: ListTile(
              leading: Icon(Icons.info_outline),
              title: Text("Peace M Bible"),
              subtitle: Text("Version 1.0.0"),
            ),
          ),
        ],
      ),
    );
  }
}
