import 'package:hive_flutter/hive_flutter.dart';

class NotesService {

  static const String boxName = "bible_notes";


  static Future<void> init() async {

    if (!Hive.isBoxOpen(boxName)) {
      await Hive.openBox(boxName);
    }

  }



  static Box get box => Hive.box(boxName);



  static Future<void> addNote({
    required String title,
    required String content,
  }) async {

    await box.add({

      "title": title,

      "content": content,

      "date": DateTime.now()
          .toString(),

    });

  }



  static List getNotes() {

    return box.values
        .toList();

  }



  static Future<void> deleteNote(
      int index,
      ) async {

    await box.deleteAt(index);

  }

}
