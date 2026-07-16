import 'package:hive_flutter/hive_flutter.dart';


class NotesService {

  static const String boxName = "bible_notes";


  static Future<void> init() async {

    await Hive.openBox(boxName);

  }



  static Box get box => Hive.box(boxName);



  static Future<void> addNote({

    required String title,

    required String content,

    String category = "General",

  }) async {

    await box.add({

      "title": title,

      "content": content,

      "category": category,

      "favorite": false,

      "date": DateTime.now().toIso8601String(),

    });

  }



  static List getNotes(){

    return box.values.toList();

  }



  static Future<void> updateNote(

      int index,

      Map note,

  ) async {

    await box.put(index, note);

  }



  static Future<void> deleteNote(int index) async {

    await box.deleteAt(index);

  }

}
