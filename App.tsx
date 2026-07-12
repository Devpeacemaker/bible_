import 'package:hive_flutter/hive_flutter.dart';

class ReadingPlanService {
  static const String boxName = "reading_progress";

  static Future<void> init() async {
    if (!Hive.isBoxOpen(boxName)) {
      await Hive.openBox(boxName);
    }
  }

  static Box get box => Hive.box(boxName);

  static bool isCompleted(String plan, int day) {
    return box.get("${plan}_$day", defaultValue: false);
  }

  static Future<void> setCompleted(
      String plan,
      int day,
      bool completed,
      ) async {
    await box.put("${plan}_$day", completed);
  }

  static int completedCount(String plan, int totalDays) {
    int count = 0;

    for (int i = 1; i <= totalDays; i++) {
      if (isCompleted(plan, i)) {
        count++;
      }
    }

    return count;
  }
}
