"""
Admin-only script to assign a FaktriIQ role to a user via Firebase custom claims.

Setup (one-time):
  1. Firebase Console -> Project settings -> Service accounts -> Generate new private key.
  2. Save the downloaded file as backend/serviceAccountKey.json (already gitignored).

Usage:
  python assign_role.py user@example.com technician
  python assign_role.py user@example.com officer
  python assign_role.py user@example.com --clear
"""

import sys
from pathlib import Path

import firebase_admin
from firebase_admin import auth, credentials

VALID_ROLES = {"technician", "officer"}
SERVICE_ACCOUNT_PATH = Path(__file__).parent / "serviceAccountKey.json"


def main() -> None:
    if len(sys.argv) < 3:
        print(__doc__)
        sys.exit(1)

    email = sys.argv[1]
    role_arg = sys.argv[2]

    if not SERVICE_ACCOUNT_PATH.exists():
        print(f"Missing {SERVICE_ACCOUNT_PATH}. See the setup instructions above.")
        sys.exit(1)

    firebase_admin.initialize_app(credentials.Certificate(str(SERVICE_ACCOUNT_PATH)))

    user = auth.get_user_by_email(email)

    if role_arg == "--clear":
        auth.set_custom_user_claims(user.uid, None)
        print(f"Cleared role for {email} (uid={user.uid}).")
    else:
        if role_arg not in VALID_ROLES:
            print(f"Invalid role '{role_arg}'. Must be one of: {', '.join(VALID_ROLES)}")
            sys.exit(1)
        auth.set_custom_user_claims(user.uid, {"role": role_arg})
        print(f"Assigned role '{role_arg}' to {email} (uid={user.uid}).")

    print("The user must sign out and back in (or restart the app) to pick up the new role.")


if __name__ == "__main__":
    main()
