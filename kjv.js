import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:provider/provider.dart';
import 'package:share_plus/share_plus.dart';

import '../models/saved_verse.dart';
import '../providers/settings_provider.dart';
import '../services/bible_service.dart';
import '../services/library_service.dart';
import 'version_screen.dart';

class BibleScreen extends StatefulWidget {
  final String book;
  final int chapter;
  final int bookIndex;
  final int totalChapters;
  final int? verse;

  const BibleScreen({
    super.key,
    required this.book,
    required this.chapter,
    required this.bookIndex,
    required this.totalChapters,
    this.verse,
  });

  @override
  State<BibleScreen> createState() => _BibleScreenState();
}

class _BibleScreenState extends State<BibleScreen> {
  late int currentChapter;

  List<String> verses = [];

  bool loading = true;

  final ScrollController _scrollController = ScrollController();

  final List<GlobalKey> _verseKeys = [];

  int? selectedVerse;

  Color highlightColor = Colors.yellow;

  @override
  void initState() {
    super.initState();
    currentChapter = widget.chapter;
    loadChapter();
  }

  Future<void> loadChapter() async {
    setState(() {
      loading = true;
    });

    try {
      verses = await BibleService.getChapter(
        widget.bookIndex,
        currentChapter - 1,
      );

      _verseKeys
        ..clear()
        ..addAll(
          List.generate(
            verses.length,
            (_) => GlobalKey(),
          ),
        );
    } catch (e) {
      verses = [
        "Error loading chapter.\n$e",
      ];
    }

    if (mounted) {
      final settings = Provider.of<SettingsProvider>(
        context,
        listen: false,
      );

      highlightColor = settings.highlightColor;
    }

    setState(() {
      loading = false;
    });

    if (widget.verse != null &&
        widget.chapter == currentChapter &&
        widget.verse! <= _verseKeys.length) {
      Future.delayed(
        const Duration(milliseconds: 400),
        () {
          final ctx =
              _verseKeys[widget.verse! - 1].currentContext;

          if (ctx != null) {
            Scrollable.ensureVisible(
              ctx,
              duration: const Duration(milliseconds: 700),
              curve: Curves.easeInOut,
            );
          }
        },
      );
    }
  }
