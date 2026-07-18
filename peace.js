import 'package:flutter/material.dart';

class TermsConditionsScreen extends StatelessWidget {
  const TermsConditionsScreen({super.key});

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
          crossAxisAlignment:
              CrossAxisAlignment.start,
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
                      fontWeight:
                          FontWeight.bold,
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

                      "Terms & Conditions",

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

                "Acceptance of Terms",

                "By downloading, accessing or using Peace M Bible, you agree to comply with these Terms and Conditions. If you do not agree with these terms, please discontinue using the application.",

                Icons.gavel,

                Colors.deepPurple,

              ),

              section(

                "User Accounts",

                "Some features require you to create an account. You are responsible for keeping your account information accurate and protecting your login credentials.",

                Icons.person,

                Colors.blue,

              ),
              section(
                "Premium Subscription",
                "Peace M Bible offers optional premium subscriptions that unlock additional features such as premium Bible versions, offline content, audio enhancements and future premium resources. Subscription fees are billed according to the selected plan and are non-transferable.",
                Icons.workspace_premium,
                Colors.amber,
              ),

              section(
                "Acceptable Use",
                "You agree to use Peace M Bible respectfully and lawfully. You must not attempt to interfere with the application's operation, misuse the services, distribute harmful software, or use the application for illegal activities.",
                Icons.verified_user,
                Colors.green,
              ),

              section(
                "Bible Content",
                "Bible translations, devotionals, notes and other resources are provided for personal study and spiritual growth. Some translations and resources may be protected by copyright and licensing agreements.",
                Icons.menu_book,
                Colors.deepOrange,
              ),

              section(
                "Intellectual Property",
                "The Peace M Bible application, logo, design, source code and original content are the intellectual property of the developer. They may not be copied, modified or redistributed without prior permission.",
                Icons.copyright,
                Colors.purple,
              ),

              section(
                "Disclaimer",
                "Peace M Bible is provided to support Bible study and spiritual growth. While every effort is made to provide accurate information, the application is provided 'as is' without warranties of any kind. Users should verify important information from trusted sources where appropriate.",
                Icons.info_outline,
                Colors.red,
              ),

              section(
                "Contact Support",
                "If you experience any problems, have questions or need assistance, please contact the Peace M Bible support team.\n\nWhatsApp:\n+254 752 818 245",
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
                        "Effective Date",
                        style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                          color: Colors.deepPurple,
                        ),
                      ),

                      SizedBox(height: 10),

                      Text(
                        "These Terms & Conditions are effective from July 2026 and may be updated from time to time. Continued use of Peace M Bible indicates your acceptance of any future updates.",
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          fontSize: 15,
                          height: 1.6,
                        ),
                      ),

                      SizedBox(height: 20),

                      Divider(),

                      SizedBox(height: 10),

                      Text(
                        "Peace M Bible",
                        style: TextStyle(
                          fontSize: 22,
                          fontWeight: FontWeight.bold,
                          color: Colors.deepPurple,
                        ),
                      ),

                      SizedBox(height: 6),

                      Text(
                        "Read • Pray • Grow",
                        style: TextStyle(
                          fontStyle: FontStyle.italic,
                        ),
                      ),

                      SizedBox(height: 15),

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
