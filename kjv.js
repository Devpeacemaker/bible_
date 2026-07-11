 title: Text(
        title,
        style: TextStyle(
          fontWeight: FontWeight.bold,
          fontSize: settings.fontSize - 1,
        ),
      ),

      subtitle: Padding(
        padding: const EdgeInsets.only(top: 6),
        child: Text(
          subtitle,
          style: TextStyle(
            fontSize: settings.fontSize - 3,
          ),
        ),
      ),

      trailing: const Icon(
        Icons.lock,
        color: Colors.orange,
      ),

      onTap: () {
        openPremium(
          context,
          title,
        );
      },
    ),
  );
}
