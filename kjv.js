import 'package:flutter/material.dart';

class HighlightPicker {
  static Future<Color?> show(
    BuildContext context,
  ) async {
    return showModalBottomSheet<Color>(
      context: context,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(
          top: Radius.circular(20),
        ),
      ),
      builder: (context) {
        return Padding(
          padding: const EdgeInsets.all(20),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [

              const Text(
                "Highlight Verse",
                style: TextStyle(
                  fontSize: 22,
                  fontWeight: FontWeight.bold,
                ),
              ),

              const SizedBox(height: 20),

              Wrap(
                spacing: 18,
                runSpacing: 18,
                children: [

                  colorButton(context, Colors.yellow),

                  colorButton(context, Colors.green),

                  colorButton(context, Colors.blue),

                  colorButton(context, Colors.pink),

                  colorButton(context, Colors.orange),

                  colorButton(context, Colors.purple),

                  colorButton(context, Colors.red),

                  colorButton(context, Colors.cyan),
                ],
              ),

              const SizedBox(height: 25),

              SizedBox(
                width: double.infinity,
                child: ElevatedButton.icon(
                  onPressed: () {
                    Navigator.pop(context);
                  },
                  icon: const Icon(Icons.close),
                  label: const Text("Cancel"),
                ),
              ),
            ],
          ),
        );
      },
    );
  }

  static Widget colorButton(
    BuildContext context,
    Color color,
  ) {
    return GestureDetector(
      onTap: () {
        Navigator.pop(context, color);
      },
      child: CircleAvatar(
        radius: 25,
        backgroundColor: color,
      ),
    );
  }
}
