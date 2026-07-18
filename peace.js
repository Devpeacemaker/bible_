Card(
  elevation: 6,

  shape: RoundedRectangleBorder(
    borderRadius: BorderRadius.circular(20),
  ),

  child: ListTile(

    leading: const CircleAvatar(
      backgroundColor: Colors.green,

      child: Padding(
        padding: EdgeInsets.all(8),
        child: Image(
          image: AssetImage(
            "assets/images/whatsapp.png",
          ),
        ),
      ),
    ),

    title: const Text(
      "Contact Support",
    ),

    subtitle: const Text(
      "Get help through WhatsApp",
    ),

    trailing: const Icon(
      Icons.open_in_new,
    ),

    onTap: _openWhatsApp,

  ),
),
