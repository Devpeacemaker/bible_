import 'package:flutter/material.dart';
import 'books_screen.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  String getGreeting() {
    final hour = DateTime.now().hour;

    if (hour >= 5 && hour < 12) {
      return "Good Morning 👋";
    } else if (hour >= 12 && hour < 17) {
      return "Good Afternoon ☀️";
    } else if (hour >= 17 && hour < 21) {
      return "Good Evening 🌇";
    } else {
      return "Good Night 🌙";
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF4F7FC),
      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.all(20),
          children: [
            // BEAUTIFUL HEADER
            Container(
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                  colors: [
                    Color(0xFF4A00E0),
                    Color(0xFF8E2DE2),
                    Color(0xFF00C6FF),
                  ],
                ),
                borderRadius: BorderRadius.circular(35),
                boxShadow: [
                  BoxShadow(
                    color: Colors.deepPurple.withOpacity(0.25),
                    blurRadius: 20,
                    offset: const Offset(0, 10),
                  ),
                ],
              ),
              child: Column(
                children: [
                  Image.asset(
                    "assets/images/peace_m_logo.png",
                    height: 85,
                  ),

                  const SizedBox(height: 18),

                  Align(
                    alignment: Alignment.centerLeft,
                    child: Text(
                      getGreeting(),
                      style: const TextStyle(
                        color: Colors.white70,
                        fontSize: 18,
                      ),
                    ),
                  ),

                  const SizedBox(height: 8),

                  const Align(
                    alignment: Alignment.centerLeft,
                    child: Text(
                      "Peace M Bible",
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 32,
                        fontWeight: FontWeight.bold,
                        letterSpacing: 1,
                      ),
                    ),
                  ),

                  const SizedBox(height: 6),

                  const Align(
                    alignment: Alignment.centerLeft,
                    child: Text(
                      "Read • Pray • Grow",
                      style: TextStyle(
                        color: Colors.white70,
                        fontSize: 17,
                      ),
                    ),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 25),

            // VERSE OF THE DAY
            Builder(
              builder: (context) {
                final verses = [
                  {
                    "reference": "Psalm 23:1",
                    "text":
                        "The Lord is my shepherd; I shall not want.",
                  },
                  {
                    "reference": "John 3:16",
                    "text":
                        "For God so loved the world, that he gave his only begotten Son.",
                  },
                  {
                    "reference": "Romans 8:28",
                    "text":
                        "And we know that all things work together for good to them that love God.",
                  },
                  {
                    "reference": "Philippians 4:13",
                    "text":
                        "I can do all things through Christ which strengtheneth me.",
                  },
                  {
                    "reference": "Isaiah 41:10",
                    "text":
                        "Fear thou not; for I am with thee: be not dismayed; for I am thy God.",
                  },
                  {
                    "reference": "Joshua 1:9",
                    "text":
                        "Be strong and of a good courage; be not afraid.",
                  },
                ];

                final day = DateTime.now()
                    .difference(DateTime(2026, 1, 1))
                    .inDays;

                final verse = verses[day % verses.length];

                return Card(
                  color: const Color(0xFFF9F6FF),
                  elevation: 8,
                  shadowColor: Colors.deepPurple.withOpacity(0.15),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(25),
                  ),
                  child: Padding(
                    padding: const EdgeInsets.all(22),
                    child: Column(
                      crossAxisAlignment:
                          CrossAxisAlignment.start,
                      children: [
                        const Row(
                          children: [
                            Icon(
                              Icons.auto_stories_rounded,
                              color: Colors.deepPurple,
                              size: 28,
                            ),
                            SizedBox(width: 10),
                            Text(
                              "Verse of the Day",
                              style: TextStyle(
                                fontSize: 21,
                                fontWeight: FontWeight.bold,
                                color: Colors.deepPurple,
                              ),
                            ),
                          ],
                        ),

                        const SizedBox(height: 20),
                        Text(
                          "\"${verse["text"]}\"",
                          style: const TextStyle(
                            fontSize: 18,
                            fontStyle: FontStyle.italic,
                            height: 1.7,
                            color: Color(0xFF333333),
                          ),
                        ),

                        const SizedBox(height: 18),

                        Align(
                          alignment: Alignment.centerRight,
                          child: Container(
                            padding: const EdgeInsets.symmetric(
                              horizontal: 14,
                              vertical: 6,
                            ),
                            decoration: BoxDecoration(
                              color: Colors.deepPurple.withOpacity(0.08),
                              borderRadius: BorderRadius.circular(20),
                            ),
                            child: Text(
                              verse["reference"]!,
                              style: const TextStyle(
                                color: Colors.deepPurple,
                                fontWeight: FontWeight.bold,
                                fontSize: 15,
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                );
              },
            ),

            const SizedBox(height: 28),

            // OPEN BIBLE BUTTON
            Container(
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [
                    Color(0xFF6A11CB),
                    Color(0xFF2575FC),
                  ],
                ),
                borderRadius: BorderRadius.circular(18),
                boxShadow: [
                  BoxShadow(
                    color: Colors.blue.withOpacity(0.25),
                    blurRadius: 15,
                    offset: const Offset(0, 8),
                  ),
                ],
              ),
              child: ElevatedButton.icon(
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.transparent,
                  shadowColor: Colors.transparent,
                  foregroundColor: Colors.white,
                  padding: const EdgeInsets.symmetric(
                    vertical: 18,
                  ),
                  shape: RoundedRectangleBorder(
                    borderRadius:
                        BorderRadius.circular(18),
                  ),
                ),
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (_) =>
                          const BooksScreen(),
                    ),
                  );
                },
                icon: const Icon(
                  Icons.menu_book_rounded,
                  size: 28,
                ),
                label: const Text(
                  "Open Bible",
                  style: TextStyle(
                    fontSize: 19,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ),

            const SizedBox(height: 35),
          ],
        ),
      ),
    );
  }
}
