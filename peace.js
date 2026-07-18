import 'package:flutter/material.dart';

class PrivacyPolicyScreen extends StatelessWidget {
  const PrivacyPolicyScreen({super.key});

  Widget section(
    String title,
    String body,
    IconData icon,
    Color color,
  ) {
    return Card(
      elevation: 5,
      margin: const EdgeInsets.only(bottom: 18),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(18),
      ),
      child: Padding(
        padding: const EdgeInsets.all(18),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [

            Row(
              children: [

                CircleAvatar(
                  backgroundColor: color,
                  child: Icon(
                    icon,
                    color: Colors.white,
                  ),
                ),

                const SizedBox(width: 12),

                Expanded(
                  child: Text(
                    title,
                    style: const TextStyle(
                      fontSize: 19,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),

              ],
            ),

            const SizedBox(height: 15),

            Text(
              body,
              style: const TextStyle(
                fontSize: 16,
                height: 1.7,
              ),
            ),

          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {

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

              Row(

                children: [

                  IconButton(

                    onPressed: () {

                      Navigator.pop(context);

                    },

                    icon: const Icon(
                      Icons.arrow_back,
                      color: Colors.white,
                    ),

                  ),

                  const Expanded(

                    child: Text(

                      "Privacy Policy",

                      textAlign: TextAlign.center,

                      style: TextStyle(

                        color: Colors.white,

                        fontSize: 28,

                        fontWeight: FontWeight.bold,

                      ),

                    ),

                  ),

                  const SizedBox(width: 48),

                ],

              ),

              const SizedBox(height: 25),

              section(

                "Information We Collect",

                "Peace M Bible may collect information you provide when creating an account, including your name, email address, phone number (where applicable) and subscription information.",

                Icons.person,

                Colors.blue,

              ),

              section(

                "How We Use Your Information",

                "Your information is used to create and manage your account, process subscriptions, improve app performance, respond to support requests and provide a better Bible study experience.",

                Icons.settings,

                Colors.deepPurple,

              ),
              section(
                "Data Security",
                "We take reasonable technical and organizational measures to protect your personal information against unauthorized access, loss, misuse or disclosure. However, no internet transmission or electronic storage system is completely secure.",
                Icons.security,
                Colors.green,
              ),

              section(
                "Third-Party Services",
                "Peace M Bible may use trusted third-party services to process payments, provide analytics or deliver other essential features. These providers only receive the information necessary to perform their services.",
                Icons.public,
                Colors.orange,
              ),

              section(
                "Your Rights",
                "You may request to update or correct your account information. You may also request deletion of your account, subject to any legal or operational requirements.",
                Icons.verified_user,
                Colors.purple,
              ),

              section(
                "Children's Privacy",
                "Peace M Bible is intended for users of all ages. We do not knowingly collect personal information from children without appropriate consent where required by law.",
                Icons.child_care,
                Colors.pink,
              ),

              section(
                "Changes to this Privacy Policy",
                "We may update this Privacy Policy from time to time. Any changes will be posted within the application, and continued use of Peace M Bible after changes are made indicates your acceptance of the updated policy.",
                Icons.update,
                Colors.indigo,
              ),

              section(
                "Contact Us",
                "If you have any questions about this Privacy Policy or how your information is handled, please contact us.\n\nWhatsApp:\n+254 752 818 245",
                Icons.support_agent,
                Colors.teal,
              ),

              const SizedBox(height: 20),

              Card(
                elevation: 6,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(20),
                ),
                child: const Padding(
                  padding: EdgeInsets.all(20),
                  child: Column(
                    children: [

                      Text(
                        "Last Updated",
                        style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                          color: Colors.deepPurple,
                        ),
                      ),

                      SizedBox(height: 10),

                      Text(
                        "July 2026",
                        style: TextStyle(
                          fontSize: 16,
                        ),
                      ),

                      SizedBox(height: 20),

                      Divider(),

                      SizedBox(height: 15),

                      Text(
                        "Peace M Bible",
                        style: TextStyle(
                          fontSize: 22,
                          fontWeight: FontWeight.bold,
                          color: Colors.deepPurple,
                        ),
                      ),

                      SizedBox(height: 8),

                      Text(
                        "Read • Pray • Grow",
                        style: TextStyle(
                          fontStyle: FontStyle.italic,
                        ),
                      ),

                      SizedBox(height: 20),

                      Text(
                        "© 2026 Peace M Bible\nAll Rights Reserved.",
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          color: Colors.grey,
                        ),
                      ),

                    ],
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
