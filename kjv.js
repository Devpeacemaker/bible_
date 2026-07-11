import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:provider/provider.dart';
import 'package:share_plus/share_plus.dart';

import '../models/saved_verse.dart';
import '../providers/settings_provider.dart';
import '../services/bible_service.dart';
import '../services/library_service.dart';
import '../services/api_service.dart';
import '../services/user_service.dart';
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

  final ScrollController _scrollController =
      ScrollController();

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
      final settings =
          Provider.of<SettingsProvider>(
        context,
        listen: false,
      );

      // ==========================
      // ENGLISH PREMIUM API
      // ==========================
      if (settings.selectedBible == "eng") {
        final premium = await ApiService.premium(
          UserService.currentPhone,
        );

        if (!premium) {
          if (mounted) {
            Navigator.pushReplacement(
              context,
              MaterialPageRoute(
                builder: (_) =>
                    const VersionScreen(),
              ),
            );
          }

          return;
        }

        verses =
            await BibleService.getEnglishChapter(
          widget.book,
          currentChapter,
        );
      }

      // ==========================
      // OTHER BIBLES
      // ==========================
      else {
        verses = await BibleService.getChapter(
          widget.bookIndex,
          currentChapter - 1,
        );
      }

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
