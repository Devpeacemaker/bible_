const SizedBox(height: 25),

Card(
  elevation: 6,
  shape: RoundedRectangleBorder(
    borderRadius: BorderRadius.circular(20),
  ),
  child: const ListTile(
    leading: CircleAvatar(
      backgroundColor: Colors.deepPurple,
      child: Icon(
        Icons.info,
        color: Colors.white,
      ),
    ),
    title: Text("Peace M Bible"),
    subtitle: Text("Version 1.0.0"),
  ),
),

const SizedBox(height: 30),

            ],
          ),
        ),
      ),
    );
  }
}
