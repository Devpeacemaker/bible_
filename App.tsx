import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class EngBibleScreen extends StatefulWidget {
  final String book;
  final int chapter;

  const EngBibleScreen({
    super.key,
    required this.book,
    required this.chapter,
  });

  @override
  State<EngBibleScreen> createState() => _EngBibleScreenState();
}

class _EngBibleScreenState extends State<EngBibleScreen> {
  bool loading = true;

  String reference = "";

  List verses = [];

  Future<void> loadChapter() async {
    try {
      final ref =
          "${widget.book} ${widget.chapter}";

      final response = await http.get(
        Uri.parse(
          "https://bible-api.com/${Uri.encodeComponent(ref)}",
        ),
      );

      final data = jsonDecode(response.body);

      setState(() {
        reference = data["reference"] ?? ref;
        verses = data["verses"] ?? [];
        loading = false;
      });
    } catch (e) {
      setState(() {
        loading = false;
      });

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(e.toString()),
        ),
      );
    }
  }

  @override
  void initState() {
    super.initState();
    loadChapter();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(reference.isEmpty
            ? "${widget.book} ${widget.chapter}"
            : reference),
      ),
      body: loading
          ? const Center(
              child: CircularProgressIndicator(),
            )
          : ListView.builder(
              padding: const EdgeInsets.all(16),
              itemCount: verses.length,
              itemBuilder: (context, index) {
                final verse = verses[index];

                return Padding(
                  padding:
                      const EdgeInsets.only(bottom: 14),
                  child: RichText(
                    text: TextSpan(
                      style: const TextStyle(
                        color: Colors.black,
                        fontSize: 18,
                        height: 1.6,
                      ),
                      children: [
                        TextSpan(
                          text:
                              "${verse["verse"]} ",
                          style: const TextStyle(
                            fontWeight:
                                FontWeight.bold,
                            color: Colors.deepPurple,
                          ),
                        ),
                        TextSpan(
                          text: verse["text"],
                        ),
                      ],
                    ),
                  ),
                );
              },
            ),
    );
  }
}
