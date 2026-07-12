import 'package:flutter/material.dart';

class AIBibleAssistantScreen extends StatefulWidget {
  const AIBibleAssistantScreen({super.key});

  @override
  State<AIBibleAssistantScreen> createState() =>
      _AIBibleAssistantScreenState();
}

class _AIBibleAssistantScreenState
    extends State<AIBibleAssistantScreen> {
  final TextEditingController controller =
      TextEditingController();

  final List<Map<String, String>> messages = [];

  void sendMessage() {
    if (controller.text.trim().isEmpty) return;

    final question = controller.text.trim();

    setState(() {
      messages.add({
        "sender": "user",
        "text": question,
      });

      messages.add({
        "sender": "ai",
        "text": answer(question),
      });
    });

    controller.clear();
  }

  String answer(String question) {
    final q = question.toLowerCase();

    if (q.contains("love")) {
      return "John 3:16 teaches that God's love is shown through Jesus Christ.";
    }

    if (q.contains("faith")) {
      return "Hebrews 11:1 explains that faith is confidence in what we hope for and assurance about what we do not see.";
    }

    if (q.contains("pray")) {
      return "Matthew 6:9-13 gives Jesus' model prayer, and Philippians 4:6 encourages us to pray about everything.";
    }

    if (q.contains("salvation")) {
      return "Ephesians 2:8-9 teaches that salvation is by grace through faith.";
    }

    return "Thank you for your question. AI Bible Assistant will soon provide detailed Bible explanations powered by online AI.";
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("AI Bible Assistant"),
      ),
      body: Column(
        children: [
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.all(15),
              itemCount: messages.length,
              itemBuilder: (context, index) {
                final msg = messages[index];

                final isUser =
                    msg["sender"] == "user";

                return Align(
                  alignment: isUser
                      ? Alignment.centerRight
                      : Alignment.centerLeft,
                  child: Container(
                    margin: const EdgeInsets.symmetric(
                      vertical: 6,
                    ),
                    padding: const EdgeInsets.all(14),
                    constraints: const BoxConstraints(
                      maxWidth: 320,
                    ),
                    decoration: BoxDecoration(
                      color: isUser
                          ? Colors.deepPurple
                          : Colors.grey.shade300,
                      borderRadius:
                          BorderRadius.circular(16),
                    ),
                    child: Text(
                      msg["text"]!,
                      style: TextStyle(
                        color: isUser
                            ? Colors.white
                            : Colors.black,
                      ),
                    ),
                  ),
                );
              },
            ),
          ),
          SafeArea(
            child: Padding(
              padding: const EdgeInsets.all(12),
              child: Row(
                children: [
                  Expanded(
                    child: TextField(
                      controller: controller,
                      decoration:
                          const InputDecoration(
                        hintText:
                            "Ask a Bible question...",
                        border:
                            OutlineInputBorder(),
                      ),
                    ),
                  ),
                  const SizedBox(width: 10),
                  IconButton(
                    icon: const Icon(Icons.send),
                    onPressed: sendMessage,
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
