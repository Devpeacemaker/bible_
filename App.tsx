@override
Widget build(BuildContext context) {
  return Scaffold(
    appBar: AppBar(
      title: Text(
        book,
        style: const TextStyle(
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
            Colors.white,
          ],
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
        ),
      ),

      child: GridView.builder(
        padding: const EdgeInsets.all(18),

        itemCount: chapters,

        gridDelegate:
            const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 4,
          crossAxisSpacing: 14,
          mainAxisSpacing: 14,
          childAspectRatio: 1.1,
        ),

        itemBuilder: (context, index) {
          final chapter = index + 1;

          return InkWell(
            borderRadius: BorderRadius.circular(18),

            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (_) => EngBibleScreen(
                    book: book,
                    chapter: chapter,
                  ),
                ),
              );
            },

            child: Container(
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(18),

                gradient: const LinearGradient(
                  colors: [
                    Colors.deepPurple,
                    Colors.purple,
                  ],

                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),

                boxShadow: const [
                  BoxShadow(
                    blurRadius: 6,
                    offset: Offset(0, 3),
                  ),
                ],
              ),

              child: Center(
                child: Text(
                  "$chapter",

                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 22,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ),
          );
        },
      ),
    ),
  );
}
