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
      verses = ["Error loading chapter:\n$e"];
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
      Future.delayed(const Duration(milliseconds: 400), () {
        final ctx =
            _verseKeys[widget.verse! - 1].currentContext;

        if (ctx != null) {
          Scrollable.ensureVisible(
            ctx,
            duration: const Duration(milliseconds: 700),
            curve: Curves.easeInOut,
          );
        }
      });
    }
  }

  void previousChapter() {
    if (currentChapter > 1) {
      currentChapter--;
      loadChapter();
    }
  }

  void nextChapter() {
    if (currentChapter < widget.totalChapters) {
      currentChapter++;
      loadChapter();
    }
  }

  Future<void> switchBibleVersion() async {
    final settings =
        Provider.of<SettingsProvider>(
      context,
      listen: false,
    );

    if (settings.selectedBible == "kjv") {
      if (!settings.isPremium) {
        if (!mounted) return;

        final upgrade = await showDialog<bool>(
          context: context,
          builder: (_) => AlertDialog(
            title: const Text(
              "Peace M Bible Premium",
            ),
            content: const Text(
              "English Bible (ENG) is a Premium feature.\n\n"
              "Subscribe to unlock:\n"
              "• English Bible\n"
              "• Kiswahili Bible\n"
              "• Bible Notes\n"
              "• Audio Bible",
            ),
            actions: [
              TextButton(
                onPressed: () =>
                    Navigator.pop(context, false),
                child: const Text("Later"),
              ),
              ElevatedButton(
                onPressed: () =>
                    Navigator.pop(context, true),
                child: const Text("Upgrade"),
              ),
            ],
          ),
        );

        if (upgrade == true && mounted) {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (_) =>
                  const VersionScreen(),
            ),
          );
        }

        return;
      }

      await settings.setBibleVersion("eng");
      await BibleService.setVersion("eng");
      await loadChapter();
      return;
    }

    if (settings.selectedBible == "eng") {
      await settings.setBibleVersion("swa");
      await BibleService.setVersion("swa");
      await loadChapter();
      return;
    }

    await settings.setBibleVersion("kjv");
    await BibleService.setVersion("kjv");
    await loadChapter();
  }
Future<void> showVerseMenu(
  int verseNumber,
  String verseText,
) async {
  final verse = SavedVerse(
    book: widget.book,
    chapter: currentChapter,
    verse: verseNumber,
    text: verseText,
  );

  await showModalBottomSheet(
    context: context,
    builder: (context) {
      return SafeArea(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            ListTile(
              leading: const Icon(Icons.highlight),
              title: const Text("Highlight Verse"),
              onTap: () {
                Navigator.pop(context);

                setState(() {
                  selectedVerse = verseNumber;
                });
              },
            ),

            ListTile(
              leading: const Icon(Icons.color_lens),
              title: const Text("Highlight Color"),
              onTap: () {
                Navigator.pop(context);

                showDialog(
                  context: this.context,
                  builder: (_) {
                    return AlertDialog(
                      title: const Text("Choose Highlight Color"),
                      content: Wrap(
                        spacing: 10,
                        runSpacing: 10,
                        children: [
                          Colors.yellow,
                          Colors.green,
                          Colors.orange,
                          Colors.pink,
                          Colors.blue,
                          Colors.purple,
                          Colors.red,
                          Colors.teal,
                        ].map((color) {
                          return GestureDetector(
                            onTap: () async {
                              final settings =
                                  Provider.of<SettingsProvider>(
                                this.context,
                                listen: false,
                              );

                              await settings.setHighlightColor(color);

                              setState(() {
                                highlightColor = color;
                              });

                              if (mounted) {
                                Navigator.pop(this.context);
                              }
                            },
                            child: CircleAvatar(
                              radius: 20,
                              backgroundColor: color,
                            ),
                          );
                        }).toList(),
                      ),
                    );
                  },
                );
              },
            ),

            ListTile(
              leading: const Icon(Icons.bookmark),
              title: const Text("Bookmark"),
              onTap: () async {
                await LibraryService.addBookmark(verse);

                if (context.mounted) {
                  Navigator.pop(context);

                  ScaffoldMessenger.of(this.context).showSnackBar(
                    const SnackBar(
                      content: Text("Verse bookmarked"),
                    ),
                  );
                }
              },
            ),

            ListTile(
              leading: const Icon(Icons.favorite),
              title: const Text("Favorite"),
              onTap: () async {
                await LibraryService.addFavorite(verse);

                if (context.mounted) {
                  Navigator.pop(context);

                  ScaffoldMessenger.of(this.context).showSnackBar(
                    const SnackBar(
                      content: Text("Added to favorites"),
                    ),
                  );
                }
              },
            ),

            ListTile(
              leading: const Icon(Icons.copy),
              title: const Text("Copy Verse"),
              onTap: () async {
                await Clipboard.setData(
                  ClipboardData(
                    text:
                        "${widget.book} $currentChapter:$verseNumber\n\n$verseText",
                  ),
                );

                if (context.mounted) {
                  Navigator.pop(context);

                  ScaffoldMessenger.of(this.context).showSnackBar(
                    const SnackBar(
                      content: Text("Verse copied"),
                    ),
                  );
                }
              },
            ),

            ListTile(
              leading: const Icon(Icons.share),
              title: const Text("Share Verse"),
              onTap: () async {
                await Share.share(
                  "${widget.book} $currentChapter:$verseNumber\n\n$verseText",
                );

                if (context.mounted) {
                  Navigator.pop(context);
                }
              },
            ),

            ListTile(
              leading: const Icon(Icons.close),
              title: const Text("Cancel"),
              onTap: () => Navigator.pop(context),
            ),
          ],
        ),
      );
    },
  );
}
@override
Widget build(BuildContext context) {
  final settings = Provider.of<SettingsProvider>(context);

  return Scaffold(
    appBar: AppBar(
      title: Text(
        "${widget.book} $currentChapter (${settings.selectedBible.toUpperCase()})",
      ),
      backgroundColor: Colors.purple,
      foregroundColor: Colors.white,
    ),
    body: loading
        ? const Center(
            child: CircularProgressIndicator(),
          )
        : GestureDetector(
            onHorizontalDragEnd: (details) async {
              if (details.primaryVelocity == null) return;

              if (details.primaryVelocity! < 0) {
                await switchBibleVersion();
              } else if (details.primaryVelocity! > 0) {
                await switchBibleVersion();
              }
            },
            child: Column(
              children: [
                Expanded(
                  child: ListView.builder(
                    controller: _scrollController,
                    padding: const EdgeInsets.all(16),
                    itemCount: verses.length,
                    itemBuilder: (context, index) {
                      final verseNumber = index + 1;

                      final bool searchedVerse =
                          widget.verse == verseNumber &&
                          widget.chapter == currentChapter;

                      final bool highlighted =
                          selectedVerse == verseNumber;

                      return AnimatedContainer(
                        duration: const Duration(milliseconds: 300),
                        key: _verseKeys[index],
                        margin: const EdgeInsets.only(bottom: 10),
                        decoration: BoxDecoration(
                          color: highlighted
                              ? highlightColor
                              : searchedVerse
                                  ? Colors.yellow.shade200
                                  : Colors.transparent,
                          borderRadius:
                              BorderRadius.circular(12),
                        ),
                        child: InkWell(
                          borderRadius:
                              BorderRadius.circular(12),
                          onLongPress: () {
                            showVerseMenu(
                              verseNumber,
                              verses[index],
                            );
                          },
                          child: Padding(
                            padding:
                                const EdgeInsets.all(10),
                            child: RichText(
                              text: TextSpan(
                                style: TextStyle(
                                  fontSize:
                                      settings.fontSize,
                                  color: Theme.of(context)
                                      .textTheme
                                      .bodyLarge
                                      ?.color,
                                  height: 1.8,
                                ),
                                children: [
                                  TextSpan(
                                    text: "$verseNumber ",
                                    style: const TextStyle(
                                      color: Colors.purple,
                                      fontWeight:
                                          FontWeight.bold,
                                    ),
                                  ),
                                  TextSpan(
                                    text: verses[index],
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ),
                      );
                    },
                  ),
                ),
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: Theme.of(context).cardColor,
                    border: Border(
                      top: BorderSide(
                        color: Colors.grey.shade300,
                      ),
                    ),
                  ),
                  child: Row(
                    children: [
                      Expanded(
                        child: ElevatedButton.icon(
                          onPressed: currentChapter == 1
                              ? null
                              : previousChapter,
                          icon: const Icon(Icons.arrow_back),
                          label: const Text("Previous"),
                        ),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: ElevatedButton.icon(
                          onPressed: currentChapter ==
                                  widget.totalChapters
                              ? null
                              : nextChapter,
                          icon: const Icon(Icons.arrow_forward),
                          label: const Text("Next"),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
  );
}
}
