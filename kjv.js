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
      backgroundColor: const Color(0xffF5F5F5),
      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.all(20),
          children: [

            Container(
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                color: Colors.deepPurple,
                borderRadius: BorderRadius.circular(25),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [

                  Text(
                    getGreeting(),
                    style: const TextStyle(
                      color: Colors.white70,
                      fontSize: 18,
                    ),
                  ),

                  const SizedBox(height: 8),

                  const Text(
                    "Peace M Bible",
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 30,
                      fontWeight: FontWeight.bold,
                    ),
                  ),

                  const SizedBox(height: 6),

                  const Text(
                    "Read • Pray • Grow",
                    style: TextStyle(
                      color: Colors.white70,
                      fontSize: 16,
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
                  elevation: 3,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: Padding(
                    padding: const EdgeInsets.all(20),
                    child: Column(
                      crossAxisAlignment:
                          CrossAxisAlignment.start,
                      children: [
                        const Row(
                          children: [
                            Icon(
                              Icons.auto_stories,
                              color: Colors.deepPurple,
                            ),
                            SizedBox(width: 8),
                            Text(
                              "Verse of the Day",
                              style: TextStyle(
                                fontSize: 20,
                                fontWeight: FontWeight.bold,
                                color: Colors.deepPurple,
                              ),
                            ),
                          ],
                        ),

                        const SizedBox(height: 18),

                        Text(
                          "\"${verse["text"]}\"",
                          style: const TextStyle(
                            fontSize: 18,
                            fontStyle: FontStyle.italic,
                            height: 1.6,
                          ),
                        ),

                        const SizedBox(height: 15),

                        Align(
                          alignment: Alignment.centerRight,
                          child: Text(
                            verse["reference"]!,
                            style: const TextStyle(
                              color: Colors.deepPurple,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                );
              },
            ),

            const SizedBox(height: 25),

            // OPEN BIBLE BUTTON
            SizedBox(
              width: double.infinity,
              child: ElevatedButton.icon(
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.deepPurple,
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
                icon: const Icon(Icons.menu_book),
                label: const Text(
                  "Open Bible",
                  style: TextStyle(fontSize: 18),
                ),
              ),
            ),

            const SizedBox(height: 30),

          ],
        ),
      ),
    );
  }
}
