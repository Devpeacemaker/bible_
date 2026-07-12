@override
Widget build(BuildContext context) {
  return Scaffold(
    appBar: AppBar(
      title: const Text(
        "English Bible",
        style: TextStyle(
          fontWeight: FontWeight.bold,
        ),
      ),
      centerTitle: true,
      elevation: 0,
      backgroundColor: Colors.deepPurple,
    ),

    body: Container(
      decoration: const BoxDecoration(
        gradient: LinearGradient(
          colors: [
            Color(0xfff5f3ff),
            Color(0xffffffff),
          ],
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
        ),
      ),

      child: ListView.builder(
        padding: const EdgeInsets.all(16),

        itemCount: books.length,

        itemBuilder: (context, index) {
          final book = books[index];

          return Card(
            elevation: 4,
            margin: const EdgeInsets.only(bottom: 12),

            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(18),
            ),

            child: ListTile(

              contentPadding: const EdgeInsets.symmetric(
                horizontal: 18,
                vertical: 8,
              ),

              leading: Container(
                width: 45,
                height: 45,

                decoration: BoxDecoration(
                  gradient: const LinearGradient(
                    colors: [
                      Colors.deepPurple,
                      Colors.purple,
                    ],
                  ),

                  borderRadius: BorderRadius.circular(14),
                ),

                child: Center(
                  child: Text(
                    "${index + 1}",
                    style: const TextStyle(
                      color: Colors.white,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ),

              title: Text(
                book["name"],
                style: const TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 17,
                ),
              ),

              subtitle: Padding(
                padding: const EdgeInsets.only(top: 5),

                child: Text(
                  "${book["chapters"]} Chapters",

                  style: TextStyle(
                    color: Colors.grey.shade700,
                  ),
                ),
              ),

              trailing: Container(
                padding: const EdgeInsets.all(8),

                decoration: BoxDecoration(
                  color: Colors.deepPurple.withOpacity(0.1),
                  shape: BoxShape.circle,
                ),

                child: const Icon(
                  Icons.chevron_right,
                  color: Colors.deepPurple,
                ),
              ),

              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (_) => EngChaptersScreen(
                      book: book["name"],
                      chapters: book["chapters"],
                    ),
                  ),
                );
              },
            ),
          );
        },
      ),
    ),
  );
}
