Card(
  elevation: 6,
  shape: RoundedRectangleBorder(
    borderRadius: BorderRadius.circular(20),
  ),
  child: ListTile(
    leading: const CircleAvatar(
      backgroundColor: Colors.deepPurple,
      child: Icon(
        Icons.description,
        color: Colors.white,
      ),
    ),
    title: const Text("Terms & Conditions"),
    subtitle: const Text(
      "Read our terms of use",
    ),
    trailing: const Icon(
      Icons.arrow_forward_ios,
    ),
    onTap: () {
      Navigator.push(
        context,
        MaterialPageRoute(
          builder: (_) =>
              const TermsConditionsScreen(),
        ),
      );
    },
  ),
),

const SizedBox(height: 15),

Card(
  elevation: 6,
  shape: RoundedRectangleBorder(
    borderRadius: BorderRadius.circular(20),
  ),
  child: ListTile(
    leading: const CircleAvatar(
      backgroundColor: Colors.blue,
      child: Icon(
        Icons.privacy_tip,
        color: Colors.white,
      ),
    ),
    title: const Text("Privacy Policy"),
    subtitle: const Text(
      "How your information is protected",
    ),
    trailing: const Icon(
      Icons.arrow_forward_ios,
    ),
    onTap: () {
      Navigator.push(
        context,
        MaterialPageRoute(
          builder: (_) =>
              const PrivacyPolicyScreen(),
        ),
      );
    },
  ),
),
              
