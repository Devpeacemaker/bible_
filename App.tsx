@override
Widget build(BuildContext context) {
  final isDark = Theme.of(context).brightness == Brightness.dark;

  return Scaffold(
    appBar: AppBar(
      title: Text(
        reference.isEmpty
            ? "${widget.book} ${widget.chapter}"
            : reference,
        style: const TextStyle(
          fontWeight: FontWeight.bold,
        ),
      ),
      centerTitle: true,
      backgroundColor: Colors.deepPurple,
    ),

    body: loading
        ? const Center(
            child: CircularProgressIndicator(),
          )

        : Container(
            decoration: BoxDecoration(
              color: isDark
                  ? Colors.black
                  : const Color(0xfff7f5ff),
            ),

            child: ListView.builder(
              padding: const EdgeInsets.all(16),

              itemCount: verses.length,

              itemBuilder: (context, index) {
                final verse = verses[index];

                return Card(
                  elevation: 2,

                  margin: const EdgeInsets.only(
                    bottom: 14,
                  ),

                  color: isDark
                      ? const Color(0xff1e1e1e)
                      : Colors.white,

                  shape: RoundedRectangleBorder(
                    borderRadius:
                        BorderRadius.circular(16),
                  ),

                  child: Padding(
                    padding: const EdgeInsets.all(16),

                    child: RichText(
                      text: TextSpan(
                        style: TextStyle(
                          color: isDark
                              ? Colors.white
                              : Colors.black87,

                          fontSize: 18,

                          height: 1.7,
                        ),

                        children: [

                          TextSpan(
                            text:
                                "${verse["verse"]} ",

                            style: const TextStyle(
                              fontWeight:
                                  FontWeight.bold,

                              color:
                                  Colors.deepPurple,
                            ),
                          ),

                          TextSpan(
                            text:
                                verse["text"],
                          ),
                        ],
                      ),
                    ),
                  ),
                );
              },
            ),
          ),
  );
}
