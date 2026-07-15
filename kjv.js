import 'package:flutter/material.dart';

import '../services/ai_service.dart';

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

  bool loading = false;

  Future<void> sendMessage() async {
    if (controller.text.trim().isEmpty || loading) {
      return;
    }

    final question = controller.text.trim();

    controller.clear();

    setState(() {
      loading = true;

      messages.add({
        "sender": "user",
        "text": question,
      });

      messages.add({
        "sender": "ai",
        "text": "Thinking...",
      });
    });

    try {
      final response =
          await AIService.askBible(question);

      setState(() {
        messages.removeLast();

        messages.add({
          "sender": "ai",
          "text": response,
        });

        loading = false;
      });
    } catch (e) {
      setState(() {
        messages.removeLast();

        messages.add({
          "sender": "ai",
          "text":
              "Unable to connect to the AI service.\n\n$e",
        });

        loading = false;
      });
    }
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
                    constraints:
                        const BoxConstraints(
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
                      textInputAction: TextInputAction.send,
                      minLines: 1,
                      maxLines: 5,
                      onSubmitted: (_) => sendMessage(),
                      decoration: const InputDecoration(
                        hintText: "Ask a Bible question...",
                        border: OutlineInputBorder(),
                      ),
                    ),
                  ),

                  const SizedBox(width: 10),

                  loading
                      ? const Padding(
                          padding: EdgeInsets.all(10),
                          child: SizedBox(
                            width: 24,
                            height: 24,
                            child: CircularProgressIndicator(
                              strokeWidth: 2,
                            ),
                          ),
                        )
                      : IconButton(
                          icon: const Icon(Icons.send),
                          onPressed: () {
                            sendMessage();
                          },
                        ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  @override
  void dispose() {
    controller.dispose();
    super.dispose();
  }
}
