import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

import '../providers/settings_provider.dart';
import '../services/user_service.dart';
import '../models/user_model.dart';

import 'terms_conditions_screen.dart';
import 'privacy_policy_screen.dart';

class SettingsScreen extends StatefulWidget {
  const SettingsScreen({super.key});

  @override
  State<SettingsScreen> createState() =>
      _SettingsScreenState();
}

class _SettingsScreenState extends State<SettingsScreen> {

  UserModel? user;

  @override
  void initState() {
    super.initState();
    loadUser();
  }

  Future<void> loadUser() async {
    final savedUser =
        await UserService.getUser();

    setState(() {
      user = savedUser;
    });
  }

  Future<void> _openWhatsApp() async {
    final Uri url = Uri.parse(
      "https://wa.me/254752818245?text=Hello%20Peacemaker,%20I%20need%20help%20with%20Peace%20M%20Bible%20app",
    );

    if (await canLaunchUrl(url)) {
      await launchUrl(
        url,
        mode: LaunchMode.externalApplication,
      );
    }
  }

  @override
  Widget build(BuildContext context) {

    final settings =
        Provider.of<SettingsProvider>(context);
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            colors: [
              Color(0xff5B2EFF),
              Color(0xff2F80ED),
              Color(0xff56CCF2),
            ],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
        ),

        child: SafeArea(
          child: ListView(
            padding: const EdgeInsets.all(20),

            children: [

              const Center(
                child: Text(
                  "Settings",
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 30,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),

              const SizedBox(height: 25),

              Container(
                padding: const EdgeInsets.all(20),

                decoration: BoxDecoration(
                  color: Colors.white.withOpacity(.15),
                  borderRadius: BorderRadius.circular(25),
                ),

                child: Row(
                  children: [

                    const CircleAvatar(
                      radius: 35,
                      backgroundColor: Colors.white,
                      child: Icon(
                        Icons.person,
                        size: 40,
                        color: Colors.deepPurple,
                      ),
                    ),

                    const SizedBox(width: 20),

                    Expanded(
                      child: Column(
                        crossAxisAlignment:
                            CrossAxisAlignment.start,

                        children: [

                          const Text(
                            "My Account",
                            style: TextStyle(
                              color: Colors.white70,
                              fontSize: 15,
                            ),
                          ),

                          const SizedBox(height: 5),

                          Text(
                            user?.fullName ??
                                "Peace M Bible User",
                            style: const TextStyle(
                              color: Colors.white,
                              fontSize: 23,
                              fontWeight: FontWeight.bold,
                            ),
                          ),

                          const SizedBox(height: 4),

                          Text(
                            user?.email ??
                                "Email not available",
                            style: const TextStyle(
                              color: Colors.white70,
                              fontSize: 14,
                            ),
                          ),

                          const SizedBox(height: 4),

                          const Text(
                            "Subscription: Free",
                            style: TextStyle(
                              color: Colors.white70,
                            ),
                          ),

                        ],
                      ),
                    ),

                    const Icon(
                      Icons.arrow_forward_ios,
                      color: Colors.white,
                    ),

                  ],
                ),
              ),

              const SizedBox(height: 30),

              const Text(
                "Appearance",
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 22,
                  fontWeight: FontWeight.bold,
                ),
              ),

              const SizedBox(height: 15),
              Card(
                elevation: 6,
                shape: RoundedRectangleBorder(
                  borderRadius:
                      BorderRadius.circular(20),
                ),

                child: ListTile(

                  leading: const CircleAvatar(
                    backgroundColor:
                        Colors.deepPurple,

                    child: Icon(
                      Icons.palette,
                      color: Colors.white,
                    ),
                  ),

                  title: const Text("Theme"),

                  subtitle:
                      Text(settings.themeMode.name),

                  trailing: const Icon(
                    Icons.arrow_forward_ios,
                  ),

                  onTap: () {

                    showModalBottomSheet(
                      context: context,

                      builder: (_) {

                        return SafeArea(

                          child: Column(

                            mainAxisSize:
                                MainAxisSize.min,

                            children: [

                              ListTile(
                                leading:
                                    const Icon(
                                  Icons.phone_android,
                                ),

                                title:
                                    const Text(
                                  "System",
                                ),

                                onTap: () {

                                  settings
                                      .setThemeMode(
                                    ThemeMode.system,
                                  );

                                  Navigator.pop(
                                      context);
                                },
                              ),

                              ListTile(
                                leading:
                                    const Icon(
                                  Icons.light_mode,
                                ),

                                title:
                                    const Text(
                                  "Light",
                                ),

                                onTap: () {

                                  settings
                                      .setThemeMode(
                                    ThemeMode.light,
                                  );

                                  Navigator.pop(
                                      context);
                                },
                              ),

                              ListTile(
                                leading:
                                    const Icon(
                                  Icons.dark_mode,
                                ),

                                title:
                                    const Text(
                                  "Dark",
                                ),

                                onTap: () {

                                  settings
                                      .setThemeMode(
                                    ThemeMode.dark,
                                  );

                                  Navigator.pop(
                                      context);
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


              const SizedBox(height: 25),


              Card(
                elevation: 6,

                shape: RoundedRectangleBorder(
                  borderRadius:
                      BorderRadius.circular(20),
                ),

                child: Padding(

                  padding:
                      const EdgeInsets.all(18),

                  child: Column(

                    crossAxisAlignment:
                        CrossAxisAlignment.start,

                    children: [

                      const Row(

                        children: [

                          Icon(
                            Icons.format_size,
                            color:
                                Colors.deepPurple,
                          ),

                          SizedBox(width: 10),

                          Text(
                            "Bible Font Size",
                            style: TextStyle(
                              fontSize: 18,
                              fontWeight:
                                  FontWeight.bold,
                            ),
                          ),

                        ],
                      ),


                      const SizedBox(height: 15),


                      Text(
                        "${settings.fontSize.toInt()}",
                        style:
                            const TextStyle(
                          fontSize: 16,
                        ),
                      ),


                      Slider(

                        value:
                            settings.fontSize,

                        min: 14,

                        max: 30,

                        divisions: 16,

                        label: settings.fontSize
                            .toInt()
                            .toString(),

                        activeColor:
                            Colors.deepPurple,

                        onChanged: (value) {

                          settings.setFontSize(
                              value);

                        },

                      ),

                    ],
                  ),
                ),
              ),


              const SizedBox(height: 25),


              const Text(
                "Preferences",
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 22,
                  fontWeight:
                      FontWeight.bold,
                ),
              ),

              const SizedBox(height: 15),


              Card(
                elevation: 6,

                shape:
                    RoundedRectangleBorder(
                  borderRadius:
                      BorderRadius.circular(20),
                ),

                child: Column(
                  children: [

                    SwitchListTile(

                      secondary:
                          const Icon(
                        Icons.notifications_active,
                        color: Colors.orange,
                      ),

                      title:
                          const Text(
                        "Daily Verse",
                      ),

                      subtitle:
                          const Text(
                        "Receive one verse every day",
                      ),

                      value:
                          settings.dailyVerse,

                      onChanged: (value) {

                        settings.setDailyVerse(
                            value);

                      },
                    ),


                    const Divider(height: 1),


                    SwitchListTile(

                      secondary:
                          const Icon(
                        Icons.volume_up,
                        color: Colors.blue,
                      ),

                      title:
                          const Text(
                        "Reading Sounds",
                      ),

                      subtitle:
                          const Text(
                        "Play tap sounds",
                      ),

                      value:
                          settings.soundEnabled,

                      onChanged: (value) {

                        settings
                            .setSoundEnabled(
                                value);

                      },
                    ),


                    const Divider(height: 1),


                    SwitchListTile(

                      secondary:
                          const Icon(
                        Icons.screen_lock_portrait,
                        color: Colors.green,
                      ),

                      title:
                          const Text(
                        "Keep Screen Awake",
                      ),

                      subtitle:
                          const Text(
                        "While reading",
                      ),

                      value:
                          settings.keepScreenOn,

                      onChanged: (value) {

                        settings
                            .setKeepScreenOn(
                                value);

                      },
                    ),

                  ],
                ),
              ),


              const SizedBox(height: 25),
              const Text(
                "Support",
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 22,
                  fontWeight: FontWeight.bold,
                ),
              ),

              const SizedBox(height: 15),

              Card(
  elevation: 6,

  shape: RoundedRectangleBorder(
    borderRadius: BorderRadius.circular(20),
  ),

  child: ListTile(

    leading: const CircleAvatar(
      backgroundColor: Colors.green,

      child: FaIcon(
        FontAwesomeIcons.whatsapp,
        color: Colors.white,
      ),
    ),

    title: const Text(
      "Contact Support",
    ),

    subtitle: const Text(
      "Get help through WhatsApp",
    ),

    trailing: const Icon(
      Icons.open_in_new,
    ),

    onTap: _openWhatsApp,

  ),
),


              const SizedBox(height: 15),


              Card(
                elevation: 6,

                shape:
                    RoundedRectangleBorder(
                  borderRadius:
                      BorderRadius.circular(20),
                ),

                child: ListTile(

                  leading: const CircleAvatar(
                    backgroundColor:
                        Colors.deepPurple,

                    child: Icon(
                      Icons.description,
                      color: Colors.white,
                    ),
                  ),

                  title: const Text(
                    "Terms & Conditions",
                  ),

                  subtitle: const Text(
                    "Read our terms of use",
                  ),

                  trailing: const Icon(
                    Icons.arrow_forward_ios,
                  ),

                  onTap: () {

                    Navigator.push(
                      context,

                      MaterialPageRoute(
                        builder: (_) =>
                            const TermsConditionsScreen(),
                      ),
                    );

                  },

                ),
              ),


              const SizedBox(height: 15),


              Card(
                elevation: 6,

                shape:
                    RoundedRectangleBorder(
                  borderRadius:
                      BorderRadius.circular(20),
                ),

                child: ListTile(

                  leading: const CircleAvatar(
                    backgroundColor: Colors.blue,

                    child: Icon(
                      Icons.privacy_tip,
                      color: Colors.white,
                    ),
                  ),

                  title: const Text(
                    "Privacy Policy",
                  ),

                  subtitle: const Text(
                    "How your information is protected",
                  ),

                  trailing: const Icon(
                    Icons.arrow_forward_ios,
                  ),

                  onTap: () {

                    Navigator.push(
                      context,

                      MaterialPageRoute(
                        builder: (_) =>
                            const PrivacyPolicyScreen(),
                      ),
                    );

                  },

                ),
              ),


              const SizedBox(height: 25),


              Card(
                elevation: 6,

                shape:
                    RoundedRectangleBorder(
                  borderRadius:
                      BorderRadius.circular(20),
                ),

                child: const ListTile(

                  leading: CircleAvatar(

                    backgroundColor:
                        Colors.deepPurple,

                    child: Icon(
                      Icons.info,
                      color: Colors.white,
                    ),

                  ),

                  title: Text(
                    "Peace M Bible",
                  ),

                  subtitle: Text(
                    "Version 1.0.0",
                  ),

                ),
              ),


              const SizedBox(height: 30),

            ],
          ),
        ),
      ),
    );
  }
}
